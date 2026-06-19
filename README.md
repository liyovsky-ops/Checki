# Checki

**Interactive encyclopedia of frameworks and libraries for developers — with AI-powered code analysis.**

Checki is an enterprise-grade developer tool: browse detailed cards for 24 frameworks across 6 categories, then paste your code into the built-in editor and run AI analysis powered by Gemini 2.5 Flash. Designed as both a daily reference and a portfolio project.

> 🖥️ [demo GIF — coming soon]

---

## Features

- 📚 **24 frameworks** as an interactive knowledge library — each with its own full detail card
- 🗂️ **Up to 9 tabs per framework** — Basics, Components/ORM, Hooks, Routing, State, Rivals, Ecosystem, Commands
- 🔍 **Framework search** — instant full-text search across all entries
- 🎨 **6 categories** — Frontend, Backend, Database, DevOps, Testing, AI
- 🤖 **AI features** — code translator, vivisekcja (line-by-line dissection), dead code detection, bad pattern detection — *powered by Gemini 2.5 Flash*
- ⚡ **Vite** — instant HMR, zero framework overhead on the frontend
- 🗂️ **YAML-driven content** — each framework is defined entirely in YAML files, no hardcoding in JS

---

## Frameworks

### Frontend

| Framework | Lang | Description |
|-----------|------|-------------|
| ⚛️ React | JavaScript | UI library from Meta |
| ▲ Next.js | JavaScript | Full-stack with React and SSR |
| 💚 Vue.js | JavaScript | Progressive UI framework |
| 🔥 Svelte | JavaScript | Compiled, zero runtime |
| 🔺 Angular | TypeScript | Framework from Google |
| 🌊 Tailwind CSS | CSS | Utility-first CSS framework |

### Backend

| Framework | Lang | Description |
|-----------|------|-------------|
| 🚀 FastAPI | Python | Modern API with type hints |
| 🌐 requests | Python | HTTP for humans |
| ⚡ asyncio | Python | Asynchronous Python |
| 🍲 BeautifulSoup | Python | HTML and XML parsing |
| 🖱️ PyAutoGUI | Python | UI and GUI automation |
| 🌶️ Flask | Python | Micro web framework |
| 🎸 Django | Python | Batteries-included web framework |
| 🐼 Pandas | Python | Data analysis and manipulation |

### Database

| Framework | Lang | Description |
|-----------|------|-------------|
| 🐘 PostgreSQL | SQL | Advanced relational database |
| 🍃 MongoDB | NoSQL | Document database |
| ⚡ Redis | In-Memory | Cache and key-value store |
| 🗄️ SQLAlchemy | Python | ORM and SQL toolkit |
| ◈ Prisma | TypeScript | Type-safe ORM |
| 🔥 Firebase | NoSQL | BaaS from Google |

### DevOps

| Framework | Lang | Description |
|-----------|------|-------------|
| 🌿 Git | Shell | Distributed version control |
| 🐳 Docker | YAML | Application containerization |
| 🏗️ Terraform | HCL | Infrastructure as code |
| 🔁 CI/CD | YAML | Continuous integration and deployment |
| 🐧 WSL | Shell | Linux on Windows |
| ☸️ Kubernetes | YAML | Container orchestration |

### Testing

| Framework | Lang | Description |
|-----------|------|-------------|
| 🧪 pytest | Python | Most popular Python test runner |
| 🎭 Playwright | TypeScript | Cross-browser E2E testing |
| 🃏 Jest | JavaScript | Most popular JS test runner |
| ⚡ Vitest | TypeScript | Vite-native test runner |
| 🌲 Cypress | JavaScript | E2E testing for the web |
| 🔬 Selenium | Python | Classic UI automation |

### AI

