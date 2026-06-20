# AGENT_README — Briefing dla subagenta (Checki)

Ten plik to kompletny briefing dla każdego subagenta spawowanego do pracy w projekcie Checki.
Przeczytaj go w całości zanim cokolwiek zrobisz. Pełny protokół projektu: `CLAUDE.md`.

---

## 1. Projekt w 3 zdaniach

Checki to narzędzie enterprise dla developerów — interaktywna encyklopedia frameworków i bibliotek z AI-wspomaganymi feature'ami (tłumaczenie kodu, analiza, wykrywanie błędów).
Użytkownik może przeglądać szczegółowe karty frameworków (taby: podstawy, komendy, rywale, ekosystem…), wklejać kod do edytora i uruchamiać analizy Gemini 2.5 Flash.
Projekt buduje Łukasz (styl komunikacji: krótko, konkretnie) jako portfolio i narzędzie własne; celem jest 24 gotowe frameworki na `dev`, potem kolejne iteracje.

---

## 2. Stack (konkretnie)

| Warstwa | Technologia |
|---------|------------|
| Frontend | Vite 8 + vanilla JS (zero frameworka), entry: `src/main.js` |
| YAML plugin | `@modyfi/vite-plugin-yaml` — importy `.yaml` działają jak moduły JS |
| Backend | FastAPI 0.136 + Gemini 2.5 Flash (`google-genai 2.7`) |
| Backend port | `8000` |
| Frontend dev port | `5173` (Vite HMR) |
| Build output | `dist/` |
| Python venv | `backend/venv/` |

### Komendy uruchomienia

```bash
# Frontend dev
npm run dev

# Frontend build
npm run build

# Backend dev (z katalogu /home/liyo/Checki/backend)
source venv/bin/activate && uvicorn main:app --reload --port 8000

# Frontend preview buildu
npm run preview
```

### Zmienne środowiskowe backendu

Plik: `/home/liyo/Checki/backend/.env`
Wymagana: `GEMINI_API_KEY=...`

---

## 3. Struktura katalogów

```
/home/liyo/Checki/
├── src/
│   ├── main.js                  ← entry point: importy, dependency injection, window bindings
│   ├── content/
│   │   └── {fw}/                ← jeden katalog per framework (np. react/, fastapi/, git/)
│   │       ├── meta.yaml        ← metadane + definicja tabów
│   │       ├── podstawy.yaml    ← tab "Podstawy" (intro, concepts, firstComponent)
│   │       ├── cli.yaml         ← tab "Komendy" (groups z commands)
│   │       ├── rivals.yaml      ← tab "Rywale" (items z pros/cons/vs)
│   │       ├── {custom}.yaml    ← pozostałe taby (nazwy dowolne, ale mapowane w importer JS)
│   │       └── ...              ← łącznie 9 plików YAML per framework
│   ├── data/
│   │   ├── frameworks.js        ← ALL_FRAMEWORKS (flat list wyszukiwarki) + FRAMEWORKS (tiles grid)
│   │   ├── fw_{name}.js         ← importer JS per framework (łączy YAMLe → obiekt danych)
│   │   ├── biblioteki.js        ← dodatkowe dane bibliotek
│   │   └── slownik.js           ← słownik terminów
│   └── modules/
│       ├── fw-detail.js         ← FW_DATA_MAP, openFramework(), switchDetailTab() — KLUCZOWY
│       ├── fw-detail-renderers.js ← funkcje renderujące HTML dla każdego typu taba
│       ├── fw-detail-modal.js   ← modal z komendami (klik na komendę → overlay)
│       ├── editor.js            ← edytor kodu
│       ├── translator.js        ← AI tłumaczenie kodu
│       ├── vivisekcja.js        ← AI analiza kodu linia po linii
│       ├── dead-code.js         ← AI detekcja martwego kodu
│       ├── bad-patterns.js      ← AI detekcja złych wzorców
│       ├── historia.js          ← historia analiz
│       ├── archiwum.js          ← archiwum zapisanych analiz
│       ├── framework.js         ← grid frameworków + wyszukiwarka
│       ├── programming-mode.js  ← tryby programowania
│       ├── tabs.js              ← główne taby aplikacji
│       ├── prefetch.js          ← prefetching danych
│       ├── state.js             ← globalny stan
│       └── tooltips.js          ← tooltips
├── backend/
│   ├── main.py                  ← FastAPI app, CORS, include_router dla każdej feature
│   ├── requirements.txt
│   ├── shared/
│   │   └── gemini_client.py     ← JEDEN klient Gemini dla wszystkich feature: ask_gemini(prompt)
│   └── features/
│       ├── translator/          ← POST /translator/explain, /translator/explain-lines
│       ├── line_tooltip/        ← tooltip z wyjaśnieniem linii kodu
│       ├── builtins/            ← słownik Python builtins (bez Gemini, statyczne dane)
│       ├── programming_mode/    ← AI analiza trybu programowania
│       ├── vivisekcja/          ← AI analiza kod linia po linii
│       ├── dead_code/           ← AI wykrywanie martwego kodu
│       └── bad_patterns/        ← AI wykrywanie złych wzorców
├── public/                      ← statyczne assety (index.html, CSS, obrazki)
├── dist/                        ← build output (nie edytuj ręcznie)
├── vite.config.js
├── package.json
├── CLAUDE.md                    ← zasady projektu, Guardian protokół
└── AGENT_README.md              ← ten plik
```

