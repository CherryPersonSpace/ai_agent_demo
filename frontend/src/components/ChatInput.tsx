import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react";
import { uploadFile } from "../api";
import type { UploadedFile } from "../types";

const ACCEPTED_EXTENSIONS = ".txt,.docx,.xls,.xlsx,.pptx,.pdf";

interface Props {
  disabled: boolean;
  onSend: (text: string, attachedFile?: UploadedFile) => void;
}

export default function ChatInput({ disabled, onSend }: Props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if ((!trimmed && !file) || disabled) return;
    onSend(trimmed, file ?? undefined);
    setText("");
    setFile(null);
    setUploadError(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setUploading(true);
    setUploadError(null);
    setFile(null);

    try {
      const result = await uploadFile(selected);
      setFile({
        filename: result.filename,
        content: result.content,
        charCount: result.char_count,
      });
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      // 重置 file input 以便再次选择同一文件
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadError(null);
  };

  return (
    <footer>
      {/* 文件选择区 */}
      <div className="upload-area">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload-input"
          disabled={disabled || uploading}
        />
        <button
          type="button"
          className="upload-btn"
          title="上传文档 (txt/docx/xls/xlsx/pptx/pdf)"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
        >
          {uploading ? "⏳" : "📎"}
        </button>

        {/* 已选文件提示 */}
        {file && (
          <span className="file-tag">
            📄 {file.filename}（{file.charCount.toLocaleString()} 字）
            <button
              type="button"
              className="file-remove"
              onClick={handleRemoveFile}
              title="移除文件"
            >
              ✕
            </button>
          </span>
        )}

        {/* 上传错误提示 */}
        {uploadError && (
          <span className="file-error">❌ {uploadError}</span>
        )}
      </div>

      {/* 消息输入 + 发送按钮 */}
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          file
            ? "输入关于文档的问题，回车发送…"
            : "输入消息，回车发送…"
        }
        autoComplete="off"
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled || uploading}>
        发送
      </button>
    </footer>
  );
}