| Framework | Lang | Description |
|-----------|------|-------------|
| 🕸️ LangGraph | Python | Agents as state graphs |
| 🔌 MCP | Python | Model Context Protocol |
| ✦ OpenAI SDK | Python | Most popular LLM API |
| ✺ Anthropic SDK | Python | SDK for Claude models |
| 🦙 LlamaIndex | Python | RAG framework for your data |
| 🤖 Pydantic AI | Python | Type-safe, model-agnostic agents |
| 🤗 Hugging Face | Python | Hub for models and transformers |
| 🔥 PyTorch | Python | ML/research from Meta |
| 🧠 TensorFlow | Python | Large-scale ML from Google |

---

## Architecture

```
Checki/
├── Frontend (Vite + vanilla JS)
│   ├── src/main.js               — entry point, dependency injection
│   ├── src/modules/              — UI logic (framework grid, tabs, editor, AI features)
│   ├── src/data/frameworks.js    — ALL_FRAMEWORKS list + FRAMEWORKS tile grid
│   ├── src/data/fw_{name}.js     — per-framework importer (bridges YAML → JS object)
│   └── src/content/{fw}/        — YAML files per framework (9 files each)
│       ├── meta.yaml             — metadata + tab definitions
│       ├── podstawy.yaml         — Basics tab
│       ├── cli.yaml              — Commands tab
│       ├── rivals.yaml           — Rivals tab
│       └── {custom}.yaml         — remaining tabs
│
└── Backend (FastAPI)
    ├── main.py                   — FastAPI app, CORS, router registration
    ├── shared/gemini_client.py   — single Gemini client: ask_gemini(prompt)
    └── features/
        ├── translator/           — POST /translator/explain
        ├── vivisekcja/           — POST /vivisekcja/analyze
        ├── dead_code/            — POST /dead-code/detect
        ├── bad_patterns/         — POST /bad-patterns/detect
        ├── line_tooltip/         — per-line code explanations
        └── programming_mode/     — AI code style analysis
```

**Data flow:** `FRAMEWORKS tile click → fw-detail.js → FW_DATA_MAP[key] → fw_{name}.js imports → YAML files → rendered tabs`

---

## Getting Started

```bash
# Frontend
npm install
npm run dev      # http://localhost:5173
```

```bash
# Backend (optional — required for AI features)
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add GEMINI_API_KEY
uvicorn main:app --reload --port 8000
# Swagger docs: http://localhost:8000/docs
```

---

## Adding a New Framework

Each framework is defined by 9 YAML files in `src/content/{fw}/` and one importer JS file in `src/data/fw_{name}.js`. Register the importer in `FW_DATA_MAP` (in `src/modules/fw-detail.js`) and add a tile entry to `src/data/frameworks.js`. No changes to any renderer code required.

For the full step-by-step protocol (including YAML schema, key naming rules, and common pitfalls), see [AGENT_README.md](./AGENT_README.md).

---

## Stack

| Technology | Role |
|-----------|------|
| Vite | Frontend bundler, HMR, YAML plugin |
| Vanilla JS (ESM) | Frontend logic — no framework overhead |
| `@modyfi/vite-plugin-yaml` | YAML files imported as ES modules |
| FastAPI | Backend API, endpoint routing |
| Google Gemini 2.5 Flash | AI model for all analysis features |
| `google-genai` | Python SDK for Gemini |
| YAML | Framework content — all data lives here |

---

## Project Status

```
✅ 24 frameworks complete (React, FastAPI, pytest, Flask, Django, PostgreSQL,
   Redis, Docker, Git, Kubernetes, Terraform, CI/CD, WSL, LangGraph, MCP,
   SQLAlchemy, OpenAI SDK, Anthropic SDK, LlamaIndex, Pydantic AI,
   requests, BeautifulSoup, asyncio, PyAutoGUI)
✅ AI features: translator, vivisekcja, dead code, bad patterns
🚧 Code assistance system — in progress
📅 Portfolio-ready target: September 2026
```

---

## Author

Built by Łukasz — [@liyovsky-ops](https://github.com/liyovsky-ops)
