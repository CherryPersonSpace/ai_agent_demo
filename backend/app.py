import sys
import os
import uuid
import time
import tempfile
import asyncio

# 把项目根目录加入 path，方便导入 backend.*
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Request, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from backend.router import MultiAgentRouter
router_agent = MultiAgentRouter()

from backend.document_parser import extract_document, SUPPORTED_EXTENSIONS
from backend.memory import (
    create_conversation,
    list_conversations,
    get_conversation,
    update_conversation_title,
    delete_conversation,
    add_message,
    get_messages,
    auto_title_from_content,
)
from agentscope.message import UserMsg
from agentscope.event import (
    TextBlockDeltaEvent,
    TextBlockStartEvent,
    TextBlockEndEvent,
    ToolCallStartEvent as ASToolCallStartEvent,
    ToolCallDeltaEvent,
    ToolCallEndEvent as ASToolCallEndEvent,
    ToolResultStartEvent,
    ToolResultTextDeltaEvent,
    ReplyEndEvent,
)

# AG-UI 协议
from ag_ui.core import (
    RunStartedEvent,
    RunFinishedEvent,
    TextMessageStartEvent,
    TextMessageContentEvent,
    TextMessageEndEvent,
    RunErrorEvent,
    ToolCallStartEvent as AGUIToolCallStartEvent,
    ToolCallArgsEvent as AGUIToolCallArgsEvent,
    ToolCallEndEvent as AGUIToolCallEndEvent,
    ToolCallResultEvent as AGUIToolCallResultEvent,
)
from ag_ui.encoder import EventEncoder