---

## 4. Architektura YAML — złoty standard (KRYTYCZNE)

Każdy framework = **9 plików YAML** w `src/content/{fw}/` + **1 plik importer JS** w `src/data/fw_{name}.js`.

### 4.1 meta.yaml — metadane i definicja tabów

```yaml
id: react
name: React
icon: "⚛️"
color: "#61dafb"
color2: "#7c5af7"          # drugi kolor gradientu (opcjonalny)
tagline: Biblioteka UI do budowania interfejsów użytkownika
year: 2013
author: Meta (Facebook)
lang: JavaScript / TypeScript
github: facebook/react
stars: "220k+"
codeLang: JSX
tabs:
  - id: podstawy
    label: Podstawy
  - id: komponenty
    label: Komponenty
  - id: hooki
    label: Hooki
  - id: routing
    label: Routing
  - id: state
    label: State
  - id: rywale
    label: Rywale
  - id: pluginy
    label: Ekosystem
  - id: komendy
    label: Komendy
```

**Uwaga:** pole `id` w meta.yaml jest informacyjne — NIE jest używane jako klucz w FW_DATA_MAP. Patrz sekcja 6.

### 4.2 podstawy.yaml — tab "Podstawy"

```yaml
labels:
  concepts: Kluczowe koncepcje
  whenToUse: Kiedy używać?
  firstComponent: Twój pierwszy przykład
  firstComponentLang: Python

intro:
  title: Czym jest X?
  desc: >
    Opis frameworka w kilku zdaniach.

concepts:
  - title: Nazwa konceptu
    desc: >
      Opis konceptu.
    icon: "🧠"

whenToUse:
  - Gdy chcesz budować SPA
  - Gdy potrzebujesz bogatego ekosystemu

firstComponent: |
  # Przykład kodu
  def hello():
      return "Hello"
```

### 4.3 cli.yaml — tab "Komendy"

```yaml
title: Komendy React / Vite

groups:
  - name: Tworzenie projektu
    icon: "🚀"
    commands:
      - cmd: npm create vite@latest my-app -- --template react
        desc: Nowy projekt React + Vite
        detail:
          what: Co robi ta komenda.
          how: Jak działa pod spodem.
          tips:
            - 'Tip 1 — zawsze w cudzysłowach jeśli zawiera dwukropek'
            - 'Tip 2'
```

**Ważne:** `detail.tips` to lista stringów. Stringi z `: ` (dwukropek-spacja) MUSZĄ być w cudzysłowach.

### 4.4 rivals.yaml — tab "Rywale"

```yaml
title: React vs inne frameworki

items:
  - name: Vue.js
    icon: "💚"
    color: "#42b883"
    tagline: Progresywny framework UI
    pros:
      - Łagodniejsza krzywa uczenia
      - Single File Components
    cons:
      - Mniejszy ekosystem niż React
      - Mniej ofert pracy
    vs: "Vue prostszy na start, React wygrywa skalą ekosystemu. Wybierz React jeśli szukasz zatrudnienia."
```

### 4.5 Pozostałe taby (komponenty, hooki, routing, state, pluginy)

