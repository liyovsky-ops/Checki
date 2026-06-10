// Advanced patterns: routing + state
export default {
routing: {
      install: 'pip install pytest',
      version: 'pytest 8.x',
      sections: [
        {
          title: '@pytest.mark.parametrize — jeden test, wiele przypadków',
          code: `import pytest

def add(a, b):
    return a + b

# Test uruchomi się 4 razy z różnymi danymi
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert add(a, b) == expected

# Parametryzacja URL scrapera
@pytest.mark.parametrize("url", [
    "https://python.org",
    "https://github.com",
    "https://stackoverflow.com",
])
def test_scrape_url(url):
    assert url.startswith("https://")`
        },
        {
          title: '@pytest.mark.skip — pomijanie testów',
          code: `import pytest
import sys

# Zawsze pomijaj
@pytest.mark.skip(reason="Nie gotowe jeszcze")
def test_feature_in_progress():
    assert False  # nigdy nie uruchomi się

# Pomijaj warunkowo
@pytest.mark.skipif(sys.platform == "win32", reason="Nie działa na Windows")
def test_linux_only():
    assert True

# Pomijaj w kodzie testu
def test_skip_dynamically():
    if not external_service_available():
        pytest.skip("Serwis zewnętrzny niedostępny")
    assert call_service() == "ok"`
        },
        {
          title: '@pytest.mark.xfail — oczekiwany błąd',
          code: `import pytest

# Oczekujemy że test PADNIE — jeśli padnie, to OK (XFAIL)
# Jeśli przejdzie niespodziewanie — XPASS (ostrzeżenie)
@pytest.mark.xfail(reason="Znany bug #123, naprawimy w v2")
def test_known_bug():
    assert 1 == 2  # pada, ale to OK

# strict=True — XPASS = błąd (wymusza że bug naprawiony = zmień marker)
@pytest.mark.xfail(strict=True, reason="Musi się nie powieść")
def test_strict_xfail():
    assert 1 == 2`
        },
        {
          title: 'Własne markery — grupowanie testów',
          code: `# pytest.ini lub pyproject.toml:
# [pytest]
# markers =
#     slow: testy które trwają długo
#     integration: testy integracyjne z zewnętrznymi serwisami
#     smoke: podstawowe testy sanity check

import pytest

@pytest.mark.slow
def test_large_dataset_processing():
    # trwa 30 sekund...
    pass

@pytest.mark.integration
def test_database_connection():
    # wymaga działającej bazy
    pass

@pytest.mark.smoke
def test_api_is_alive():
    pass

# Uruchamianie:
# pytest -m slow           — tylko wolne testy
# pytest -m "not slow"     — wszystko oprócz wolnych
# pytest -m "smoke or integration"`
        },
        {
          title: 'pytest.ini / pyproject.toml — konfiguracja',
          code: `# pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]          # gdzie szukać testów
addopts = "-v --tb=short"      # domyślne flagi
asyncio_mode = "auto"          # pytest-asyncio
markers = [
    "slow: testy które trwają długo",
    "integration: wymaga zewnętrznych serwisów",
    "smoke: szybkie testy sanity check",
]

# Lub pytest.ini
[pytest]
testpaths = tests
addopts = -v --tb=short
asyncio_mode = auto`
        },
        {
          title: 'Struktura projektu testów',
          code: `projekt/
├── src/
│   ├── scraper.py
│   ├── parser.py
│   └── api.py
├── tests/
│   ├── conftest.py          # wspólne fixtures
│   ├── test_scraper.py
│   ├── test_parser.py
│   ├── integration/
│   │   ├── conftest.py      # fixtures dla integracji
│   │   └── test_api.py
│   └── e2e/
│       └── test_full_flow.py
├── pyproject.toml
└── requirements.txt

# pytest automatycznie wykryje wszystkie test_*.py`
        }
      ]
    },
  state: [
      {
        name: 'pytest-asyncio — async testy',
        icon: '⚡',
        color: '#0A9EDC',
        complexity: 'Średnia',
        bundle: 'pytest-asyncio',
        when: 'Testowanie async funkcji, FastAPI endpoints, aiohttp, asyncio kodu',
        code: `import pytest
import asyncio

# pip install pytest-asyncio
# W pyproject.toml: asyncio_mode = "auto"

async def fetch_async(url):
    await asyncio.sleep(0.1)  # symulacja I/O
    return {"url": url, "status": 200}

@pytest.mark.asyncio
async def test_async_fetch():
    result = await fetch_async("https://example.com")
    assert result["status"] == 200

# Z asyncio_mode = "auto" — nie trzeba dekoratora:
async def test_auto_async():
    result = await fetch_async("https://test.com")
    assert "url" in result`
      },
      {
        name: 'httpx.AsyncClient — testowanie FastAPI async',
        icon: '🔌',
        color: '#009688',
        complexity: 'Średnia',
        bundle: 'httpx + pytest-asyncio',
        when: 'Testy endpointów FastAPI — async klient HTTP w testach',
        code: `import pytest
import httpx
from fastapi.testclient import TestClient
from main import app

# Sync — prostsze
def test_sync():
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200

# Async — pełna kontrola
@pytest.fixture
async def async_client():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        yield client

async def test_async_endpoint(async_client):
    response = await async_client.get("/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)`
      },
      {
        name: 'pytest-asyncio gather — testy równoległe',
        icon: '🚀',
        color: '#F5C518',
        complexity: 'Wysoka',
        bundle: 'asyncio.gather',
        when: 'Testowanie równoległych requestów, race conditions, concurrent operations',
        code: `import pytest
import asyncio
import httpx

async def test_concurrent_requests():
    urls = [
        "https://api.example.com/item/1",
        "https://api.example.com/item/2",
        "https://api.example.com/item/3",
    ]
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)

    assert all(r.status_code == 200 for r in responses)
    assert len(responses) == 3`
      },
      {
        name: 'pytest-cov — pokrycie kodu',
        icon: '📊',
        color: '#4CAF50',
        complexity: 'Niska',
        bundle: 'pytest-cov',
        when: 'Sprawdź które linie kodu nie są testowane. CI/CD — blokuj przy < 80% coverage.',
        code: `# pip install pytest-cov
# pytest --cov=src --cov-report=html

# pyproject.toml
[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*", "*/migrations/*"]

[tool.coverage.report]
fail_under = 80    # fail jeśli coverage < 80%
show_missing = true

# W CI:
# pytest --cov=src --cov-fail-under=80`
      },
      {
        name: 'freezegun — mockowanie czasu',
        icon: '⏱️',
        color: '#9C27B0',
        complexity: 'Niska',
        bundle: 'freezegun',
        when: 'Testowanie logiki zależnej od datetime.now() — crontaby, TTL, expiry dates',
        code: `from freezegun import freeze_time
from datetime import datetime

def get_greeting():
    hour = datetime.now().hour
    if hour < 12:
        return "Dzień dobry"
    return "Dobry wieczór"

@freeze_time("2024-01-15 08:30:00")
def test_morning_greeting():
    assert get_greeting() == "Dzień dobry"

@freeze_time("2024-01-15 20:00:00")
def test_evening_greeting():
    assert get_greeting() == "Dobry wieczór"`
      },
      {
        name: 'responses — mockowanie HTTP',
        icon: '🌐',
        color: '#FF5722',
        complexity: 'Niska',
        bundle: 'responses',
        when: 'Mockowanie requests.get() bez monkeypatching — czystsze API',
        code: `import responses as resp
import requests

def fetch_user(user_id):
    r = requests.get(f"https://api.example.com/users/{user_id}")
    return r.json()

@resp.activate
def test_fetch_user():
    # Zdefiniuj mock response
    resp.add(
        resp.GET,
        "https://api.example.com/users/1",
        json={"id": 1, "name": "Alice"},
        status=200
    )

    result = fetch_user(1)
    assert result["name"] == "Alice"
    # Prawdziwy HTTP NIE jest wywołany!`
      }
    ]
};
