import os
from datetime import datetime
from typing import Any

import httpx
import ollama
import psycopg
from dotenv import load_dotenv

# 加载 .env（如果存在）
load_dotenv()

from agentscope.agent import Agent
from agentscope.model import OpenAIChatModel
from agentscope.credential import OpenAICredential
from agentscope.tool import ToolBase, ToolChunk, Toolkit
from agentscope.message import TextBlock
from agentscope.permission import (
    PermissionContext,
    PermissionDecision,
    PermissionBehavior,
)


class GetCurrentDate(ToolBase):
    name: str = "get_current_date"
    description: str = (
        "获取当前的日期和时间信息。"
        "当用户询问今天几号、现在几点、当前日期时间等问题时使用此工具。"
    )
    input_schema: dict[str, Any] = {
        "type": "object",
        "properties": {},
        "required": [],
    }
    is_concurrency_safe: bool = True
    is_read_only: bool = True
    is_external_tool: bool = False

    async def check_permissions(
        self,
        tool_input: dict[str, Any],
        context: PermissionContext,
    ) -> PermissionDecision:
        """日期查询工具始终允许调用。"""
        return PermissionDecision(
            behavior=PermissionBehavior.ALLOW,
            message="Date query is always allowed.",
        )

    async def call(self, **kwargs: Any) -> ToolChunk:
        """执行日期查询，返回当前日期时间信息。"""
        now = datetime.now()
        date_str = now.strftime("%Y年%m月%d日")
        time_str = now.strftime("%H:%M:%S")
        weekday_map = {
            0: "星期一", 1: "星期二", 2: "星期三",
            3: "星期四", 4: "星期五", 5: "星期六", 6: "星期日",
        }
        weekday = weekday_map[now.weekday()]

        result_text = (
            f"当前日期时间信息：\n"
            f"- 日期：{date_str}\n"
            f"- 时间：{time_str}\n"
            f"- 星期：{weekday}\n"
            f"- ISO格式：{now.isoformat()}"
        )

        return ToolChunk(
            content=[TextBlock(text=result_text)],
        )


class GetWeather(ToolBase):
    name: str = "get_weather"
    description: str = (
        "获取指定城市的当前天气信息。"
        "当用户询问某个城市的天气、气温、是否下雨等问题时使用此工具。"
    )
    input_schema: dict[str, Any] = {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "要查询天气的城市名称，例如：北京、上海、广州",
            }
        },
        "required": ["city"],
    }
    is_concurrency_safe: bool = True
    is_read_only: bool = True
    is_external_tool: bool = False

    async def check_permissions(
        self,
        tool_input: dict[str, Any],
        context: PermissionContext,
    ) -> PermissionDecision:
        """天气查询工具始终允许调用。"""
        return PermissionDecision(
            behavior=PermissionBehavior.ALLOW,
            message="Weather query is always allowed.",
        )

    # WMO 天气代码 -> 中文描述映射
    _WMO_CODES: dict[int, str] = {
        0: "晴",
        1: "大部晴朗", 2: "局部多云", 3: "多云",
        45: "雾", 48: "雾凇",
        51: "小毛毛雨", 53: "中毛毛雨", 55: "大毛毛雨",
        56: "冻毛毛雨", 57: "冻雨",
        61: "小雨", 63: "中雨", 65: "大雨",
        66: "冻小雨", 67: "冻大雨",
        71: "小雪", 73: "中雪", 75: "大雪",
        77: "雪粒",
        80: "小阵雨", 81: "中阵雨", 82: "大阵雨",
        85: "小阵雪", 86: "大阵雪",
        95: "雷暴", 96: "雷暴伴小冰雹", 99: "雷暴伴大冰雹",
    }

    async def call(self, city: str, **kwargs: Any) -> ToolChunk:
        """调用 Open-Meteo 免费 API 查询真实天气数据。"""
        async with httpx.AsyncClient(timeout=10) as client:
            # 1) 地理编码：城市名 -> 经纬度
            geo_resp = await client.get(
                "https://geocoding-api.open-meteo.com/v1/search",
                params={"name": city, "count": 1, "language": "zh"},
            )
            geo_data = geo_resp.json()

            if not geo_data.get("results"):
                return ToolChunk(
                    content=[TextBlock(text=f"未找到城市「{city}」，请检查城市名称后重试。")],
                )

            place = geo_data["results"][0]
            lat, lon = place["latitude"], place["longitude"]
            resolved_name = place.get("name", city)

            # 2) 查询当前天气
            weather_resp = await client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "current": (
                        "temperature_2m,relative_humidity_2m,apparent_temperature,"
                        "weather_code,wind_speed_10m,wind_direction_10m"
                    ),
                    "timezone": "auto",
                },
            )
            weather_data = weather_resp.json()
            current = weather_data.get("current", {})

            if not current:
                return ToolChunk(
                    content=[TextBlock(text=f"查询「{resolved_name}」天气失败，请稍后重试。")],
                )

            temperature = current.get("temperature_2m", "N/A")
            feels_like = current.get("apparent_temperature", "N/A")
            humidity = current.get("relative_humidity_2m", "N/A")
            wind_speed = current.get("wind_speed_10m", "N/A")
            wind_dir = current.get("wind_direction_10m", 0)
            weather_code = current.get("weather_code", -1)

            condition = self._WMO_CODES.get(weather_code, f"未知({weather_code})")

            # 风向角度 -> 中文
            _DIRS = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"]
            wind_direction = _DIRS[round(wind_dir / 45) % 8]

            # 根据体感温度给出穿衣建议
            if isinstance(feels_like, (int, float)):
                if feels_like < 5:
                    clothing = "建议穿厚羽绒服、毛衣，注意保暖"
                elif feels_like < 15:
                    clothing = "建议穿外套、毛衣，适当保暖"
                elif feels_like < 25:
                    clothing = "建议穿长袖、薄外套，舒适出行"
                elif feels_like < 33:
                    clothing = "建议穿短袖、短裤，注意防晒"
                else:
                    clothing = "建议穿轻薄衣物，注意防暑降温"
            else:
                clothing = "暂无建议"

            result_text = (
                f"🌤️ {resolved_name}当前天气信息：\n"
                f"- 天气状况：{condition}\n"
                f"- 当前温度：{temperature}°C（体感 {feels_like}°C）\n"
                f"- 空气湿度：{humidity}%\n"
                f"- 风向风速：{wind_direction}风 {wind_speed} km/h\n"
                f"- 穿衣建议：{clothing}\n"
                f"\n📡 数据来源：Open-Meteo（免费实时天气 API）"
            )

            return ToolChunk(
                content=[TextBlock(text=result_text)],
            )


