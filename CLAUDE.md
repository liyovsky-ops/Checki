# Checki — Kontekst projektu dla Claude

## Co to jest
Checki to narzędzie do analizy i nauki kodu z pomocą AI.
Skierowane do początkujących programistów — główny nacisk na prostotę i edukację.

## Stack technologiczny
- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Python + FastAPI
- **AI:** Claude API (Anthropic)
- **Baza danych:** do ustalenia

## Struktura
```
Checki/
├── frontend/     — Next.js, komponenty UI
├── backend/      — FastAPI, logika AI, analiza kodu
├── docs/         — decyzje, notatki
├── ZALOZENIA.md  — pełna lista funkcji
└── demo.html     — prototyp wizualny (gotowy)
```

## Funkcje (11 sztuk)
1. Tłumaczenie kodu na tekst
2. Opis konkretnej linii kodu
3. Wykrywanie martwego kodu
4. Wykrywanie błędnych i szkodliwych rozwiązań
5. Archiwum bibliotek
6. Wbudowane funkcje AI
7. Agenci-specjaliści (backend, frontend, security)
8. Text to Code
9. Tryb nauki — najprostszy możliwy kod
10. Inline tooltip — pytajnik przy każdej linii z dymkiem AI
11. Archiwum komend i funkcji
+ Historia — ostatnio analizowane pliki

## Aktualny status
- [x] Założenia zapisane
- [x] Demo wizualne (demo.html) — gotowe
- [ ] Setup frontendu (Next.js)
- [ ] Setup backendu (FastAPI)
- [ ] Podpięcie Claude API

## Kolejne kroki
1. Zbudować frontend w Next.js
2. Zbudować edytor kodu z numerami linii i tooltipami
3. Postawić backend FastAPI
4. Podpiąć Claude API do analizy

## Zasady projektu
- Kod ma być prosty i czytelny — projekt jest też narzędziem do nauki
- Każda funkcja na osobnej gałęzi git
- Commity w formacie: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`
- Właściciel: Łukasz
