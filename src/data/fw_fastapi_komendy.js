// Command reference
export default [
      {
        category: 'Instalacja i setup',
        icon: '🚀',
        items: [
          { cmd: 'pip install fastapi uvicorn[standard]', desc: 'FastAPI + serwer ASGI (zalecane)',
            detail: { what: 'Instaluje FastAPI i Uvicorn — serwer ASGI który uruchamia aplikację. [standard] dodaje WebSockets, HTTP/2 i szybszy parser (uvloop, httptools).', how: 'FastAPI to framework, Uvicorn to serwer. Razem jak Flask + Gunicorn. ASGI = Asynchronous Server Gateway Interface — nowoczesny standard dla async Python.', tips: ['uvicorn[standard] = +uvloop (szybszy event loop), +httptools (szybszy parser)', 'Alternatywa: hypercorn (obsługuje HTTP/2, HTTP/3)', 'Produkcja: gunicorn z workerami uvicorn'] }
          },
          { cmd: 'pip install "fastapi[all]"', desc: 'FastAPI ze wszystkimi opcjonalnymi zależnościami',
            detail: { what: 'Instaluje FastAPI z wszystkimi dodatkami: email-validator, python-multipart (upload plików), jinja2 (templates), pydantic-settings.', how: '[all] to zbiorcza zależność — instaluje paczki które mogą być potrzebne w różnych przypadkach użycia.', tips: ['Wygodne na dev, na produkcji instaluj tylko to czego używasz', 'python-multipart jest wymagane do File Upload', 'email-validator do walidacji emaili w Pydantic'] }
          },
          { cmd: 'pip install httpx pytest pytest-asyncio', desc: 'Klient HTTP + testowanie async',
            detail: { what: 'httpx = nowoczesny HTTP client (async + sync). pytest = test runner. pytest-asyncio = testy dla async funkcji FastAPI.', how: 'FastAPI TestClient oparty jest na httpx. pytest-asyncio pozwala pisać testy jako async def z @pytest.mark.asyncio.', tips: ['httpx zastępuje requests dla async kodu', 'TestClient = synchroniczny wrapper do testowania FastAPI', 'pytest-asyncio: dodaj asyncio_mode = "auto" do pytest.ini'] }
          },
          { cmd: 'pip install sqlalchemy alembic', desc: 'ORM + migracje bazy danych',
            detail: { what: 'SQLAlchemy = ORM (Object Relational Mapper) — praca z bazą przez klasy Python. Alembic = migracje schematu bazy — wersjonowanie zmian w strukturze tabel.', how: 'SQLAlchemy 2.0 wspiera async. Alembic śledzi zmiany modeli i generuje skrypty SQL migracji.', tips: ['alembic init alembic — inicjalizuj', 'alembic revision --autogenerate -m "add users" — generuj migrację', 'alembic upgrade head — zastosuj migracje'] }
          },
          { cmd: 'pip install pydantic-settings', desc: 'Konfiguracja przez zmienne środowiskowe',
            detail: { what: 'pydantic-settings to Pydantic dla konfiguracji aplikacji. Czyta z pliku .env i zmiennych środowiskowych z walidacją typów.', how: 'Klasa Settings dziedziczy po BaseSettings. Pola są automatycznie wypełniane z .env lub os.environ.', tips: ['DATABASE_URL, SECRET_KEY, API_KEY — nigdy hardcode w kodzie!', 'model_config = SettingsConfigDict(env_file=".env")', 'Użyj w Depends(): def get_settings(): return Settings()'] }
          },
        ]
      },
      {
        category: 'Uruchamianie serwera',
        icon: '⚡',
        items: [
          { cmd: 'uvicorn main:app --reload', desc: 'Dev serwer z auto-reload przy zmianach',
            detail: { what: 'Uruchamia FastAPI w trybie deweloperskim. --reload = restart serwera przy każdej zmianie pliku. main = nazwa pliku (main.py), app = zmienna FastAPI.', how: 'uvicorn nasłuchuje na zmianach w systemie plików (watchfiles). Zmienisz kod → serwer restartuje automatycznie.', flags: [{flag: '--reload', desc: 'Auto-restart przy zmianach (dev only)'}, {flag: '--port 8080', desc: 'Zmień port (domyślnie 8000)'}, {flag: '--host 0.0.0.0', desc: 'Dostępny z sieci LAN'}, {flag: '--workers 4', desc: 'Ilość procesów (tylko bez --reload)'}], tips: ['http://localhost:8000/docs — Swagger UI', 'http://localhost:8000/redoc — ReDoc', 'Ctrl+C żeby zatrzymać'] }
          },
          { cmd: 'uvicorn main:app --host 0.0.0.0 --port 8080', desc: 'Serwer dostępny w sieci na porcie 8080',
            detail: { what: 'Uruchamia serwer na wszystkich interfejsach sieciowych — dostępny z innych urządzeń i kontenerów Docker.', how: '0.0.0.0 = nasłuchuj na wszystkich interfejsach (localhost + LAN + Docker bridge). Potrzebne w kontenerach Docker (domyślnie 127.0.0.1 nie jest dostępne z zewnątrz).', tips: ['W Docker MUSISZ użyć --host 0.0.0.0', 'Nie używaj w produkcji bez firewall / reverse proxy (nginx)', 'PORT jako env var: uvicorn main:app --port ${PORT:-8000}'] }
          },
          { cmd: 'gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker', desc: 'Produkcyjny serwer z wieloma workerami',
            detail: { what: 'Gunicorn jako process manager + Uvicorn jako ASGI worker. 4 workery = 4 procesy obsługujące requesty równolegle. Standard produkcyjny.', how: 'Gunicorn zarządza procesami, Uvicorn obsługuje ASGI. -w 4 = 4 workery. Reguła: 2 × CPU + 1.', flags: [{flag: '-w 4', desc: '4 workery (2×CPU+1)'}, {flag: '-b 0.0.0.0:8000', desc: 'Bind adres'}, {flag: '--timeout 120', desc: 'Timeout requesta w sekundach'}, {flag: '--access-logfile -', desc: 'Logi do stdout'}], tips: ['Nie używaj --reload z gunicorn', 'W Docker: CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker"]'] }
          },
          { cmd: 'python -m uvicorn main:app --reload', desc: 'Alternatywny sposób uruchamiania',
            detail: { what: 'Identyczne z uvicorn main:app --reload ale uruchamiane przez moduł Python. Przydatne gdy uvicorn nie jest w PATH.', how: '-m uvicorn = uruchom pakiet uvicorn jako skrypt. Gwarantuje użycie uvicorn z aktywnego venv.', tips: ['Używaj gdy: command not found po pip install uvicorn', 'Upewnij się że venv jest aktywowany: source venv/bin/activate'] }
          },
        ]
      },
      {
        category: 'Testowanie',
        icon: '🧪',
        items: [
          { cmd: 'pytest', desc: 'Uruchom wszystkie testy',
            detail: { what: 'Uruchamia wszystkie pliki test_*.py i *_test.py. FastAPI TestClient symuluje requesty bez uruchamiania prawdziwego serwera.', how: 'pytest automatycznie wykrywa pliki testów. Dla FastAPI używasz from fastapi.testclient import TestClient.', tips: ['pytest -v = verbose, widać każdy test', 'pytest tests/test_users.py = tylko jeden plik', 'pytest -k "test_scrape" = testy zawierające "test_scrape" w nazwie'] }
          },
          { cmd: 'pytest -v --asyncio-mode=auto', desc: 'Testy async z auto-wykryciem',
            detail: { what: 'Uruchamia testy async z pytest-asyncio w trybie auto — nie musisz dekorować każdego async testu @pytest.mark.asyncio.', how: 'asyncio-mode=auto = wszystkie async def test_ automatycznie traktowane jako async testy.', tips: ['Dodaj do pytest.ini: [pytest] asyncio_mode = auto', 'Używaj httpx.AsyncClient zamiast TestClient dla async testów', 'AsyncClient wymaga app jako argument: AsyncClient(app=app, base_url="http://test")'] }
          },
          { cmd: 'pytest --cov=app --cov-report=html', desc: 'Testy z raportem pokrycia kodu',
            detail: { what: 'Uruchamia testy i generuje raport HTML coverage — widzisz które linie kodu są objęte testami.', how: 'Wymaga: pip install pytest-cov. Raport ląduje w htmlcov/index.html.', tips: ['Otwórz htmlcov/index.html w przeglądarce', 'Czerwone linie = nieobjęte testami', 'Cel: 80%+ dla kluczowych endpointów'] }
          },
          { cmd: 'pip install pytest-asyncio httpx', desc: 'Zainstaluj narzędzia do testów async',
            detail: { what: 'pytest-asyncio = obsługa async testów w pytest. httpx = klient HTTP używany przez FastAPI TestClient.', how: 'FastAPI TestClient używa httpx pod spodem. httpx jest wymagane do testowania async endpointów.', tips: ['TestClient = sync testy (prostsze)', 'httpx.AsyncClient = async testy (pełna kontrola)', 'Oba działają bez uruchamiania serwera'] }
          },
        ]
      },
      {
        category: 'Pydantic i walidacja',
        icon: '🔒',
        items: [
          { cmd: 'pip install pydantic[email]', desc: 'Pydantic z walidacją emaili',
            detail: { what: 'Dodaje EmailStr do Pydantic — typ który waliduje czy string jest poprawnym adresem email.', how: 'EmailStr = string z walidacją RFC 5322. Bez tej paczki FastAPI wyrzuci błąd przy próbie użycia EmailStr.', tips: ['from pydantic import EmailStr', 'class User(BaseModel): email: EmailStr', 'Pydantic v2 wymaga email-validator >= 2.0'] }
          },
          { cmd: 'python -c "from pydantic import BaseModel; print(BaseModel.__version__)"', desc: 'Sprawdź wersję Pydantic',
            detail: { what: 'Sprawdza zainstalowaną wersję Pydantic. Ważne bo Pydantic v1 i v2 mają inne API.', how: 'Pydantic v2 (2023+) jest przepisany w Rust — 5-50x szybszy. Zmienione API: .dict() → .model_dump(), .schema() → .model_json_schema().', tips: ['FastAPI 0.100+ wymaga Pydantic v2', '.model_dump() zamiast .dict()', '.model_validate() zamiast parse_obj()'], note: '⚠️ Pydantic v1 i v2 mają inne API — sprawdź wersję jeśli migrowujesz stary projekt.' }
          },
          { cmd: 'pip install pydantic-settings python-dotenv', desc: 'Konfiguracja z pliku .env',
            detail: { what: 'pydantic-settings = konfiguracja przez klasy Pydantic. python-dotenv = ładowanie .env do os.environ.', how: 'BaseSettings automatycznie czyta zmienne z .env i środowiskowych. Waliduje typy — DATABASE_URL: str = "..." zamiast os.getenv().', tips: ['Nigdy nie commituj .env do git — dodaj do .gitignore!', 'Trzymaj .env.example z placeholder wartościami', 'Na produkcji: zmienne środowiskowe zamiast .env'] }
          },
        ]
      },
      {
        category: 'Baza danych',
        icon: '🗄️',
        items: [
          { cmd: 'pip install asyncpg', desc: 'Async driver PostgreSQL (najszybszy)',
            detail: { what: 'asyncpg = najszybszy async driver PostgreSQL dla Python. Bezpośredni protokół wire, zero overhead.', how: 'Napisany w Cython. Działa z SQLAlchemy async lub bezpośrednio. Wymaga PostgreSQL >= 9.4.', tips: ['SQLAlchemy async używa asyncpg pod spodem', 'Bezpośrednio: conn = await asyncpg.connect(DSN)', 'Alternatywa: psycopg3 (nowszy, też async)'] }
          },
          { cmd: 'pip install redis[asyncio]', desc: 'Redis z obsługą async',
            detail: { what: 'Oficjalny Python klient Redis z obsługą async/await. Cache, kolejki, pub/sub, rate limiting.', how: 'redis.asyncio = async interface. Połączenie przez pool — wiele requesty współdzielą połączenia.', tips: ['redis.asyncio.from_url("redis://localhost")', 'await r.set("key", "value", ex=3600) — z TTL', 'await r.get("key") — odczyt', 'Używaj connection pool w lifespan!'] }
          },
          { cmd: 'alembic init alembic', desc: 'Inicjalizuj migracje bazy danych',
            detail: { what: 'Tworzy folder alembic/ z konfiguracją i env.py. Punkt startowy systemu migracji schematu bazy.', how: 'Alembic śledzi wersje schematu w tabeli alembic_version w bazie. Każda migracja to plik Python z upgrade() i downgrade().', tips: ['Po init: ustaw DATABASE_URL w alembic.ini', 'alembic revision --autogenerate -m "add table" — generuj z modeli', 'alembic upgrade head — zastosuj wszystkie'], note: 'Uruchom tylko raz na projekt!' }
          },
          { cmd: 'alembic revision --autogenerate -m "add users table"', desc: 'Generuj migrację z modeli SQLAlchemy',
            detail: { what: 'Porównuje obecny stan modeli SQLAlchemy z bazą i generuje plik migracji z różnicami.', how: 'Alembic importuje twoje modele, łączy się z bazą i generuje ALTER TABLE / CREATE TABLE na podstawie różnic.', tips: ['Zawsze przejrzyj wygenerowaną migrację przed zastosowaniem', 'Autogenerate nie wykrywa wszystkiego (np. zmian CHECK constraint)', 'alembic upgrade head żeby zastosować'] }
          },
          { cmd: 'alembic upgrade head', desc: 'Zastosuj wszystkie migracje',
            detail: { what: 'Uruchamia wszystkie niezastosowane migracje do najnowszej wersji (head). Aktualizuje strukturę bazy danych.', how: 'Alembic sprawdza tabelę alembic_version, wykonuje migracje w kolejności, aktualizuje wersję.', flags: [{flag: 'head', desc: 'Najnowsza wersja'}, {flag: '+1', desc: 'Następna migracja'}, {flag: 'revision_id', desc: 'Konkretna wersja'}], tips: ['alembic downgrade -1 — cofnij ostatnią migrację', 'alembic history — pokaż historię migracji', 'alembic current — pokaż aktualną wersję bazy'] }
          },
        ]
      },
      {
        category: 'Deployment',
        icon: '🚢',
        items: [
          { cmd: 'pip freeze > requirements.txt', desc: 'Zapisz zależności projektu',
            detail: { what: 'Generuje plik requirements.txt ze wszystkimi zainstalowanymi paczkami i ich dokładnymi wersjami.', how: 'pip freeze listuje wszystko w aktywnym środowisku (venv). Wersje są pinned (==) — gwarantuje reprodukowalność.', tips: ['Zawsze twórz venv przed projektem: python -m venv venv', 'Aktywuj: source venv/bin/activate (Linux/Mac) lub venv\\Scripts\\activate (Windows)', 'pip install -r requirements.txt — zainstaluj u innego dewelopera'], note: '⚠️ pip freeze listuje WSZYSTKIE paczki łącznie z zależnościami zależności. Alternatywa: pip-tools dla czystszego zarządzania.' }
          },
          { cmd: 'pip install -r requirements.txt', desc: 'Zainstaluj zależności z pliku',
            detail: { what: 'Instaluje wszystkie paczki z pliku requirements.txt — odtworzy identyczne środowisko.', how: 'pip czyta każdą linię requirements.txt i instaluje paczki z podanymi wersjami.', tips: ['pip install -r requirements.txt --no-deps — bez sprawdzania zależności', 'pip install -r requirements.txt -q — cicho (mniej output)', 'Pierwszy krok po git clone projektu FastAPI'] }
          },
          { cmd: 'docker build -t my-api .', desc: 'Zbuduj Docker image',
            detail: { what: 'Buduje Docker image z aplikacją FastAPI na podstawie Dockerfile w bieżącym folderze.', how: 'Docker czyta Dockerfile, instaluje paczki, kopiuje kod, konfiguruje CMD. -t my-api = nadaj nazwę (tag).', tips: ['Dockerfile dla FastAPI: FROM python:3.11-slim, COPY requirements.txt, RUN pip install -r requirements.txt, COPY . ., CMD uvicorn main:app --host 0.0.0.0', 'docker build . --no-cache — wymuś rebuild od zera', 'docker images — lista zbudowanych obrazów'] }
          },
          { cmd: 'docker run -p 8000:8000 my-api', desc: 'Uruchom kontener FastAPI',
            detail: { what: 'Uruchamia kontener z aplikacją i mapuje port 8000 kontenera na port 8000 hosta.', how: '-p HOST:CONTAINER. Aplikacja wewnątrz kontenera nasłuchuje na 8000, dostępna na localhost:8000.', flags: [{flag: '-p 8000:8000', desc: 'Mapowanie portów'}, {flag: '-e DATABASE_URL=...', desc: 'Zmienne środowiskowe'}, {flag: '-d', desc: 'Uruchom w tle (detached)'}, {flag: '--rm', desc: 'Usuń kontener po zatrzymaniu'}], tips: ['docker run -d -p 8000:8000 --env-file .env my-api — z plikiem .env', 'docker logs -f container_id — logi na żywo', 'docker ps — lista działających kontenerów'] }
          },
        ]
      },
      {
        category: 'Narzędzia dev',
        icon: '🔧',
        items: [
          { cmd: 'pip install ruff', desc: 'Szybki linter i formatter Python (zastępuje flake8+black)',
            detail: { what: 'Ruff = ultraszybki linter i formatter Python napisany w Rust. Zastępuje flake8, black, isort w jednym narzędziu. 10-100x szybszy.', how: 'Ruff sprawdza styl, błędy, importy. Może też auto-formatować (ruff format .).', tips: ['ruff check . — sprawdź błędy', 'ruff check . --fix — auto-napraw', 'ruff format . — formatuj (jak black)', 'Dodaj do pyproject.toml: [tool.ruff] line-length = 88'] }
          },
          { cmd: 'pip install mypy', desc: 'Statyczna analiza typów Python',
            detail: { what: 'Mypy sprawdza type hints w kodzie Python — wykrywa błędy typów bez uruchamiania kodu. Jak tsc dla TypeScript.', how: 'mypy main.py — sprawdź jeden plik. mypy . — cały projekt. Czyta type annotations i sprawdza spójność.', tips: ['mypy . — sprawdź całość', 'Dla FastAPI: pip install types-redis types-requests', 'Ignoruj linię: # type: ignore', 'Konfiguracja w pyproject.toml: [tool.mypy]'] }
          },
          { cmd: 'pip install pre-commit', desc: 'Git hooks — auto-check przed commitem',
            detail: { what: 'Pre-commit uruchamia linters i formattery automatycznie przy git commit. Blokuje commit jeśli kod nie przejdzie sprawdzeń.', how: 'Konfigurujesz w .pre-commit-config.yaml. Przy git commit: ruff check, mypy, ruff format — wszystko automatycznie.', tips: ['pre-commit install — zainstaluj hooki w repo', 'pre-commit run --all-files — uruchom ręcznie na całym projekcie', 'Standardowy .pre-commit-config.yaml: ruff + ruff-format'] }
          },
          { cmd: 'curl http://localhost:8000/docs', desc: 'Sprawdź czy API działa',
            detail: { what: 'Szybki test czy serwer FastAPI odpowiada. /docs to Swagger UI — jeśli zwraca HTML to API działa.', how: 'curl to command-line HTTP klient. Domyślnie GET. Wynik wypisany w terminalu.', tips: ['curl http://localhost:8000/ — test root endpoint', 'curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d \'{"name":"test"}\'', 'curl -s http://localhost:8000/health | python3 -m json.tool — ładny JSON'] }
          },
        ]
      }
    ];
