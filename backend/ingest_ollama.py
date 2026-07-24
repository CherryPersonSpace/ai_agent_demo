import os
os.environ['PYTHONIOENCODING'] = 'utf-8'
os.environ['PGCLIENTENCODING'] = 'utf-8'

import psycopg
import ollama
from docx import Document  # pip install python-docx

# ====== 数据库配置 ======
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "campus_handbook"
DB_USER = "postgres"
DB_PASSWORD = "930106zh"

# ====== Ollama 配置 ======
# 确保 Ollama 服务已启动（终端执行: ollama serve）
# 确保已拉取模型（终端执行: ollama pull nomic-embed-text）
OLLAMA_HOST = "http://localhost:11434"
OLLAMA_EMBED_MODEL = "nomic-embed-text"  # 维度 768
# OLLAMA_EMBED_MODEL = "bge-m3"        # 备选，维度 1024，中文更强

# ============================================================
# 文本提取
# ============================================================

def extract_text_from_docx(file_path: str) -> str:
    """从 .docx 文件中提取纯文本（含表格）"""
    from docx.oxml.ns import qn
    from docx.text.paragraph import Paragraph
    from docx.table import Table

    doc = Document(file_path)
    texts = []

    for child in doc.element.body:
        # ——— 段落 ———
        if child.tag == qn('w:p'):
            para = Paragraph(child, doc)
            text = para.text.strip()
            if text:
                texts.append(text)
        # ——— 表格 ———
        elif child.tag == qn('w:tbl'):
            table = Table(child, doc)
            table_lines = []
            for row_idx, row in enumerate(table.rows):
                cells = [cell.text.strip().replace('\n', ' ') for cell in row.cells]
                row_text = " | ".join(cells)
                if row_text.strip():
                    table_lines.append(row_text)
                # 第一行后加分隔线（Markdown 表格格式）
                if row_idx == 0 and table_lines:
                    table_lines.append(" | ".join(["---"] * len(cells)))
            if table_lines:
                texts.append("[表格]\n" + "\n".join(table_lines))

    return "\n\n".join(texts)


def chunk_text(text: str, max_chars: int = 500, overlap: int = 50) -> list[str]:
    """
    滑动窗口切片：
    - max_chars: 每块最大字符数
    - overlap:   相邻块重叠字符数（保留上下文）
    """
    chunks = []
    start = 0
    text_len = len(text)
    while start < text_len:
        end = min(start + max_chars, text_len)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end == text_len:
            break
        start = end - overlap
    return chunks


# ============================================================
# Embedding（Ollama 本地，无需 API Key）
# ============================================================

def get_embedding(text: str) -> list[float]:
    """调用本地 Ollama 生成向量"""
    resp = ollama.embeddings(
        model=OLLAMA_EMBED_MODEL,
        prompt=text
    )
    return resp["embedding"]


# ============================================================
# 主流程
# ============================================================

def main():
    # ① 文本来源：换成你自己的 .docx 路径
    docx_path = r"D:\code\ai_agent_demo\新生入学手册.docx"  # ← 改成你的文件路径

    print(f"📄 正在读取文档: {docx_path}")
    text = extract_text_from_docx(docx_path)
    print(f"   提取到 {len(text)} 个字符")

    # ② 切片
    chunks = chunk_text(text, max_chars=500, overlap=50)
    print(f"   切分为 {len(chunks)} 个文本块")

    # ③ 连接数据库
    print("🔌 正在连接 PostgreSQL...")
    conn = psycopg.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
    )
    cur = conn.cursor()

    # ④ 确保表存在（如果还没建）
    cur.execute("""
        CREATE TABLE IF NOT EXISTS handbook_chunks (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            embedding vector(768),          -- nomic-embed-text 维度=768
            source VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    # 如果以后换 bge-m3（维度1024），需要先 DROP TABLE 再改向量维度重建

    # ⑤ 逐块生成 embedding 并入库
    for i, chunk in enumerate(chunks):
        print(f"   [{i+1}/{len(chunks)}] 正在向量化...")
        emb = get_embedding(chunk)
        cur.execute(
            "INSERT INTO handbook_chunks (content, embedding, source) VALUES (%s, %s, %s)",
            (chunk, emb, os.path.basename(docx_path))
        )

    conn.commit()
    cur.close()
    conn.close()
    print(f"✅ 全部完成！共写入 {len(chunks)} 条记录到 PostgreSQL")


if __name__ == "__main__":
    main()
