/** 工具调用信息 */
export interface ToolCallInfo {
  id: string;
  name: string;
  args: string;
  result?: string;
  status: "calling" | "done";
}

/** 上传文件信息 */
export interface UploadedFile {
  filename: string;
  content: string;
  charCount: number;
}

/** 聊天消息类型 */
export interface ChatMessage {
  id: string;
  role: "user" | "agent" | "error";
  content: string;
  streaming?: boolean;
  toolCalls?: ToolCallInfo[];
  /** 附带的文档内容（用户上传后拼入上下文） */
  attachedFile?: UploadedFile;
}

/** 会话记录 */
export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

/** 会话详情（含消息列表） */
export interface ConversationDetail extends Conversation {
  messages: ConversationMessage[];
}

/** 数据库中的消息记录 */
export interface ConversationMessage {
  id: string;
  conversation_id: string;
  role: "user" | "agent" | "error";
  content: string;
  tool_calls?: ToolCallInfo[] | null;
  created_at: string;
}
