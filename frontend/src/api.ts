import type { Conversation, ConversationDetail } from "./types";

const API_BASE = "";

/** 健康检查 */
export async function checkHealth(): Promise<{ status: string; agent: string }> {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

/**
 * 通过 AG-UI 协议发送消息（SSE 流式）
 * 返回一个 ReadableStream，由调用方解析 AG-UI 事件
 */
export async function sendMessageAGUI(
  message: string,
  conversationId?: string,
): Promise<Response> {
  return fetch(`${API_BASE}/agui/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, conversationId }),
  });
}

/**
 * 上传文档文件，后端提取文本内容后返回
 */
export async function uploadFile(
  file: File,
): Promise<{ filename: string; content: string; char_count: number }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `上传失败 (HTTP ${res.status})`);
  }

  return res.json();
}

// ============================================================
//  会话管理 API
// ============================================================

/** 创建新会话 */
export async function createConversation(
  title?: string,
): Promise<Conversation> {
  const res = await fetch(`${API_BASE}/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("创建会话失败");
  return res.json();
}

/** 获取会话列表 */
export async function listConversations(
  limit = 50,
  offset = 0,
): Promise<Conversation[]> {
  const res = await fetch(
    `${API_BASE}/conversations?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) throw new Error("获取会话列表失败");
  return res.json();
}

/** 获取单个会话详情（含消息列表） */
export async function getConversation(
  conversationId: string,
): Promise<ConversationDetail> {
  const res = await fetch(`${API_BASE}/conversations/${conversationId}`);
  if (!res.ok) throw new Error("获取会话详情失败");
  return res.json();
}

/** 更新会话标题 */
export async function updateConversationTitle(
  conversationId: string,
  title: string,
): Promise<Conversation> {
  const res = await fetch(`${API_BASE}/conversations/${conversationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("更新会话标题失败");
  return res.json();
}

/** 删除会话 */
export async function deleteConversation(
  conversationId: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/conversations/${conversationId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("删除会话失败");
}
