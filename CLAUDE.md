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
- [x] Demo wizualne (demo.html) — gotowe i podzielone na moduły
- [x] Setup frontendu (Next.js)
- [x] Setup backendu (FastAPI)
- [x] Podpięcie Gemini API

### Backend — funkcje gotowe
- [x] `translator` — tłumaczenie kodu na prosty język polski (`/translator/explain`)
- [x] `line-tooltip` — analiza całego kodu jednym callem, lookup po linii bez LLM (`/line-tooltip/analyze`, `/line-tooltip/lookup`)
- [x] `builtins` — detekcja tokenów Pythona w kodzie, słownik 194 wpisów (`/builtins/detect`)

### Demo — nadplanowe funkcje
- [x] Dymki na hover dla tokenów Pythona (.kw, .fn) — słownik wbudowany w demo
- [x] Archiwum bibliotek — 108 bibliotek, 10 kategorii, wyszukiwarka, modal ze szczegółami
- [x] Podział demo.html (1275 linii) na 8 modułowych plików w `demo_assets/`

## Kolejne kroki
1. [ ] feature/translator-demo — nowy widok tłumacza w demo_v2 (priorytet na jutro)
     UX: kliknięcie "Tłumacz kod" wysuwa panel z dołu ekranu (jak dymek/drawer)
     Widok "przypisy": kod po lewej/górze, pod każdą linią mniejsza czcionka z tłumaczeniem
       — styl jak przypisy w książce, inna czcionka dla tłumaczenia
     Ikona różdżki (🪄): usuwa kod, scala tłumaczenia w ciągły tekst od początku do końca
2. [ ] feature/agents-demo — agenci-specjaliści w demo_v2
     Każdy agent bada kod przez pryzmat swojej profesji:
       🏗️ Agent Architektury — struktura, wzorce, podział odpowiedzialności
       🛡️ Agent Security     — luki, złe praktyki, podatności
       ⚡ Agent Performance  — wąskie gardła, złożoność, optymalizacje
       ✨ Agent Clean Code   — czytelność, nazewnictwo, SOLID
       🧪 Agent Testing      — pokrycie testami, edge cases, testowalność
     Każdy agent zwraca własny raport w prawym panelu
3. [ ] feature/dead-code — wykrywanie martwego kodu
2. [ ] feature/bad-patterns — wykrywanie złych wzorców
3. [ ] feature/text-to-code — tekst → kod
4. [ ] feature/learn-mode — tryb nauki (najprostszy zapis kodu)
5. [ ] Podpięcie backendu pod demo_v2.html (docelowy UI)
4. [ ] feature/programming-mode-extended — rozszerzony tryb programowania
     Po wyborze trybu (eco/sport/etc.) obok "Przepisany" pojawia się dobór standardów:
       SOLID, Clean Architecture, Clean Code, DRY, KISS, YAGNI, TDD, DDD
     Zaznaczone standardy doklejane do promptu agenta — generuje kod trzymający się
     wybranych zasad jednocześnie z wybranym trybem (np. Sport + SOLID + Clean Code)
5. [ ] feature/line-risk-indicators — ikony ryzyka przy każdej linii kodu
     Zamiast tylko "?" każda linia dostaje zestaw ikon oznaczających ryzyko:
       🔴 Krytyczne  — np. SQL injection, eval(), hardcoded credentials
       🟠 Wysokie    — np. niebezpieczny import, brak walidacji inputu
       🟡 Średnie    — np. potencjalny wyciek danych, niezabezpieczone zasoby
       🔵 Info       — np. deprecated API, nieoptymalna praktyka
     Najechanie na ikonę → dymek od "komentatora" który tłumaczy konkretne
     zagrożenie tej linii: co może się stać, jak można to wykorzystać
     AI analizuje cały kod i zwraca mapę linii → poziom ryzyka + opis
6. [ ] feature/programming-schools — szkoły programowania jako drugi wymiar trybu
     - Clean Code (Uncle Bob) — czytelność, nazwy które mówią same za siebie
     - Unix Philosophy — jedna funkcja jedna odpowiedzialność, małe kompozycje
     - MIT / Hacker Culture — elegancja przez spryt, liczy się piękno rozwiązania
     - Puryzm — czyste funkcje, zero side effects, dane niezmienne
     Pomysł: po wyborze trybu (eco/sport/etc.) można dodatkowo wybrać szkołę
     i Gemini dostaje oba wymiary w prompcie naraz.

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