app = FastAPI(title="AgentScope 2.x + AG-UI Demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- 会话管理 API ----------

@app.post("/conversations")
async def api_create_conversation(request: Request):
    """创建新会话，返回会话记录。"""
    data = await request.json() if request.headers.get("content-type") == "application/json" else {}
    title = data.get("title", "新对话")
    conv = await asyncio.to_thread(create_conversation, title)
    return conv


@app.get("/conversations")
async def api_list_conversations(limit: int = 50, offset: int = 0):
    """获取会话列表，按更新时间倒序排列。"""
    return await asyncio.to_thread(list_conversations, limit, offset)


@app.get("/conversations/{conversation_id}")
async def api_get_conversation(conversation_id: str):
    """获取单个会话及其全部消息。"""
    conv = await asyncio.to_thread(get_conversation, conversation_id)
    if not conv:
        raise HTTPException(status_code=404, detail="会话不存在")
    messages = await asyncio.to_thread(get_messages, conversation_id)
    return {**conv, "messages": messages}


@app.patch("/conversations/{conversation_id}")
async def api_update_conversation(conversation_id: str, request: Request):
    """更新会话标题。"""
    data = await request.json()
    title = data.get("title")
    if not title:
        raise HTTPException(status_code=400, detail="title 不能为空")
    conv = await asyncio.to_thread(update_conversation_title, conversation_id, title)
    if not conv:
        raise HTTPException(status_code=404, detail="会话不存在")
    return conv


@app.delete("/conversations/{conversation_id}")
async def api_delete_conversation(conversation_id: str):
    """删除会话及其关联消息。"""
    deleted = await asyncio.to_thread(delete_conversation, conversation_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="会话不存在")
    return {"status": "ok"}


# ---------- AG-UI 流式接口（支持会话持久化）----------
@app.post("/agui/stream")
async def chat_stream(request: Request):
    """
    AG-UI 标准协议 SSE 端点。
    请求体: {"message": "...", "threadId": "...", "runId": "...", "conversationId": "..."}
    输出: AG-UI 标准事件流

    如果传入 conversationId，消息将被持久化到该会话中。
    如果未传入 conversationId，将自动创建新会话。
    """
    data = await request.json()
    user_text = data.get("message", "").strip()
    if not user_text:
        return {"type": "error", "content": "message 不能为空"}

    thread_id = data.get("threadId", str(uuid.uuid4()))
    run_id = data.get("runId", str(uuid.uuid4()))
    message_id = str(uuid.uuid4())

    # ---- 会话持久化 ----
    conversation_id = data.get("conversationId")
    is_new_conversation = False

    if not conversation_id:
        # 自动创建新会话，以用户首条消息生成标题
        title = auto_title_from_content(user_text)
        conv = await asyncio.to_thread(create_conversation, title)
        conversation_id = conv["id"]
        is_new_conversation = True

    # 保存用户消息
    await asyncio.to_thread(add_message, conversation_id, "user", user_text)

    user_msg = UserMsg(name="user", content=user_text)
    encoder = EventEncoder()

    async def event_generator():
        # 收集 agent 完整回复内容，用于持久化
        collected_text = ""
        collected_tool_calls: list[dict] = []
        current_tool_id = None
        current_tool_name = None
        current_tool_args = ""

        # 如果是新会话，在 RUN_STARTED 事件中附带 conversationId
        # 1. RUN_STARTED
        yield encoder.encode(
            RunStartedEvent(threadId=thread_id, runId=run_id, timestamp=_now())
        )

        # 2. TEXT_MESSAGE_START
        yield encoder.encode(
            TextMessageStartEvent(messageId=message_id, role="assistant", timestamp=_now())
        )

        text_started = False

        try:
            # 使用 reply_stream 获取流式事件，支持工具调用
            async for event in router_agent.reply_stream(user_msg):
                # 处理文本块开始
                if isinstance(event, TextBlockStartEvent):
                    if not text_started:
                        text_started = True

                # 处理文本增量
                elif isinstance(event, TextBlockDeltaEvent):
                    collected_text += event.delta
                    yield encoder.encode(
                        TextMessageContentEvent(
                            messageId=message_id,
                            delta=event.delta,
                            timestamp=_now(),
                        )
                    )

                # 处理工具调用开始
                elif isinstance(event, ASToolCallStartEvent):
                    current_tool_id = event.tool_call_id
                    current_tool_name = event.tool_call_name
                    current_tool_args = ""
                    yield encoder.encode(
                        AGUIToolCallStartEvent(
                            toolCallId=event.tool_call_id,
                            toolCallName=event.tool_call_name,
                            timestamp=_now(),
                        )
                    )

                # 处理工具调用参数增量
                elif isinstance(event, ToolCallDeltaEvent):
                    current_tool_args += event.delta
                    yield encoder.encode(
                        AGUIToolCallArgsEvent(
                            toolCallId=event.tool_call_id,
                            delta=event.delta,
                            timestamp=_now(),
                        )
                    )

                # 处理工具调用结束
                elif isinstance(event, ASToolCallEndEvent):
                    yield encoder.encode(
                        AGUIToolCallEndEvent(
                            toolCallId=event.tool_call_id,
                            timestamp=_now(),
                        )
                    )

                # 处理工具结果文本增量
                elif isinstance(event, ToolResultTextDeltaEvent):
                    # 记录工具调用结果
                    if current_tool_id:
                        collected_tool_calls.append({
                            "id": current_tool_id,
                            "name": current_tool_name or "unknown",
                            "args": current_tool_args,
                            "result": event.delta,
                        })
                        current_tool_id = None
                        current_tool_name = None
                        current_tool_args = ""
                    else:
                        # 追加到最后一个工具调用的结果
                        if collected_tool_calls:
                            collected_tool_calls[-1]["result"] = (
                                collected_tool_calls[-1].get("result", "") + event.delta
                            )

                    yield encoder.encode(
                        AGUIToolCallResultEvent(
                            messageId=message_id,
                            toolCallId=event.tool_call_id,
                            content=event.delta,
                            timestamp=_now(),
                        )
                    )

        except Exception as e:
            # 出错时发 RUN_ERROR
            yield encoder.encode(
                RunErrorEvent(message=str(e), code="AGENT_ERROR", timestamp=_now())
            )
            return

        # 3. TEXT_MESSAGE_END
        yield encoder.encode(
            TextMessageEndEvent(messageId=message_id, timestamp=_now())
        )

        # 4. RUN_FINISHED
        yield encoder.encode(
            RunFinishedEvent(threadId=thread_id, runId=run_id, timestamp=_now())
        )

        # ---- 持久化 Agent 回复 ----
        try:
            tool_calls_data = collected_tool_calls if collected_tool_calls else None
            await asyncio.to_thread(add_message, conversation_id, "agent", collected_text, tool_calls=tool_calls_data)
        except Exception:
            # 持久化失败不影响流式输出
            pass

        # 如果是新会话，发送一个自定义事件告知前端 conversationId
        if is_new_conversation:
            yield f"data: {__import__('json').dumps({'type': 'CONVERSATION_CREATED', 'conversationId': conversation_id})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type=encoder.get_content_type(),
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


def _now() -> int:
    """返回当前毫秒级时间戳"""
    return int(time.time() * 1000)


# ---------- 文件上传 + 文档内容识别 ----------
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    上传文档并提取文本内容。
    支持格式: .txt .docx .xls .xlsx .pptx .pdf
    返回: { filename, content, char_count }
    """
    from pathlib import Path

    ext = Path(file.filename).suffix.lower() if file.filename else ""
    if ext not in SUPPORTED_EXTENSIONS:
        supported = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise HTTPException(
            status_code=400,
            detail=f"不支持的文件格式 '{ext}'，目前支持: {supported}",
        )

    # 保存到临时文件（保留原始后缀以便解析器识别格式）
    # 注意: 不能用 NamedTemporaryFile 的 with 块，因为在 Windows 上
    # 即使 with 结束，文件句柄仍可能被锁定，导致 openpyxl/zipfile 无法读取。
    suffix = ext
    tmp_path = None
    try:
        content_bytes = await file.read()
        tmp_fd, tmp_path = tempfile.mkstemp(suffix=suffix)
        with os.fdopen(tmp_fd, "wb") as tmp:
            tmp.write(content_bytes)

        # 调用解析器提取文本（同步阻塞操作，放到线程池执行）
        text = await asyncio.to_thread(extract_document, tmp_path)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"文档解析失败: {e}")
    finally:
        # 清理临时文件
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except PermissionError:
                pass  # Windows 下文件可能仍被占用，忽略即可

    return {
        "filename": file.filename,
        "content": text,
        "char_count": len(text),
    }


# ---------- 健康检查 ----------
@app.get("/health")
async def health():
    return {"status": "ok", "agent": router_agent.name}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app:app", host="0.0.0.0", port=8000, reload=True)
