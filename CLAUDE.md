# Checki — Kontekst projektu dla Claude

## Co to jest
Checki to narzędzie do analizy i nauki kodu z pomocą AI.
Skierowane do początkujących programistów — główny nacisk na prostotę i edukację.

## Stack technologiczny
- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Python + FastAPI
- **AI:** Gemini API (Google, model: gemini-2.5-flash)
- **Baza danych:** do ustalenia

## Struktura
```
Checki/
├── frontend/
│   ├── app/                  — routing Next.js, layout
│   ├── shared/               — wspólne komponenty (Button, Layout itp.)
│   └── features/
│       ├── translator/       — tłumaczenie kodu na tekst
│       ├── dead-code/        — wykrywanie martwego kodu
│       ├── line-tooltip/     — pytajnik przy każdej linii
│       ├── bad-patterns/     — błędne i szkodliwe rozwiązania
│       ├── text-to-code/     — tekst → kod
│       ├── learn-mode/       — tryb nauki
│       ├── agents/           — agenci-specjaliści
│       ├── archive/          — archiwum bibliotek i komend
│       └── history/          — historia analizowanych plików
├── backend/
│   ├── shared/               — wspólna logika, połączenie z AI
│   └── features/             — lustrzana struktura do frontend
│       └── (te same foldery co w frontend/features)
├── docs/
├── ZALOZENIA.md
└── demo.html
```

## Zasada pracy z funkcjami
Każda funkcja = osobny folder w `features/`.
Gdy pracujesz nad funkcją X — ruszasz się tylko w:
- `frontend/features/X/`
- `backend/features/X/`

Nie dotykasz innych folderów.

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
- [x] Setup frontendu (Next.js)
- [x] Setup backendu (FastAPI)
- [x] Podpięcie Gemini API

## Kolejne kroki
1. [ ] feature/translator — tłumaczenie kodu na tekst (pierwsza funkcja end-to-end)
2. [ ] Edytor kodu z numerami linii i tooltipami
3. [ ] Pozostałe 10 funkcji

## Zasady projektu
- Kod ma być prosty i czytelny — projekt jest też narzędziem do nauki
- Każda funkcja na osobnej gałęzi git
- Commity w formacie: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`
- Właściciel: Łukasz

## Git — standardy profesjonalne (ważne: projekt rekrutacyjny)
Ten projekt jest częścią portfolio Łukasza. Git musi wyglądać profesjonalnie.

**Zasady których pilnujesz:**
- Commit opisuje CO i DLACZEGO, nie "poprawki" ani "update"
- Jeden commit = jedna logiczna zmiana, nie paczka wszystkiego naraz
- Prefixy: `feat:` nowa funkcja, `fix:` naprawa błędu, `refactor:` zmiana bez wpływu na działanie, `docs:` dokumentacja, `chore:` maintenance, `style:` formatowanie, `test:` testy
- Nie używaj `chore:` do rzeczy które mają wartość — to sygnał dla rekrutera że coś powstało
- Nazwy plików, funkcji i endpointów muszą być spójne — brak plików `claude_client.py` gdy projekt używa Gemini
- Przed każdym commitem sprawdź czy diff ma sens — nie commituj śmieci, debugów, zakomentowanego kodu
- Gałąź `main` zawsze czysta i działająca