class SearchHandbook(ToolBase):
    """RAG 检索工具：从 PostgreSQL 中的 handbook_chunks 表检索相关文档片段。"""

    name: str = "search_handbook"
    description: str = (
         "检索知识库中的文档内容，包括《新生入学手册》和《员工绩效考核规章制度》。"
    "当用户询问与学校、入学、校园、报到、住宿、选课、军训、学费、课程安排、"
    "校规、图书馆、食堂、社团，或者与绩效、考核、评分、KPI、奖惩、晋升、"
    "薪资、考勤等相关问题时，必须使用此工具获取准确的文档信息后再回答。"
    )
    input_schema: dict[str, Any] = {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "用于检索的用户问题或关键词",
            },
            "top_k": {
                "type": "integer",
                "description": "返回最相关的文档片段数量，默认为 3",
                "default": 3,
            },
        },
        "required": ["query"],
    }
    is_concurrency_safe: bool = True
    is_read_only: bool = True
    is_external_tool: bool = False

    # 数据库配置（与 ingest_ollama.py 保持一致）
    _DB_HOST: str = "localhost"
    _DB_PORT: int = 5432
    _DB_NAME: str = "campus_handbook"
    _DB_USER: str = "postgres"
    _DB_PASSWORD: str = "930106zh"
    _OLLAMA_HOST: str = "http://localhost:11434"
    _EMBED_MODEL: str = "nomic-embed-text"

    async def check_permissions(
        self,
        tool_input: dict[str, Any],
        context: PermissionContext,
    ) -> PermissionDecision:
        """文档检索工具始终允许调用。"""
        return PermissionDecision(
            behavior=PermissionBehavior.ALLOW,
            message="Document search is always allowed.",
        )

    def _get_embedding(self, text: str) -> list[float]:
        """调用本地 Ollama 生成查询向量。"""
        resp = ollama.embeddings(model=self._EMBED_MODEL, prompt=text)
        return resp["embedding"]

    async def call(self, query: str, top_k: int = 3, **kwargs: Any) -> ToolChunk:
        """执行 RAG 向量检索，返回与 query 最相关的文档片段。"""
        # 1) 生成查询向量
        try:
            embedding = self._get_embedding(query)
        except Exception as e:
            return ToolChunk(
                content=[TextBlock(text=f"向量化失败，请确认 Ollama 服务已启动。错误: {e}")],
            )

        # 2) 连接 PostgreSQL 执行向量相似度查询
        try:
            conn = psycopg.connect(
                host=self._DB_HOST,
                port=self._DB_PORT,
                dbname=self._DB_NAME,
                user=self._DB_USER,
                password=self._DB_PASSWORD,
            )
            cur = conn.cursor()

            # 使用 pgvector 的余弦距离运算符 <=> 进行最近邻搜索
            cur.execute(
                """
                SELECT id, content, source,
                       1 - (embedding <=> %s::vector) AS similarity
                FROM handbook_chunks
                ORDER BY embedding <=> %s::vector
                LIMIT %s
                """,
                (embedding, embedding, top_k),
            )
            rows = cur.fetchall()
            cur.close()
            conn.close()
        except Exception as e:
            return ToolChunk(
                content=[TextBlock(text=f"数据库查询失败，请确认 PostgreSQL 和 pgvector 扩展已启动。错误: {e}")],
            )

        # 3) 组装返回结果
        if not rows:
            return ToolChunk(
                content=[TextBlock(text="未找到与问题相关的文档内容。")],
            )

        # parts = [f"📋 从《新生入学手册》中检索到 {len(rows)} 条相关内容：\n"]
        sources = set(row[2] for row in rows if row[2])
        source_label = "、".join(f"《{s}》" for s in sources) if sources else "知识库"
        parts = [f"📋 从{source_label}中检索到 {len(rows)} 条相关内容：\n"]

        for idx, (row_id, content, source, similarity) in enumerate(rows, 1):
            sim_pct = f"{similarity * 100:.1f}%"
            parts.append(
                f"--- 片段 {idx}（相似度: {sim_pct}）---\n{content}\n"
            )

        parts.append(
            "\n💡 请根据以上检索到的文档内容回答用户的问题。"
            "如果文档中没有相关信息，请如实告知。"
        )

        return ToolChunk(
            content=[TextBlock(text="\n".join(parts))],
        )