Dwa formaty — **generic** (lista items z `name`, `desc`, `icon`, `code`) i **specyficzny** (własna struktura jak React hooks/components).

Format **generic** (najczęściej używany dla nie-frontendowych frameworków):

```yaml
title: Tytuł sekcji

items:
  - name: Nazwa elementu
    desc: Opis co to robi.
    icon: "🔧"
    code: |
      # Przykład kodu
      przykład.tutaj()
```

Format **specyficzny** (React): komponenty mają `props`, hooki mają `signature`, `when`, `example`. Patrz `src/content/react/` dla wzorca.

Renderer wykrywa format automatycznie przez `isGeneric()` w `fw-detail.js` — sprawdza czy `val.items` jest tablicą.

---

## 5. Jak dodać nowy framework (krok po kroku)

Załóżmy że dodajemy `Celery`.

### Krok 1: Stwórz katalog content

```bash
mkdir /home/liyo/Checki/src/content/celery
```

### Krok 2: Stwórz 9 plików YAML

```
src/content/celery/
  meta.yaml
  podstawy.yaml
  cli.yaml
  rivals.yaml
  tasks.yaml       ← nazwa dowolna (tab "Tasks")
  workflow.yaml    ← nazwa dowolna (tab "Workflows")
  konfiguracja.yaml
  monitoring.yaml
  zaawansowane.yaml
```

Zdefiniuj taby w `meta.yaml`. Nazwy plików YAML są dowolne — liczy się tylko to jak je zaimportujesz w JS.

### Krok 3: Stwórz importer JS

Utwórz `/home/liyo/Checki/src/data/fw_celery.js`:

```javascript
import meta         from '../content/celery/meta.yaml';
import podstawy     from '../content/celery/podstawy.yaml';
import tasks        from '../content/celery/tasks.yaml';
import workflow     from '../content/celery/workflow.yaml';
import konfiguracja from '../content/celery/konfiguracja.yaml';
import monitoring   from '../content/celery/monitoring.yaml';
import zaawansowane from '../content/celery/zaawansowane.yaml';
import rivals       from '../content/celery/rivals.yaml';
import cli          from '../content/celery/cli.yaml';

export const FW_CELERY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  tasks,      // mapuj na klucz używany przez renderer
    hooki:       workflow,
    routing:     konfiguracja,
    state:       monitoring,
    rywale:      rivals,
    pluginy:     zaawansowane,
    komendy:     cli,
  }
};
```

**Klucze w `content`** muszą odpowiadać `tab.id` z meta.yaml oraz case'owi w `renderTabContent()` w `fw-detail.js`.
Dostępne klucze rendererów: `podstawy`, `komponenty`, `hooki`, `routing`, `state`, `rywale`, `pluginy`, `komendy`.

### Krok 4: Zarejestruj w FW_DATA_MAP

Edytuj `/home/liyo/Checki/src/modules/fw-detail.js`:

```javascript
import { FW_CELERY_DATA } from '../data/fw_celery.js';

// W FW_DATA_MAP dodaj:
const FW_DATA_MAP = {
  // ... istniejące ...
  celery: FW_CELERY_DATA,   // ← klucz = name.toLowerCase().replace(/[^a-z0-9]/g, '')
};
```

### Krok 5: Dodaj tile do frameworks.js

Edytuj `/home/liyo/Checki/src/data/frameworks.js` — dodaj w odpowiedniej sekcji `FRAMEWORKS`:

```javascript
// W sekcji backend:
{ id: 'celery', name: 'Celery', icon: '🥬', color: '#a9cc54', lang: 'Python', desc: 'Task queue dla Pythona' },
```

I opcjonalnie do `ALL_FRAMEWORKS` (flat lista wyszukiwarki):

```javascript
{ name:'Celery', icon:'🥬', color:'#a9cc54', lang:'Python', cat:'Backend', desc:'Task queue dla Pythona' },
```

### Krok 6: Build i test

```bash
cd /home/liyo/Checki
npm run build  # sprawdź brak błędów kompilacji YAML
npm run dev    # otwórz w przeglądarce, kliknij tile frameworka
```

---

## 6. FW_DATA_MAP — jak działa rejestracja (KRYTYCZNE)

