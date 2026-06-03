# Decyzje architektoniczne — Checki

## 2026-06-03 — Stack technologiczny

### Frontend: Next.js + Tailwind CSS
**Dlaczego:** Next.js daje routing od razu, API routes w jednym projekcie i SSR bez konfiguracji.
Tailwind eliminuje skakanie między plikami CSS.
**Alternatywy odrzucone:** Vue (mniejsza społeczność), Vanilla HTML (chaos przy 11 funkcjach).

### Backend: Python + FastAPI
**Dlaczego:** FastAPI jest szybki, prosty i ma automatyczną dokumentację API.
Python to naturalny wybór do pracy z Claude API (oficjalny SDK).
**Alternatywy odrzucone:** Node.js/Express (chcemy trzymać AI logic w Pythonie).

### AI: Claude API (Anthropic)
**Dlaczego:** Najlepsze rozumienie kodu, wyjaśnienia w języku naturalnym.
Projekt sam w sobie jest narzędziem edukacyjnym — jakość odpowiedzi ma kluczowe znaczenie.

### Struktura: Feature-based
**Dlaczego:** Każda funkcja w osobnym folderze (`features/X`) — praca nad X nie dotyka Y.
Eliminuje chaos który był problemem w poprzednich projektach Łukasza.
