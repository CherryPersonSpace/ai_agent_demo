"""
数据库迁移脚本 —— 创建会话记忆管理所需的表结构。

运行方式:
    python -m backend.migrations

需要 PostgreSQL 已启动，且数据库 campus_handbook 已创建。
"""

import psycopg

# 与项目其他模块保持一致的数据库配置
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "campus_handbook"
DB_USER = "postgres"
DB_PASSWORD = "930106zh"

CREATE_CONVERSATIONS_SQL = """
CREATE TABLE IF NOT EXISTS conversations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255) NOT NULL DEFAULT '新对话',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""

CREATE_MESSAGES_SQL = """
CREATE TABLE IF NOT EXISTS messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role            VARCHAR(20) NOT NULL,  -- 'user' | 'agent' | 'error'
    content         TEXT NOT NULL DEFAULT '',
    tool_calls      JSONB,                 -- 工具调用信息，JSON 数组
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id
    ON messages(conversation_id, created_at);
"""


def run_migration():
    """执行数据库迁移，创建 conversations 和 messages 表。"""
    print("[INFO] 正在连接 PostgreSQL...")
    conn = psycopg.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
    )

    try:
        with conn.cursor() as cur:
            print("[INFO] 创建 conversations 表...")
            cur.execute(CREATE_CONVERSATIONS_SQL)

            print("[INFO] 创建 messages 表...")
            cur.execute(CREATE_MESSAGES_SQL)

        conn.commit()
        print("[OK] 迁移完成！")
    except Exception as e:
        conn.rollback()
        print(f"[ERROR] 迁移失败: {e}")
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    run_migration()