Klucz w `FW_DATA_MAP` jest obliczany **w runtime** w `openFramework()`:

```javascript
// fw-detail.js, linia 47
const fwId = fw.name.toLowerCase().replace(/[^a-z0-9]/g, '');
```

gdzie `fw.name` pochodzi z obiektu w `FRAMEWORKS` w `frameworks.js` (pole `name`), **NIE** z `meta.yaml`.

### Przykłady obliczania klucza

| `name` w frameworks.js | Klucz w FW_DATA_MAP |
|------------------------|---------------------|
| `'React'` | `'react'` |
| `'BeautifulSoup'` | `'beautifulsoup'` |
| `'CI/CD'` | `'cicd'` |
| `'OpenAI SDK'` | `'openaisdk'` |
| `'Anthropic SDK'` | `'anthropicsdk'` |
| `'LangGraph'` | `'langgraph'` |
| `'Pydantic AI'` | `'pydanticai'` |

### Typowy błąd

Jeśli `meta.yaml` ma `id: openai_sdk` ale `name` w `frameworks.js` to `'OpenAI SDK'`, to klucz w mapie musi być `openaisdk`, **nie** `openai_sdk`. Patrz aktualny stan — `fw-detail.js` linia 39: `openaisdk: FW_OPENAI_DATA`.

---

## 7. Backend — jak dodać nowy endpoint / feature

Wzorzec każdej feature: `backend/features/{nazwa}/` z 3 plikami:

### router.py

```python
from fastapi import APIRouter
from pydantic import BaseModel
from .service import moja_funkcja

router = APIRouter(prefix="/moja-feature", tags=["moja-feature"])

class CodeRequest(BaseModel):
    code: str

@router.post("/analyze")
def analyze(body: CodeRequest):
    result = moja_funkcja(body.code)
    return {"response": result}
```

### service.py

```python
from shared.gemini_client import ask_gemini

def moja_funkcja(code: str) -> str:
    prompt = f"""Analizuj poniższy kod:

{code}

Zwróć analizę w formacie JSON."""
    return ask_gemini(prompt)
```

### __init__.py

```python
# Pusty plik
```

### Rejestracja w main.py

```python
# backend/main.py
from features.moja_feature.router import router as moja_feature_router

app.include_router(moja_feature_router)
```

### Dostępne funkcje Gemini (`shared/gemini_client.py`)

```python
from shared.gemini_client import ask_gemini, ask_gemini_async

# Synchroniczny
wynik = ask_gemini(prompt: str) -> str

# Asynchroniczny (w async endpoint)
wynik = await ask_gemini_async(prompt: str) -> str
```

Model: `gemini-2.5-flash`. Klucz API z `.env`: `GEMINI_API_KEY`.

---

## 8. Gotowe frameworki (stan aktualny — dev branch)

24 frameworki z pełnymi danymi YAML + importer JS zarejestrowany w FW_DATA_MAP:

| Klucz w FW_DATA_MAP | Nazwa wyświetlana | Kategoria |
|---------------------|-------------------|-----------|
| `react` | React | Frontend |
| `fastapi` | FastAPI | Backend |
| `pytest` | pytest | Testing |
| `requests` | requests | Backend |
| `beautifulsoup` | BeautifulSoup | Backend |
| `asyncio` | asyncio | Backend |
| `git` | Git | DevOps |
| `docker` | Docker | DevOps |
| `pyautogui` | PyAutoGUI | Backend |
| `mcp` | MCP | AI |
| `aws` | AWS | Cloud |
| `postgresql` | PostgreSQL | Database |
| `redis` | Redis | Database |
| `terraform` | Terraform | DevOps |
| `cicd` | CI/CD | DevOps |
| `wsl` | WSL | DevOps |
| `langgraph` | LangGraph | AI |
| `kubernetes` | Kubernetes | DevOps |
| `flask` | Flask | Backend |
| `openaisdk` | OpenAI SDK | AI |
| `anthropicsdk` | Anthropic SDK | AI |
| `sqlalchemy` | SQLAlchemy | Database |
| `llamaindex` | LlamaIndex | AI |
| `pydanticai` | Pydantic AI | AI |

Katalogi content: `src/content/` — po jednym na każdy framework powyżej.

---

## 9. Guardian protokół (skrót)

