import { useState } from "react";
import type { Conversation } from "../types";

interface Props {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onNew: () => void;
  loading: boolean;
}

export default function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onRename,
  onNew,
  loading,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleStartRename = (conv: Conversation) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleConfirmRename = () => {
    if (editingId && editTitle.trim()) {
      onRename(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirmRename();
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditTitle("");
    }
  };

  const formatTime = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      const now = new Date();
      const isToday =
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate();

      if (isToday) {
        return d.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return d.toLocaleDateString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>💬 会话历史</h2>
        <button
          className="new-chat-btn"
          onClick={onNew}
          title="新建对话"
        >
          ＋ 新对话
        </button>
      </div>

      <div className="sidebar-list">
        {loading && <div className="sidebar-empty">加载中…</div>}

        {!loading && conversations.length === 0 && (
          <div className="sidebar-empty">暂无历史会话</div>
        )}

        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`sidebar-item ${conv.id === activeId ? "active" : ""}`}
            onClick={() => onSelect(conv.id)}
          >
            <div className="sidebar-item-content">
              {editingId === conv.id ? (
                <input
                  className="sidebar-rename-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleConfirmRename}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="sidebar-item-title" title={conv.title}>
                    {conv.title}
                  </span>
                  <span className="sidebar-item-time">
                    {formatTime(conv.updated_at)}
                  </span>
                </>
              )}
            </div>

            {editingId !== conv.id && (
              <div className="sidebar-item-actions">
                <button
                  className="sidebar-action-btn"
                  title="重命名"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartRename(conv);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="sidebar-action-btn sidebar-action-delete"
                  title="删除"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
