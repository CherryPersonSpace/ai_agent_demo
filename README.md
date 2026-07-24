# 🤖 AI Agent Demo — AgentScope 2.x + FastAPI + AG-UI

> 入门级项目，目标：先把一条链路跑通，再逐步加功能。

## 技术栈

| 组件 | 技术 |
|------|------|
| Agent 框架 | **AgentScope 2.0.4.post1** |
| Web 框架 | FastAPI + Uvicorn |
| 前端 | React 18 + TypeScript + Vite（AG-UI 风格事件流） |
| 模型 | OpenAI 兼容 API（可换 DeepSeek / 通义 / Ollama） |
| RAG 知识库 | PostgreSQL + pgvector + Ollama 本地 Embedding |
| 文档解析 | python-docx / openpyxl / xlrd / python-pptx / PyMuPDF |

## 目录结构

```
ai_agent_demo/
├── backend/
│   ├── __init__.py
│   ├── agent.py              # AgentScope Agent 定义（工具调用、权限控制）
│   ├── app.py                # FastAPI 服务（SSE 流式对话 + 文件上传）
│   ├── document_parser.py    # 文档内容提取（.txt .docx .xls .xlsx .pptx .pdf）
│   └── ingest_ollama.py      # RAG 知识库文档入库脚本（Ollama 本地 Embedding + PostgreSQL）
├── frontend/
│   ├── index.html            # 入口 HTML
│   ├── package.json          # 前端依赖管理
│   ├── vite.config.ts        # Vite 构建配置
│   ├── tsconfig.json         # TypeScript 配置
│   └── src/
│       ├── main.tsx          # React 入口
│       ├── App.tsx           # 主应用组件
│       ├── App.css           # 全局样式
│       ├── api.ts            # 后端 API 调用封装
│       ├── types.ts          # TypeScript 类型定义
│       └── components/
│           ├── ChatInput.tsx  # 聊天输入组件
│           └── ChatMessage.tsx # 聊天消息组件
├── 新生入学手册.docx           # RAG 示例文档
├── .env                      # 环境变量（不提交到 Git）
├── .env.example              # 环境变量模板
├── requirements.txt          # Python 依赖
└── README.md
```

## 快速开始

### 1. 创建并激活虚拟环境

```bash
python -m venv venv

# macOS / Linux
source venv/bin/activate
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
```

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 配置 API Key

```bash
cp .env.example .env
# 编辑 .env，填入你的真实 API Key
```

`.env` 内容：

```env
OPENAI_API_KEY=sk-你的真实key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

> 💡 想用 DeepSeek？把 `OPENAI_BASE_URL` 改成 `https://api.deepseek.com/v1`，`OPENAI_MODEL` 改成 `deepseek-chat` 即可，无需改代码。

### 4. 启动后端

```bash
python -m backend.app
# 或
uvicorn backend.app:app --reload --port 8000
```

看到 `Uvicorn running on http://0.0.0.0:8000` 即成功。

### 5. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`，Vite 开发代理会将 `/agui` 和 `/upload` 请求转发到后端 `http://localhost:8000`。

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/health` | 健康检查 |
| POST | `/agui/stream` | SSE 流式对话（AG-UI 协议） |
| POST | `/upload` | 上传文档并提取文本内容 |

### POST `/agui/stream`

请求体：

```json
{
  "message": "你好",
  "threadId": "可选-会话ID",
  "runId": "可选-运行ID"
}
```

返回：AG-UI 标准 SSE 事件流（`RUN_STARTED` → `TEXT_MESSAGE_*` → `TOOL_CALL_*` → `RUN_FINISHED`）。

### POST `/upload`

请求体：`multipart/form-data`，字段名 `file`。

支持格式：`.txt` `.docx` `.xls` `.xlsx` `.pptx` `.pdf`

返回：

```json
{
  "filename": "example.xlsx",
  "content": "提取的纯文本内容...",
  "char_count": 1234
}
```

## RAG 知识库（可选）

如需使用 RAG 文档问答功能，需额外准备：

1. **PostgreSQL + pgvector**：安装并创建数据库
   ```bash
   # 创建数据库
   createdb campus_handbook
   # 启用 pgvector 扩展
   psql -d campus_handbook -c "CREATE EXTENSION IF NOT EXISTS vector;"
   ```

2. **Ollama 本地 Embedding 模型**：
   ```bash
   ollama pull nomic-embed-text
   ```

3. **文档入库**：
   ```bash
   python -m backend.ingest_ollama
   ```

   入库脚本会对 `新生入学手册.docx` 进行分块、向量化并写入 PostgreSQL。

## 自检清单

```bash
# 1. 确认 agentscope 版本
python -c "import agentscope; print(agentscope.__version__)"

# 2. 确认关键模块可导入
python -c "from agentscope.agent import Agent; print('Agent OK')"
python -c "from agentscope.model import OpenAIChatModel; print('Model OK')"
python -c "from agentscope.credential import OpenAICredential; print('Credential OK')"

# 3. 确认文档解析依赖
python -c "import openpyxl; import xlrd; import fitz; print('Document parsing OK')"

# 4. 测试健康检查
curl http://127.0.0.1:8000/health
```

## 演进路线图

| 版本 | 目标 |
|------|------|
| v0.1 ✅ | 单 Agent + 非流式 + 简单前端 |
| v0.2 | 多 Agent 协作（Leader / Worker） |
| v0.3 ✅ | 工具调用（日期查询、天气查询、RAG 知识库检索） |
| v0.4 | 长期记忆（ReMe / 向量库） |
| v0.5 ✅ | RAG 知识库问答（Ollama + PostgreSQL + pgvector） |
| v0.6 | 权限系统 + 人工审批 |
| v0.7 | 多租户服务化部署 |

## 常见问题

**Q: `ImportError: cannot import name 'init' from 'agentscope'`**
A: 这是 AgentScope 1.x 的写法。2.x 已移除 `init()`，本项目代码已适配 2.x。

**Q: `ModuleNotFoundError: agentscope.agents`**
A: 同上，2.x 没有 `agentscope.agents` 子包，Agent 直接在 `agentscope.agent` 下。

**Q: `pip install -r requirements.txt` 报 `UnicodeDecodeError: 'gbk'`**
A: Windows 默认 GBK 编码与 requirements.txt 中的 UTF-8 内容冲突。可先单独安装关键依赖：`pip install openpyxl xlrd python-pptx PyMuPDF`。

**Q: 上传 `.xlsx` 提示 `No module named 'openpyxl'`**
A: 执行 `pip install openpyxl xlrd` 安装 Excel 解析依赖。

**Q: 前端连不上后端？**
A: 检查后端是否启动、CORS 是否放行（已默认放行所有来源）、浏览器控制台报错。

**Q: 想用本地模型？**
A: 安装 Ollama，把 `.env` 改为：
```env
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=llama3.2
```
无需 API Key（随便填一个即可）。