def _create_model() -> OpenAIChatModel:
    """创建并返回一个共享的 LLM 模型实例"""
    api_key = os.getenv("OPENAI_API_KEY", "sk-xxx")
    base_url = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    return OpenAIChatModel(
        credential=OpenAICredential(
            api_key=api_key,
            base_url=base_url,
        ),
        model=model_name,
        stream=True,
    )


def build_weather_agent() -> Agent:
    """天气专家：只注册天气工具"""
    model = _create_model()  # 复用模型创建逻辑
    toolkit = Toolkit(tools=[GetWeather()])
    return Agent(
        name="weather_agent",
        system_prompt=(
            "你是一个天气查询助手。"
            "当用户询问天气时，使用 get_weather 工具查询。"
            "回答要简洁友好，包含穿衣建议。"
        ),
        model=model,
        toolkit=toolkit,
    )

def build_document_agent() -> Agent:
    """文档专家：只注册 RAG 检索工具"""
    model = _create_model()
    toolkit = Toolkit(tools=[SearchHandbook()])
    return Agent(
        name="document_agent",
        system_prompt=(
            "你是一个智能文档助手，能够回答与《新生入学手册》和《员工绩效考核规章制度》相关的问题。"
            "你必须先使用 search_handbook 工具检索文档内容，"
            "然后根据检索到的内容准确回答。如果文档中没有相关信息，请如实告知。"
        ),
        model=model,
        toolkit=toolkit,
    )

def build_date_agent() -> Agent:
    """日期专家：只注册日期工具"""
    model = _create_model()
    toolkit = Toolkit(tools=[GetCurrentDate()])
    return Agent(
        name="date_agent",
        system_prompt="你是一个日期时间查询助手。当用户询问时间日期时，使用 get_current_date 工具。",
        model=model,
        toolkit=toolkit,
    )

def build_general_agent() -> Agent:
    """通用专家：不注册任何工具"""
    model = _create_model()
    return Agent(
        name="general_agent",
        system_prompt="你是一个友好的中文AI助手。请简洁、准确地回答用户的问题。",
        model=model,
        # 不传 toolkit
    )



# 注意：不再在此处创建全局 agent 实例
# 多 Agent 路由模式下，各专家 Agent 由 MultiAgentRouter 统一管理