Repo Checki jest pod nadzorem systemu Guardians (`strategy.json` + CLI `guardian`).

```bash
# Na początku każdej sesji
guardian status

# Przed KAŻDYM commitem
guardian next          # daje wymagania dla następnego slotu

# Po KAŻDYM commicie
guardian answer <hash> <Qid> "<odpowiedź>"
```

**Twarde reguły (nigdy nie łam):**
- Format commitów: `typ(scope): opis` — typy: feat, fix, refactor, test, docs, chore, ci
- Dwa `feat` pod rząd bez `fix`/`refactor`/`test`/`docs` → zakazane
- Jeden dzień = max 2 commity
- `dev` branch = aktywny development; `main` = tylko stabilny kod

Pełny protokół: `CLAUDE.md`.

---

## 10. Częste pułapki YAML

### Dwukropek-spacja w stringu

```yaml
# ZLE — YAML parser potraktuje to jako klucz: wartość
tips:
  - Vite HMR: działa natychmiast bez przeładowania

# DOBRZE — string w cudzysłowach
tips:
  - 'Vite HMR: działa natychmiast bez przeładowania'
  - "Vite HMR: działa natychmiast"
```

### Apostrofy w single-quoted strings

```yaml
# ZLE — \' jest błędem w YAML single-quoted string
tips:
  - 'Użyj funkcji don\'t bez argumentów'

# DOBRZE — użyj double-quoted string
tips:
  - "Użyj funkcji don't bez argumentów"

# DOBRZE — podwójny apostrof w single-quoted
tips:
  - 'Użyj funkcji don''t bez argumentów'
```

### Klucz w FW_DATA_MAP nie zgadza się z name w frameworks.js

```javascript
// frameworks.js
{ name: 'OpenAI SDK', ... }

// fw-detail.js — obliczony klucz:
// 'OpenAI SDK'.toLowerCase().replace(/[^a-z0-9]/g, '') === 'openaisdk'

// FW_DATA_MAP — MUSI być:
openaisdk: FW_OPENAI_DATA,   // NIE 'openai_sdk', NIE 'openai-sdk'
```

### Nazwy plików content vs klucze w importer JS

Nazwy plików YAML w `src/content/{fw}/` są dowolne — `tasks.yaml`, `workflow.yaml` itp.
Ale w importer JS mapujesz je na stałe klucze rendererów (`komponenty`, `hooki`, `routing`, `state`, `rywale`, `pluginy`, `komendy`).
Sprawdź `renderTabContent()` w `fw-detail.js` dla kompletnej listy case'ów.

### YAML build error blokuje cały frontend

Jeśli dowolny plik `.yaml` ma błąd parsowania, `npm run build` / `npm run dev` wyrzuci błąd kompilacji.
Zawsze sprawdzaj output Vite po edycji YAML.

---

## 11. Jak uruchomić i testować

### Development (normalny workflow)

```bash
# Terminal 1 — frontend
cd /home/liyo/Checki
npm run dev
# → http://localhost:5173

# Terminal 2 — backend
cd /home/liyo/Checki/backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
# → http://localhost:8000
# → docs: http://localhost:8000/docs
```

### Po dodaniu/edycji frameworku (YAML)

1. Vite HMR odświeży automatycznie w dev mode
2. Kliknij tile frameworka w UI
3. Sprawdź każdy tab — czy dane się ładują
4. Sprawdź konsolę przeglądarki — brak błędów JS
5. Sprawdź terminal Vite — brak błędów YAML parsowania

### Build produkcyjny

```bash
npm run build    # → dist/
npm run preview  # → http://localhost:4173
```

### Sprawdzenie backendu

```bash
# Health check
curl http://localhost:8000/

# Test endpointu
curl -X POST http://localhost:8000/translator/explain \
  -H "Content-Type: application/json" \
  -d '{"code": "def hello(): return 1"}'

# Swagger UI
open http://localhost:8000/docs
```

### Weryfikacja po dodaniu nowego frameworku

```bash
# Sprawdź czy importer się kompiluje
npm run build 2>&1 | grep -i error

# Sprawdź czy klucz w FW_DATA_MAP jest poprawny
node -e "
const name = 'Nowy Framework';
console.log(name.toLowerCase().replace(/[^a-z0-9]/g, ''));
"
```
