"""
会话记忆管理 —— 数据库 CRUD 操作模块。

提供会话（conversations）和消息（messages）的增删改查功能，
供 app.py 中的 API 端点调用。
"""

from __future__ import annotations

import json
import uuid
from datetime import datetime
from typing import Any

import psycopg
from psycopg.rows import dict_row

# 与项目其他模块保持一致的数据库配置
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "campus_handbook"
DB_USER = "postgres"
DB_PASSWORD = "930106zh"


def _get_conn():
    """获取数据库连接（dict_row 让查询结果以字典返回）。"""
    return psycopg.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        row_factory=dict_row,
    )


# ============================================================
#  Conversations（会话）
# ============================================================

def create_conversation(title: str = "新对话") -> dict:
    """创建新会话，返回会话记录。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO conversations (title)
                VALUES (%s)
                RETURNING id, title, created_at, updated_at
                """,
                (title,),
            )
            row = cur.fetchone()
            conn.commit()
            return _serialize(row)


def list_conversations(limit: int = 50, offset: int = 0) -> list[dict]:
    """获取会话列表，按更新时间倒序排列。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, title, created_at, updated_at
                FROM conversations
                ORDER BY updated_at DESC
                LIMIT %s OFFSET %s
                """,
                (limit, offset),
            )
            rows = cur.fetchall()
            return [_serialize(r) for r in rows]


def get_conversation(conversation_id: str) -> dict | None:
    """根据 ID 获取单个会话。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, title, created_at, updated_at
                FROM conversations
                WHERE id = %s
                """,
                (conversation_id,),
            )
            row = cur.fetchone()
            return _serialize(row) if row else None


def update_conversation_title(conversation_id: str, title: str) -> dict | None:
    """更新会话标题。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE conversations
                SET title = %s, updated_at = NOW()
                WHERE id = %s
                RETURNING id, title, created_at, updated_at
                """,
                (title, conversation_id),
            )
            row = cur.fetchone()
            conn.commit()
            return _serialize(row) if row else None


def delete_conversation(conversation_id: str) -> bool:
    """删除会话（级联删除关联的消息）。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM conversations WHERE id = %s",
                (conversation_id,),
            )
            deleted = cur.rowcount > 0
            conn.commit()
            return deleted


# ============================================================
#  Messages（消息）
# ============================================================

def add_message(
    conversation_id: str,
    role: str,
    content: str,
    tool_calls: list[dict] | None = None,
) -> dict:
    """向会话中添加一条消息，并更新会话的 updated_at。"""
    tool_calls_json = json.dumps(tool_calls, ensure_ascii=False) if tool_calls else None

    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO messages (conversation_id, role, content, tool_calls)
                VALUES (%s, %s, %s, %s)
                RETURNING id, conversation_id, role, content, tool_calls, created_at
                """,
                (conversation_id, role, content, tool_calls_json),
            )
            row = cur.fetchone()

            # 同时更新会话的 updated_at
            cur.execute(
                "UPDATE conversations SET updated_at = NOW() WHERE id = %s",
                (conversation_id,),
            )
            conn.commit()
            return _serialize_message(row)


def get_messages(conversation_id: str) -> list[dict]:
    """获取某个会话的全部消息，按创建时间排序。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, conversation_id, role, content, tool_calls, created_at
                FROM messages
                WHERE conversation_id = %s
                ORDER BY created_at ASC
                """,
                (conversation_id,),
            )
            rows = cur.fetchall()
            return [_serialize_message(r) for r in rows]


def delete_messages(conversation_id: str) -> int:
    """删除某个会话的全部消息，返回删除的行数。"""
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM messages WHERE conversation_id = %s",
                (conversation_id,),
            )
            deleted = cur.rowcount
            conn.commit()
            return deleted


# ============================================================
#  自动标题生成
# ============================================================

def auto_title_from_content(first_user_message: str, max_len: int = 30) -> str:
    """根据用户的第一条消息自动生成会话标题。"""
    text = first_user_message.strip().replace("\n", " ")
    if len(text) > max_len:
        text = text[:max_len] + "…"
    return text or "新对话"


# ============================================================
#  序列化辅助
# ============================================================

def _serialize(row: dict | None) -> dict | None:
    """将 psycopg dict_row 结果中的 datetime/UUID 转为可 JSON 序列化的格式。"""
    if row is None:
        return None
    result = {}
    for k, v in row.items():
        if isinstance(v, uuid.UUID):
            result[k] = str(v)
        elif isinstance(v, datetime):
            result[k] = v.isoformat()
        else:
            result[k] = v
    return result


def _serialize_message(row: dict | None) -> dict | None:
    """序列化消息记录，特殊处理 tool_calls JSONB 字段。"""
    if row is None:
        return None
    result = {}
    for k, v in row.items():
        if isinstance(v, uuid.UUID):
            result[k] = str(v)
        elif isinstance(v, datetime):
            result[k] = v.isoformat()
        elif k == "tool_calls" and isinstance(v, str):
            try:
                result[k] = json.loads(v)
            except (json.JSONDecodeError, TypeError):
                result[k] = v
        else:
            result[k] = v
    return result
