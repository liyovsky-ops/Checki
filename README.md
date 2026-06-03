# Checki — AI Code Analysis Tool

> A developer tool that helps you understand, learn from, and improve your code using AI.

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20FastAPI%20%7C%20Claude%20AI-blue)

---

## What is Checki?

Checki is a web application that lets you paste or upload code and instantly get:
- plain-English explanations of what the code does
- inline tooltips on every line
- detection of dead code and bad practices
- AI-powered suggestions written in the simplest possible way

Built for developers who are learning — but useful for anyone who reads code.

---

## Features

| Feature | Description |
|---|---|
| Code Translator | Converts code into plain English |
| Line Tooltip | Click any line — get an AI explanation |
| Dead Code Detector | Finds code that does nothing |
| Bad Patterns | Flags harmful or inefficient solutions |
| Learn Mode | AI rewrites your code in the simplest way |
| Text to Code | Describe what you want — get code |
| Specialist Agents | Separate AI agents for backend, frontend, security |
| Library Archive | Save and search useful libraries and commands |
| History | Recently analyzed files |

---

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Python, FastAPI
- **AI:** Claude API (Anthropic)

---

## Project Status

- [x] Product design & feature planning
- [x] Visual demo (HTML prototype)
- [x] Project structure & Git workflow
- [ ] Frontend — Next.js setup
- [ ] Backend — FastAPI setup
- [ ] Claude API integration
- [ ] Feature implementation

---

## Why I Built This

I started learning programming and found it hard to understand what code actually does just by reading it. I wanted a tool that explains code the way a senior developer would — line by line, in plain language.

Checki is that tool.

---

## Run Locally

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Author

Built by Łukasz — [@liyovsky-ops](https://github.com/liyovsky-ops)
