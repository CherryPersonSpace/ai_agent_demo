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
export async function sendMessageAGUI(message: string): Promise<Response> {
  return fetch(`${API_BASE}/agui/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
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
