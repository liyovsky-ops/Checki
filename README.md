# Checki — AI Code Learning Tool

> Upload any code. Understand it instantly. Learn from it step by step.

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20FastAPI%20%7C%20Gemini%20AI-blue)

---

## What is Checki?

Checki is a tool for people learning to program. You paste or upload code and get:

- a plain-Polish explanation of what every line does
- a step-by-step breakdown of the entire file (like a book with footnotes)
- inline tooltips on every line — one click, one explanation
- code rewritten in 5 different programming styles

Built for learners. Useful for anyone who reads unfamiliar code.

---

## Live Demo

Open `demo_v2.html` in a browser (with backend running on port 8000).

---

## Features

| Feature | Status | Description |
|---------|--------|-------------|
| **Tłumacz kodu** | ✅ Done | Line-by-line Polish translation — footnote view + magic wand merges into prose |
| **Vivisekcja kodu** | ✅ Done | Step-by-step analysis — each block gets a table of explanations + mental model |
| **Opis linii** | ✅ Done | One AI call analyzes the whole file, tooltips served locally — zero extra LLM calls |
| **Tryb programowania** | ✅ Done | Rewrites code in 5 styles: Eco / Comfort / Sport / Enterprise / Security |
| **Wbudowane funkcje** | ✅ Done | Detects Python tokens, shows hover tooltips from a 194-entry dictionary |
| **Archiwum bibliotek** | ✅ Done | 108 Python libraries, 10 categories, search + detail modal |
| **Checki.framework** | ✅ Done | 120+ frameworks in a tile library with scroll-snap and full-text search |
| Martwy kod | 🔜 Planned | Detects unreachable / unused code |
| Złe wzorce | 🔜 Planned | Flags dangerous or inefficient patterns |
| Text → Kod | 🔜 Planned | Describe in Polish, get working code |
| Agenci specjaliści | 🔜 Planned | 5 specialist agents: Architecture, Security, Performance, Clean Code, Testing |
| Akademia | 🔜 Planned | Collect Python commands like Pokémon — mark each as known 🟢, familiar 🟡, or unknown 🔴 |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend (app) | Next.js 14, Tailwind CSS, TypeScript |
| Frontend (demo) | Vanilla JS, modular HTML/CSS |
| Backend | Python 3.12, FastAPI, Uvicorn |
| AI | Google Gemini 2.5 Flash |

---

## Project Structure

```
Checki/
├── backend/
│   ├── features/
│   │   ├── translator/        # Line-by-line translation
│   │   ├── vivisekcja/        # Step-by-step analysis
│   │   ├── line_tooltip/      # Per-line explanations
│   │   ├── programming_mode/  # 5-style code rewriter
│   │   └── builtins/          # Python token dictionary (194 entries)
│   ├── shared/                # Gemini client
│   └── main.py
├── frontend/                  # Next.js app (in progress)
├── demo_v2.html               # Interactive prototype
└── demo_assets/               # Modular JS + CSS for the demo
    ├── css/                   # Split by theme
    ├── js/                    # One file per feature
    └── data/                  # Libraries, frameworks, dictionary
```

Each backend feature lives in its own folder with a `README.md` explaining endpoints and data format.

---

## Run Locally

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # add your GEMINI_API_KEY
uvicorn main:app --reload

# Demo (no build needed)
open demo_v2.html
```

---

## Why I Built This

I started learning programming and struggled to understand what code actually does just by reading it. I wanted a tool that explains code the way a patient mentor would — step by step, in plain language, with no jargon.

Checki is that tool.

---

## Author

Built by Łukasz — [@liyovsky-ops](https://github.com/liyovsky-ops)
