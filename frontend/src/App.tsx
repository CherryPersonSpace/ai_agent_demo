import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, Conversation, ToolCallInfo, UploadedFile } from "./types";
import {
  checkHealth,
  sendMessageAGUI,
  listConversations,
  getConversation,
  deleteConversation,
  updateConversationTitle,
} from "./api";
import ChatMessageComponent from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import ConversationSidebar from "./components/ConversationSidebar";

type ConnectionStatus = "connecting" | "connected" | "disconnected";

/**
 * AG-UI 事件类型枚举（与 @ag-ui/client 的 EventType 对齐）
 */
const AGUIEventType = {
  RUN_STARTED: "RUN_STARTED",
  RUN_FINISHED: "RUN_FINISHED",
  TEXT_MESSAGE_START: "TEXT_MESSAGE_START",
  TEXT_MESSAGE_CONTENT: "TEXT_MESSAGE_CONTENT",
  TEXT_MESSAGE_END: "TEXT_MESSAGE_END",
  RUN_ERROR: "RUN_ERROR",
  TOOL_CALL_START: "TOOL_CALL_START",
  TOOL_CALL_ARGS: "TOOL_CALL_ARGS",
  TOOL_CALL_END: "TOOL_CALL_END",
  TOOL_CALL_RESULT: "TOOL_CALL_RESULT",
  CONVERSATION_CREATED: "CONVERSATION_CREATED",
} as const;

interface AGUIEvent {
  type: string;
  messageId?: string;
  delta?: string;
  message?: string;
  toolCallId?: string;
  toolCallName?: string;
  content?: string;
  conversationId?: string;
  [key: string]: unknown;
}

/**
 * 解析 AG-UI SSE 流，逐事件回调
 */
async function parseAGUIStream(
  response: Response,
  onEvent: (event: AGUIEvent) => void,
): Promise<void> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // 按行切分
    const lines = buffer.split("\n");
    buffer = lines.pop()!;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;
      const payload = trimmed.slice(6).trim();
      if (!payload) continue;

      try {
        const event = JSON.parse(payload) as AGUIEvent;
        onEvent(event);
      } catch {
        // 忽略无法解析的行
      }
    }
  }

  // 处理 buffer 中剩余的最后一条事件
  if (buffer.trim().startsWith("data: ")) {
    const payload = buffer.trim().slice(6).trim();
    if (payload) {
      try {
        const event = JSON.parse(payload) as AGUIEvent;
        onEvent(event);
      } catch {
        // 忽略
      }
    }
  }
}

