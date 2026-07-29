"""
路由模式多 Agent 协作模块。

RouterAgent  — 轻量级分类器，判断用户问题属于哪个领域
MultiAgentRouter — 调度中心，将请求分发给对应的专家 Agent
"""

import json
import re
import os

from dotenv import load_dotenv

load_dotenv()

from agentscope.agent import Agent
from agentscope.model import OpenAIChatModel
from agentscope.credential import OpenAICredential
from agentscope.message import UserMsg

from backend.agent import (
    build_weather_agent,
    build_document_agent,
    build_date_agent,
    build_general_agent,
)


def _extract_text(content) -> str:
    """
    从 UserMsg.content 中提取纯文本字符串。
    AgentScope 2.x 的 content 可能是 str、list[TextBlock] 或其他类型，
    需要统一转为 str 供关键词匹配等场景使用。
    """
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for block in content:
            if hasattr(block, "text"):
                parts.append(block.text)
            elif isinstance(block, str):
                parts.append(block)
        return " ".join(parts) if parts else str(content)
    return str(content)

# --------------------------------------------------------------------------- #
#  路由 Agent 的 system prompt
# --------------------------------------------------------------------------- #
ROUTER_SYSTEM_PROMPT = """\
你是一个任务路由器。根据用户的输入，判断应该由哪个专家来处理。

可选的专家类别：
- "weather"：用户询问天气、气温、穿衣服等相关问题
- "document"：用户询问学校、入学、校园、报到、住宿、选课、军训、学费、
  课程安排、校规、图书馆、食堂、社团、绩效、考核、评分、KPI、奖惩、晋升、薪资、考勤等与《新生入学手册》或《员工绩效考核规章制度》相关的问题
- "date"：用户询问日期、时间、星期、今天几号、现在几点等时间相关问题
- "general"：以上都不属于的通用问题、闲聊、知识问答等

示例：
用户："今天星期几" → date
用户："明天北京下雨吗" → weather
用户："选课什么时候开始" → document
用户："给我讲个笑话" → general
用户："你好" → general

请只回复一个 JSON，不要包含任何其他文字：
{"category": "weather", "reason": "简短原因"}
"""

# --------------------------------------------------------------------------- #
#  路由 Agent
# --------------------------------------------------------------------------- #

class RouterAgent:
    """轻量级分类路由器，使用 AgentScope Agent 判断用户问题类别。"""

    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY", "sk-xxx")
        base_url = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
        model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

        model = OpenAIChatModel(
            credential=OpenAICredential(
                api_key=api_key,
                base_url=base_url,
            ),
            model=model_name,
            stream=False,  # 路由不需要流式
        )

        # 使用一个无工具的轻量 Agent 来做分类
        self.agent = Agent(
            name="router",
            system_prompt=ROUTER_SYSTEM_PROMPT,
            model=model,
        )

    async def route(self, user_input) -> str:
        """
        返回路由类别字符串。
        可选值: "weather" | "document" | "date" | "general"
        """
        # 统一提取纯文本（兼容 str / list[TextBlock] / 其他）
        user_text = _extract_text(user_input)

        try:
            user_msg = UserMsg(name="user", content=user_text)
            response = await self.agent.reply(user_msg)

            # 从响应中提取文本内容
            content = _extract_text(
                response.content if hasattr(response, 'content') else
                response.text if hasattr(response, 'text') else
                str(response)
            )

            content = content.strip()

            # 尝试从响应中提取 JSON
            match = re.search(r'\{[^}]+\}', content)
            if match:
                result = json.loads(match.group())
                category = result.get("category", "general")
                if category in ("weather", "document", "date", "general"):
                    return category

            # JSON 解析失败，使用关键词兜底
            return self._keyword_fallback(user_text)

        except Exception:
            # LLM 调用失败时，使用关键词兜底
            return self._keyword_fallback(user_text)

    @staticmethod
    def _keyword_fallback(user_input) -> str:
        """基于关键词的兜底分类，避免 LLM 异常时完全无法路由。"""
        text = _extract_text(user_input).lower()

        # 天气关键词
        weather_keywords = ["天气", "气温", "温度", "下雨", "下雪", "晴", "阴",
                           "多云", "穿什么", "穿衣", "带伞", "预报"]
        if any(kw in text for kw in weather_keywords):
            return "weather"

        # 文档/校园关键词
        document_keywords =  ["入学", "校园", "报到", "住宿", "选课", "军训",
                    "学费", "课程", "校规", "图书馆", "食堂", "社团",
                    "手册", "学校", "宿舍", "注册",
                    "绩效", "考核", "评分", "KPI", "奖惩", "晋升", "薪资", "考勤"]
        if any(kw in text for kw in document_keywords):
            return "document"

        # 日期关键词
        date_keywords = ["日期", "时间", "星期", "几号", "几点", "今天",
                        "明天", "昨天", "日历", "农历"]
        if any(kw in text for kw in date_keywords):
            return "date"

        return "general"


# --------------------------------------------------------------------------- #
#  多 Agent 路由调度器
# --------------------------------------------------------------------------- #

class MultiAgentRouter:
    """
    路由模式多 Agent 调度中心。
    1. 使用 RouterAgent 判断用户问题类别
    2. 将请求分发给对应的专家 Agent
    3. 透传专家 Agent 的流式事件
    """

    def __init__(self):
        self.name = "multi_agent_router"
        self.router = RouterAgent()

        # 专家 Agent 池
        self.agents: dict[str, Agent] = {
            "weather":  build_weather_agent(),
            "document": build_document_agent(),
            "date":     build_date_agent(),
            "general":  build_general_agent(),
        }

    async def reply_stream(self, user_msg: UserMsg):
        """
        核心调度方法。
        1. 路由分类
        2. 选择专家 Agent
        3. 透传流式事件
        """
        # Step 1: 路由判断（提取纯文本供路由分类使用）
        category = await self.router.route(_extract_text(user_msg.content))

        # Step 2: 选择对应专家 Agent
        expert = self.agents.get(category, self.agents["general"])

        # Step 3: 用专家 Agent 处理（流式），透传所有事件
        async for event in expert.reply_stream(user_msg):
            yield event
