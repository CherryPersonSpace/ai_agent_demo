import { Markdown } from "@agentscope-ai/chat"
import type { ChatMessage, ToolCallInfo } from "../types";

interface Props {
  message: ChatMessage;
}

function ToolCallCard({ tool }: { tool: ToolCallInfo }) {
  return (
    <div className={`tool-call ${tool.status}`}>
      <div className="tool-call-header">
        <span className="tool-icon">🔧</span>
        <span className="tool-name">{tool.name}</span>
        <span className={`tool-status ${tool.status}`}>
          {tool.status === "calling" ? "⏳ 调用中..." : "✅ 完成"}
        </span>
      </div>
      {tool.result && (
        <div className="tool-call-result">
          <pre>{tool.result}</pre>
        </div>
      )}
    </div>
  );
}

export default function ChatMessage({ message }: Props) {
  const isAssistant = message.role === "agent";

  return (
    <div className={`msg ${message.role}`}>
      {isAssistant && message.toolCalls && message.toolCalls.length > 0 && (
        <div className="tool-calls-container">
          {message.toolCalls.map((tool) => (
            <ToolCallCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
      {isAssistant ? (
        <Markdown content={message.content} allowHtml={true} />
      ) : (
        message.content
      )}
    </div>
  );
}
