import sys
import os
import uuid
import time
import tempfile

# 把项目根目录加入 path，方便导入 backend.*
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Request, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from backend.router import MultiAgentRouter
router_agent = MultiAgentRouter()

from backend.document_parser import extract_document, SUPPORTED_EXTENSIONS
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

# ---------- AG-UI 流式接口 ----------
@app.post("/agui/stream")
async def chat_stream(request: Request):
    """
    AG-UI 标准协议 SSE 端点。
    请求体: {"message": "...", "threadId": "...", "runId": "..."}
    输出: AG-UI 标准事件流
    """
    data = await request.json()
    user_text = data.get("message", "").strip()
    if not user_text:
        return {"type": "error", "content": "message 不能为空"}

    thread_id = data.get("threadId", str(uuid.uuid4()))
    run_id = data.get("runId", str(uuid.uuid4()))
    message_id = str(uuid.uuid4())

    user_msg = UserMsg(name="user", content=user_text)
    encoder = EventEncoder()

    async def event_generator():
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
                    yield encoder.encode(
                        TextMessageContentEvent(
                            messageId=message_id,
                            delta=event.delta,
                            timestamp=_now(),
                        )
                    )

                # 处理工具调用开始
                elif isinstance(event, ASToolCallStartEvent):
                    yield encoder.encode(
                        AGUIToolCallStartEvent(
                            toolCallId=event.tool_call_id,
                            toolCallName=event.tool_call_name,
                            timestamp=_now(),
                        )
                    )

                # 处理工具调用参数增量
                elif isinstance(event, ToolCallDeltaEvent):
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
    suffix = ext
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            content_bytes = await file.read()
            tmp.write(content_bytes)
            tmp_path = tmp.name

        # 调用解析器提取文本
        text = extract_document(tmp_path)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"文档解析失败: {e}")
    finally:
        # 清理临时文件
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

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