/** 初始欢迎消息 */
const WELCOME_MESSAGE: ChatMessage = {
  id: "init",
  role: "agent",
  content: "你好！我是基于 AgentScope 2.x 的 AI 助手（AG-UI 协议），请输入消息开始对话 👇",
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [sending, setSending] = useState(false);

  // ---- 会话管理状态 ----
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部（rAF 确保浏览器完成布局后再滚动）
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages]);

  // 健康检查
  useEffect(() => {
    checkHealth()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnected"));
  }, []);

  // 加载会话列表
  const refreshConversations = useCallback(async () => {
    setSidebarLoading(true);
    try {
      const list = await listConversations();
      setConversations(list);
    } catch (err) {
      console.error("加载会话列表失败:", err);
    } finally {
      setSidebarLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  // 切换到某个会话：加载历史消息
  const handleSelectConversation = useCallback(
    async (conversationId: string) => {
      try {
        const detail = await getConversation(conversationId);
        setActiveConversationId(conversationId);

        // 将后端消息转换为前端 ChatMessage 格式
        const loadedMessages: ChatMessage[] = detail.messages.map((m) => ({
          id: m.id,
          role: m.role as ChatMessage["role"],
          content: m.content,
          toolCalls: m.tool_calls ?? undefined,
        }));

        if (loadedMessages.length === 0) {
          setMessages([WELCOME_MESSAGE]);
        } else {
          setMessages(loadedMessages);
        }
      } catch (err) {
        console.error("加载会话详情失败:", err);
      }
    },
    [],
  );

  // 新建对话
  const handleNewConversation = useCallback(() => {
    setActiveConversationId(null);
    setMessages([WELCOME_MESSAGE]);
  }, []);

  // 删除会话
  const handleDeleteConversation = useCallback(
    async (conversationId: string) => {
      try {
        await deleteConversation(conversationId);
        // 如果删除的是当前会话，重置聊天区
        if (conversationId === activeConversationId) {
          setActiveConversationId(null);
          setMessages([WELCOME_MESSAGE]);
        }
        refreshConversations();
      } catch (err) {
        console.error("删除会话失败:", err);
      }
    },
    [activeConversationId, refreshConversations],
  );

  // 重命名会话
  const handleRenameConversation = useCallback(
    async (conversationId: string, title: string) => {
      try {
        await updateConversationTitle(conversationId, title);
        refreshConversations();
      } catch (err) {
        console.error("重命名会话失败:", err);
      }
    },
    [refreshConversations],
  );

  const addMessage = useCallback((role: ChatMessage["role"], content: string) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
    };
    setMessages((prev) => [...prev, msg]);
    return msg.id;
  }, []);

  // 更新指定 id 的消息内容（用于流式追加）
  const appendToMessage = useCallback((id: string, delta: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: m.content + delta } : m)),
    );
  }, []);

  // 添加或更新工具调用信息
  const updateToolCall = useCallback(
    (msgId: string, toolCallId: string, update: Partial<ToolCallInfo> & { name?: string }) => {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== msgId) return m;
          const toolCalls = m.toolCalls ? [...m.toolCalls] : [];
          const idx = toolCalls.findIndex((t) => t.id === toolCallId);
          if (idx >= 0) {
            // 更新已有的工具调用
            toolCalls[idx] = { ...toolCalls[idx], ...update };
          } else if (update.name) {
            // 新建工具调用
            toolCalls.push({
              id: toolCallId,
              name: update.name,
              args: update.args || "",
              result: update.result,
              status: update.status || "calling",
            });
          }
          return { ...m, toolCalls };
        }),
      );
    },
    [],
  );

  const handleSend = useCallback(
    async (text: string, attachedFile?: UploadedFile) => {
      // 如果附带了文档，在消息中加入文档上下文
      const userDisplay = attachedFile
        ? `${text || "请帮我分析这个文档"}\n\n📎 已上传文档: ${attachedFile.filename}`
        : text;

      addMessage("user", userDisplay);
      setSending(true);

      try {
        // 构建发送给 Agent 的完整消息（包含文档内容）
        let fullMessage = text || "请帮我分析这个文档";
        if (attachedFile) {
          fullMessage = [
            fullMessage,
            "",
            `以下是用户上传的文档《${attachedFile.filename}》的完整内容：`,
            "```",
            attachedFile.content,
            "```",
            "",
            "请根据以上文档内容回答用户的问题。",
          ].join("\n");
        }

        await handleAGUI(fullMessage);
      } catch (err) {
        addMessage("error", `错误: ${(err as Error).message}`);
      } finally {
        setSending(false);
      }
    },
    [addMessage, appendToMessage, updateToolCall, activeConversationId],
  );

  // AG-UI 流式协议
  const handleAGUI = async (text: string) => {
    const res = await sendMessageAGUI(text, activeConversationId ?? undefined);
    if (!res.ok) {
      addMessage("error", `HTTP ${res.status}: ${res.statusText}`);
      return;
    }

    let agentMsgId: string | null = null;

    await parseAGUIStream(res, (event) => {
      switch (event.type) {
        case AGUIEventType.CONVERSATION_CREATED:
          // 后端自动创建了新会话，记录 conversationId
          if (event.conversationId) {
            setActiveConversationId(event.conversationId);
            refreshConversations();
          }
          break;

        case AGUIEventType.TEXT_MESSAGE_START:
          // 创建空的 agent 消息，准备接收内容
          agentMsgId = addMessage("agent", "");
          break;

        case AGUIEventType.TEXT_MESSAGE_CONTENT:
          // 追加文本增量
          if (agentMsgId && event.delta) {
            appendToMessage(agentMsgId, event.delta);
          }
          break;

        case AGUIEventType.TEXT_MESSAGE_END:
          // 消息结束后刷新会话列表（更新 updated_at）
          refreshConversations();
          break;

        case AGUIEventType.TOOL_CALL_START:
          // 工具调用开始
          if (agentMsgId && event.toolCallId) {
            updateToolCall(agentMsgId, event.toolCallId, {
              name: event.toolCallName || "unknown",
              args: "",
              status: "calling",
            });
          }
          break;

        case AGUIEventType.TOOL_CALL_ARGS:
          // 工具调用参数增量
          if (agentMsgId && event.toolCallId && event.delta) {
            updateToolCall(agentMsgId, event.toolCallId, {
              args: (event.delta as string) || "",
            });
          }
          break;

        case AGUIEventType.TOOL_CALL_END:
          // 工具调用结束
          if (agentMsgId && event.toolCallId) {
            updateToolCall(agentMsgId, event.toolCallId, {
              status: "done",
            });
          }
          break;

        case AGUIEventType.TOOL_CALL_RESULT:
          // 工具调用结果
          if (agentMsgId && event.toolCallId) {
            updateToolCall(agentMsgId, event.toolCallId, {
              result: event.content || "",
              status: "done",
            });
          }
          break;

        case AGUIEventType.RUN_ERROR:
          addMessage("error", event.message || "Agent 运行错误");
          break;

        case AGUIEventType.RUN_STARTED:
        case AGUIEventType.RUN_FINISHED:
          // 运行生命周期事件，当前无需处理
          break;

        default:
          // 其他事件类型（STATE_* 等），可扩展处理
          console.log("[AG-UI] 未处理的事件:", event.type, event);
          break;
      }
    });
  };

  const statusLabel: Record<ConnectionStatus, string> = {
    connecting: "连接中…",
    connected: "已连接 ✅",
    disconnected: "未连接 ❌",
  };

  return (
    <div className="app-container">
      {/* 侧边栏 */}
      {sidebarOpen && (
        <ConversationSidebar
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={handleSelectConversation}
          onDelete={handleDeleteConversation}
          onRename={handleRenameConversation}
          onNew={handleNewConversation}
          loading={sidebarLoading}
        />
      )}

      {/* 主聊天区域 */}
      <div className="app">
        <header>
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "收起侧边栏" : "展开侧边栏"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
          <h1>🤖 AgentScope 2.x Chat (AG-UI)</h1>
          <span className={`badge ${status}`}>{statusLabel[status]}</span>
        </header>

        <div className="chat-area" ref={chatRef}>
          {messages.map((msg) => (
            <ChatMessageComponent key={msg.id} message={msg} />
          ))}
          {sending && <div className="typing">思考中…</div>}
        </div>

        <ChatInput disabled={sending} onSend={handleSend} />
      </div>
    </div>
  );
}
