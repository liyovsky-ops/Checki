const FW_PYTEST_DATA = {
  meta: {
    id: 'pytest', name: 'pytest', icon: '🧪', color: '#0A9EDC', color2: '#F5C518',
    tagline: 'Najpopularniejszy framework testowy dla Pythona',
    year: 2004, author: 'Holger Krekel', lang: 'Python 3.8+',
    github: 'pytest-dev/pytest', stars: '12k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Asercje' },
    { id: 'hooki',      label: 'Fixtures' },
    { id: 'routing',    label: 'Markery' },
    { id: 'state',      label: 'Async' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Pluginy' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać pytest?',
        firstComponent: 'Pierwszy test',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest pytest?',
        desc: 'pytest to framework do testowania kodu Python. Pozwala pisać testy jako zwykłe funkcje (nie klasy jak w unittest). Automatycznie wykrywa pliki testów, daje czytelne raporty błędów i ma ogromny ekosystem pluginów. Standard branżowy w automatyzacji i backend developmencie.',
      },
      concepts: [
        {
          title: 'Auto-discovery',
          desc: 'pytest automatycznie znajduje testy w plikach test_*.py lub *_test.py, funkcjach test_* i klasach Test*. Zero konfiguracji — po prostu uruchom pytest.',
          icon: '🔍'
        },
        {
          title: 'Fixtures',
          desc: 'Fixtures to funkcje przygotowujące dane/zasoby dla testów. Wstrzykiwane automatycznie przez nazwę argumentu. Scope kontroluje czas życia (function, class, module, session).',
          icon: '🔧'
        },
        {
          title: 'Asercje',
          desc: 'Używasz zwykłego assert Pythona. pytest automatycznie pokazuje wartości zmiennych gdy asercja padnie — nie potrzebujesz assertEqual, assertTrue itp.',
          icon: '✅'
        },
        {
          title: 'Markery',
          desc: 'Markery (@pytest.mark.*) oznaczają testy: skip, xfail, parametrize. Możesz też tworzyć własne markery do grupowania testów.',
          icon: '🏷️'
        }
      ],
      whenToUse: [
        'Testowanie skryptów automatyzacji (sprawdź czy scraper zwraca dane)',
        'Testy jednostkowe funkcji i klas Python',
        'Testy integracyjne FastAPI, bazy danych, Redis',
        'Testy parametryczne — jeden test, wiele przypadków wejściowych',
        'CI/CD — automatyczne testy przed deployem'
      ],
      firstComponent: `# test_scraper.py
import pytest
from scraper import fetch_page, parse_links

def test_fetch_returns_html():
    result = fetch_page("https://example.com")
    assert result is not None
    assert "<html" in result.lower()

def test_parse_links_finds_urls():
    html = '<a href="https://google.com">link</a>'
    links = parse_links(html)
    assert len(links) == 1
    assert "google.com" in links[0]

# Uruchom: pytest test_scraper.py -v`
    },

    komponenty: [
      {
        title: 'Podstawowe asercje — assert',
        desc: 'Używasz zwykłego Python assert. Gdy test padnie, pytest pokazuje dokładnie co porównywał — wartości zmiennych, różnice.',
        code: `def test_basic_assertions():
    # Równość
    assert 1 + 1 == 2
    assert "hello".upper() == "HELLO"

    # Zawieranie
    assert "python" in "i love python"
    assert 3 in [1, 2, 3, 4]

    # Prawdziwość
    assert bool([1, 2, 3])    # niepusta lista = True
    assert not bool([])        # pusta lista = False

    # Porównania
    assert 10 > 5
    assert 0.1 + 0.2 == pytest.approx(0.3)  # floaty!`
      },
      {
        title: 'pytest.approx — porównywanie liczb zmiennoprzecinkowych',
        desc: 'Nigdy nie porównuj floatów przez ==. pytest.approx obsługuje tolerancję przy porównaniach.',
        code: `import pytest

def test_float_comparison():
    # ❌ To PADNIE — 0.1 + 0.2 = 0.30000000000000004
    # assert 0.1 + 0.2 == 0.3

    # ✅ Prawidłowo
    assert 0.1 + 0.2 == pytest.approx(0.3)
    assert 0.1 + 0.2 == pytest.approx(0.3, rel=1e-6)

    # Działa też na listach
    assert [0.1 + 0.2, 0.4 + 0.1] == pytest.approx([0.3, 0.5])`
      },
      {
        title: 'pytest.raises — testowanie wyjątków',
        desc: 'Sprawdź czy kod rzuca wyjątek którego oczekujesz. Kluczowe przy testowaniu walidacji.',
        code: `import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero_raises():
    with pytest.raises(ValueError):
        divide(10, 0)

def test_raises_with_message():
    with pytest.raises(ValueError, match="divide by zero"):
        divide(10, 0)

def test_raises_and_inspect():
    with pytest.raises(KeyError) as exc_info:
        {}["missing_key"]
    assert "missing_key" in str(exc_info.value)`
      },
      {
        title: 'Porównywanie słowników i list',
        desc: 'pytest pokazuje czytelne diff przy porównywaniu złożonych struktur danych.',
        code: `def test_dict_comparison():
    result = {"name": "Alice", "age": 30, "active": True}
    expected = {"name": "Alice", "age": 30, "active": True}
    assert result == expected

def test_list_subset():
    scraped_urls = ["https://a.com", "https://b.com", "https://c.com"]
    assert "https://b.com" in scraped_urls
    assert len(scraped_urls) == 3

def test_dict_contains_key():
    data = {"status": "ok", "count": 42}
    assert "status" in data
    assert data["count"] > 0`
      },
      {
        title: 'capfd — przechwytywanie output',
        desc: 'Testuj co twój kod wypisuje na stdout/stderr. Przydatne dla skryptów automatyzacji.',
        code: `def greet(name):
    print(f"Hello, {name}!")

def test_output(capfd):
    greet("Łukasz")
    captured = capfd.readouterr()
    assert "Hello, Łukasz!" in captured.out
    assert captured.err == ""  # nic na stderr

def test_log_output(capfd):
    import logging
    logging.warning("Test warning")
    # caplog fixture dla logowania:
    # assert "Test warning" in caplog.text`
      },
      {
        title: 'monkeypatch — podmiana obiektów',
        desc: 'Podmień funkcję, metodę lub zmienną środowiskową na czas testu. Kluczowe przy testowaniu bez zewnętrznych API.',
        code: `import requests

def get_status(url):
    response = requests.get(url)
    return response.status_code

def test_get_status_mocked(monkeypatch):
    class FakeResponse:
        status_code = 200

    # Podmieniamy requests.get — NIE wywołuje prawdziwego HTTP
    monkeypatch.setattr(requests, "get", lambda url: FakeResponse())

    result = get_status("https://example.com")
    assert result == 200

def test_env_variable(monkeypatch):
    monkeypatch.setenv("API_KEY", "test_key_123")
    import os
    assert os.environ["API_KEY"] == "test_key_123"`
      }
    ],

    hooki: [
      {
        name: 'Fixture — podstawy',
        desc: 'Fixture to funkcja dekorowana @pytest.fixture. Jej zwracana wartość jest wstrzykiwana do testu przez nazwę argumentu.',
        when: 'Dane testowe, połączenia z DB, klienci HTTP, pliki tymczasowe',
        code: `import pytest

@pytest.fixture
def sample_data():
    return {
        "urls": ["https://a.com", "https://b.com"],
        "timeout": 30
    }

@pytest.fixture
def empty_list():
    return []

def test_scraper_config(sample_data):
    # pytest automatycznie wstrzykuje sample_data
    assert len(sample_data["urls"]) == 2
    assert sample_data["timeout"] == 30

def test_with_multiple(sample_data, empty_list):
    # Możesz użyć wielu fixtures naraz
    empty_list.extend(sample_data["urls"])
    assert len(empty_list) == 2`
      },
      {
        name: 'Fixture scope — czas życia',
        desc: 'Scope kontroluje jak często fixture jest tworzona. session = raz na całą sesję testów. Idealne dla drogich zasobów (połączenie DB).',
        when: 'Optymalizacja — np. jeden client HTTP dla wszystkich testów zamiast tworzenia przy każdym',
        code: `import pytest
import httpx

# function (domyślnie) — nowy dla każdego testu
@pytest.fixture
def fresh_data():
    return []

# module — raz na plik testów
@pytest.fixture(scope="module")
def http_client():
    client = httpx.Client()
    yield client       # yield zamiast return = cleanup po testach
    client.close()     # cleanup

# session — raz na całą sesję pytest
@pytest.fixture(scope="session")
def db_connection():
    conn = connect_to_db()
    yield conn
    conn.close()`
      },
      {
        name: 'Fixture z yield — setup i teardown',
        desc: 'yield w fixture = kod przed yield to setup, kod po yield to teardown (cleanup). Gwarantowane wykonanie nawet gdy test padnie.',
        when: 'Pliki tymczasowe, połączenia z bazą, serwery mock — cokolwiek wymagającego sprzątania',
        code: `import pytest
import tempfile, os

@pytest.fixture
def temp_file():
    # SETUP — przed testem
    fd, path = tempfile.mkstemp(suffix=".txt")
    os.write(fd, b"test content")
    os.close(fd)

    yield path  # przekaż ścieżkę do testu

    # TEARDOWN — po teście (zawsze!)
    os.unlink(path)

def test_reads_file(temp_file):
    with open(temp_file) as f:
        content = f.read()
    assert "test content" in content
    # Plik usunięty automatycznie po teście`
      },
      {
        name: 'conftest.py — wspólne fixtures',
        desc: 'Fixtures w conftest.py są dostępne dla wszystkich testów w tym folderze i podfolderach. Bez importowania.',
        when: 'Fixtures używane w wielu plikach testów — baza danych, klient HTTP, dane testowe',
        code: `# conftest.py (w folderze tests/)
import pytest
import httpx

@pytest.fixture(scope="session")
def api_client():
    """Dostępne we WSZYSTKICH testach bez importu."""
    client = httpx.Client(base_url="http://localhost:8000")
    yield client
    client.close()

@pytest.fixture
def sample_user():
    return {"name": "Test User", "email": "test@test.com"}

# test_users.py — używa bez importu!
def test_create_user(api_client, sample_user):
    response = api_client.post("/users", json=sample_user)
    assert response.status_code == 201`
      },
      {
        name: 'pytest-mock — mockowanie',
        desc: 'pytest-mock to wrapper na unittest.mock. mocker fixture daje łatwy dostęp do patch, MagicMock, spy.',
        when: 'Mockowanie zewnętrznych API, baz danych, plików — testy bez efektów ubocznych',
        code: `# pip install pytest-mock
import requests

def fetch_data(url):
    response = requests.get(url)
    return response.json()

def test_fetch_mocked(mocker):
    # Mockuj requests.get
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"data": "test"}

    result = fetch_data("https://api.example.com")

    assert result == {"data": "test"}
    mock_get.assert_called_once_with("https://api.example.com")`
      },
      {
        name: 'Fixture parametryzacja',
        desc: 'Fixture z params uruchamia test wielokrotnie — raz dla każdego parametru. Idealne do testowania wielu konfiguracji.',
        when: 'Testowanie tej samej logiki na różnych danych wejściowych, różne środowiska',
        code: `import pytest

@pytest.fixture(params=["https://google.com", "https://github.com"])
def test_url(request):
    return request.param

def test_url_is_valid(test_url):
    # Test uruchomi się DWA razy:
    # raz z google.com, raz z github.com
    assert test_url.startswith("https://")
    assert len(test_url) > 10`
      }
    ],

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
    ],

    rywale: [
      {
        name: 'unittest',
        icon: '🐍',
        color: '#3776ab',
        tagline: 'Wbudowany framework testowy Pythona',
        pros: ['Wbudowany — zero instalacji', 'Klasy i metody — znajome dla Java/C# developerów', 'TestCase z setUp/tearDown', 'Dobra integracja z IDE'],
        cons: ['Dużo boilerplate (klasy, self)', 'Słabsze raporty błędów niż pytest', 'Brak fixtures', 'Verbose asercje (assertEqual, assertTrue)'],
        vsReact: 'unittest jest wbudowany — nie trzeba nic instalować. Ale pytest jest prostszy (zwykłe funkcje), ma lepsze raporty i fixtures. pytest może też uruchamiać testy unittest.',
        bestFor: 'Legacy kod, gdy nie możesz instalować zewnętrznych paczek'
      },
      {
        name: 'nose2',
        icon: '👃',
        color: '#795548',
        tagline: 'Następca nose — rozszerzenie unittest',
        pros: ['Plugin-based', 'Kompatybilny z unittest', 'Lekki'],
        cons: ['Mniejsza społeczność niż pytest', 'Mniej aktywny rozwój', 'Mniej pluginów', 'Gorsze raportowanie'],
        vsReact: 'nose2 to de facto martwy projekt — społeczność przeniosła się na pytest. Unikaj w nowych projektach.',
        bestFor: 'Legacy projekty które już używają nose'
      },
      {
        name: 'doctest',
        icon: '📖',
        color: '#607D8B',
        tagline: 'Testy w docstringach',
        pros: ['Dokumentacja = test', 'Wbudowany w Python', 'Zero boilerplate', 'Wymusza aktualną dokumentację'],
        cons: ['Tylko proste przypadki', 'Kruche na formatowanie', 'Brak fixtures', 'Brak parametryzacji'],
        vsReact: 'Doctest jest świetny do prostych przykładów w dokumentacji. Do poważnych testów używaj pytest.',
        bestFor: 'Biblioteki gdzie przykłady w docs muszą działać'
      },
      {
        name: 'tox',
        icon: '☣️',
        color: '#009688',
        tagline: 'Testowanie na wielu wersjach Pythona',
        pros: ['Testuje na Python 3.9, 3.10, 3.11, 3.12', 'Izolowane środowiska', 'Integracja z CI/CD', 'Uruchamia pytest + linters'],
        cons: ['Wolniejszy (tworzy venv)', 'Dodatkowa konfiguracja', 'Nie zastępuje pytest'],
        vsReact: 'Tox nie zastępuje pytest — uruchamia pytest na wielu wersjach Python. Razem: tox jako orchestrator, pytest jako test runner.',
        bestFor: 'Biblioteki publiczne, projekty wspierające wiele wersji Python'
      },
      {
        name: 'pytest-bdd',
        icon: '🥒',
        color: '#4CAF50',
        tagline: 'Behaviour-Driven Development w pytest',
        pros: ['Testy w języku naturalnym (Gherkin)', 'Czytelne dla non-techów', 'Given/When/Then struktura', 'Integracja z pytest'],
        cons: ['Dużo boilerplate', 'Narzut dla prostych projektów', 'Wymaga pisania w dwóch miejscach', 'Nie dla każdego projektu'],
        vsReact: 'pytest-bdd dla projektów gdzie product owner lub klient czyta testy. Zwykły pytest dla typowych projektów automatyzacji.',
        bestFor: 'Projekty z requirement\'ami w języku naturalnym, praca z klientami'
      }
    ],

    pluginy: [
      {
        name: 'pytest-cov',
        icon: '📊',
        color: '#4CAF50',
        tagline: 'Pokrycie kodu (code coverage)',
        install: 'pip install pytest-cov',
        use: 'Mierzy które linie kodu są testowane. Generuje raporty HTML, XML (CI) lub terminal. Niezbędny przy CI/CD — blokuje merge gdy coverage spada.',
        example: `pytest --cov=src --cov-report=html --cov-report=term-missing
pytest --cov=src --cov-fail-under=80   # fail poniżej 80%`
      },
      {
        name: 'pytest-mock',
        icon: '🎭',
        color: '#9C27B0',
        tagline: 'Wygodne mockowanie przez fixture mocker',
        install: 'pip install pytest-mock',
        use: 'Dodaje fixture mocker — wrapper na unittest.mock. Zamiast @patch dekoratora używasz mocker.patch() w ciele testu. Auto-cleanup po teście.',
        example: `def test_api_call(mocker):
    mock = mocker.patch('myapp.requests.get')
    mock.return_value.json.return_value = {'ok': True}
    result = myapp.fetch_data()
    assert result == {'ok': True}`
      },
      {
        name: 'pytest-asyncio',
        icon: '⚡',
        color: '#00BCD4',
        tagline: 'Testowanie async/await',
        install: 'pip install pytest-asyncio',
        use: 'Pozwala pisać async def test_* funkcje. Bez tego pytest nie wie jak uruchomić korutyny. Wymagane do testowania FastAPI, aiohttp, asyncio kodu.',
        example: `# pyproject.toml: asyncio_mode = "auto"

async def test_async_fetch():
    result = await fetch_data_async()
    assert result is not None`
      },
      {
        name: 'pytest-xdist',
        icon: '🚀',
        color: '#FF5722',
        tagline: 'Równoległe uruchamianie testów',
        install: 'pip install pytest-xdist',
        use: 'Uruchamia testy równolegle na wielu CPU. Przy dużym projekcie skraca czas testów 4-8x. Uwaga: fixtures z shared state mogą wymagać dostosowania.',
        example: `pytest -n auto    # tyle workerów ile CPU
pytest -n 4       # dokładnie 4 workery`
      },
      {
        name: 'responses',
        icon: '🌐',
        color: '#2196F3',
        tagline: 'Mockowanie HTTP requestów (biblioteka requests)',
        install: 'pip install responses',
        use: 'Przechwytuje wywołania requests.get/post i zwraca zdefiniowane odpowiedzi. Zero prawdziwych połączeń HTTP w testach.',
        example: `import responses, requests

@responses.activate
def test_github_api():
    responses.add(responses.GET,
        'https://api.github.com/users/test',
        json={'login': 'test'}, status=200)
    r = requests.get('https://api.github.com/users/test')
    assert r.json()['login'] == 'test'`
      },
      {
        name: 'pytest-httpx',
        icon: '🔗',
        color: '#607D8B',
        tagline: 'Mockowanie HTTPX (async HTTP client)',
        install: 'pip install pytest-httpx',
        use: 'Jak responses, ale dla biblioteki httpx. Niezbędny gdy testujesz FastAPI z TestClient lub kod używający async http.',
        example: `async def test_fetch(httpx_mock):
    httpx_mock.add_response(json={"status": "ok"})
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.example.com")
    assert r.json() == {"status": "ok"}`
      },
      {
        name: 'hypothesis',
        icon: '🎲',
        color: '#E91E63',
        tagline: 'Property-based testing — generowanie danych',
        install: 'pip install hypothesis',
        use: 'Automatycznie generuje setki przypadków testowych z reguł które definiujesz. Znajduje edge casy których nie przewidziałeś. Minimalizuje failing przykład do najprostszej formy.',
        example: `from hypothesis import given, strategies as st

@given(st.integers(), st.integers())
def test_komutywnosc_dodawania(a, b):
    assert a + b == b + a

@given(st.text())
def test_odwrocenie_nie_zmienia_dlugosci(s):
    assert len(s) == len(s[::-1])`
      },
      {
        name: 'pytest-benchmark',
        icon: '⏱️',
        color: '#FF9800',
        tagline: 'Benchmarki wydajności w testach',
        install: 'pip install pytest-benchmark',
        use: 'Mierzy czas wykonania funkcji. Automatycznie uruchamia wielokrotnie i uśrednia. Wykrywa regressje wydajności między wersjami.',
        example: `def test_sorting_speed(benchmark):
    data = list(range(10000, 0, -1))
    result = benchmark(sorted, data)
    assert result[0] == 1`
      },
      {
        name: 'freezegun',
        icon: '🕐',
        color: '#795548',
        tagline: 'Mockowanie daty i czasu',
        install: 'pip install freezegun',
        use: 'Podmienia datetime.now(), date.today(), time.time() na kontrolowaną wartość. Testuj kod zależny od czasu bez czekania i bez flaky testów.',
        example: `from freezegun import freeze_time
from datetime import datetime

@freeze_time("2024-01-15 12:00:00")
def test_wygasniecie_tokenu():
    token = create_token(expires_in=3600)
    assert not token.is_expired()  # "teraz" = 2024-01-15 12:00:00`
      },
      {
        name: 'pytest-randomly',
        icon: '🎯',
        color: '#9E9E9E',
        tagline: 'Losowa kolejność testów — wykrywa flaky testy',
        install: 'pip install pytest-randomly',
        use: 'Losuje kolejność testów przy każdym uruchomieniu. Wykrywa testy które zależą od kolejności wykonania (flaky tests). Seed można powtórzyć do debugowania.',
        example: `pytest                        # losowa kolejność
pytest -p no:randomly         # wyłącz losowanie
pytest --randomly-seed=1234   # powtórz konkretne losowanie`
      }
    ],

    komendy: [
      {
        category: 'Uruchamianie testów',
        icon: '▶️',
        items: [
          { cmd: 'pytest', desc: 'Uruchom wszystkie testy w projekcie',
            detail: { what: 'Znajduje i uruchamia wszystkie pliki test_*.py i *_test.py w bieżącym folderze i podfolderach. Wyświetla podsumowanie passed/failed/error.', how: 'pytest skanuje drzewo katalogów szukając plików testów. Automatycznie dodaje bieżący folder do sys.path.', tips: ['pytest -v — verbose, widać każdy test osobno', 'pytest -q — quiet, tylko podsumowanie', 'Uruchom w folderze projektu (gdzie pyproject.toml)'] }
          },
          { cmd: 'pytest -v', desc: 'Verbose — wyświetl każdy test osobno',
            detail: { what: 'Pokazuje nazwę każdego testu i jego wynik (PASSED/FAILED/SKIPPED). Bez -v widać tylko kropki i F.', how: 'Każda linia to jeden test: tests/test_scraper.py::test_fetch_returns_html PASSED', tips: ['-v = verbose, -vv = bardzo verbose (pokazuje diff asercji)', 'Combine z -s: pytest -vs — verbose + print output'] }
          },
          { cmd: 'pytest tests/test_scraper.py', desc: 'Uruchom tylko jeden plik testów',
            detail: { what: 'Uruchamia testy tylko z podanego pliku. Szybsze przy developmencie gdy pracujesz nad konkretnym modułem.', how: 'Podaj ścieżkę względną lub absolutną do pliku testów.', tips: ['pytest tests/test_scraper.py::test_fetch_url — jeden konkretny test', 'pytest tests/test_scraper.py -v — plik + verbose', 'Tab completion działa dla ścieżek'] }
          },
          { cmd: 'pytest -k "scraper"', desc: 'Uruchom testy zawierające słowo w nazwie',
            detail: { what: 'Filtruje testy po nazwie funkcji lub pliku. -k przyjmuje wyrażenie — możesz łączyć przez and, or, not.', how: 'pytest porównuje -k z nazwami plików, klas i funkcji testowych.', flags: [{flag: '-k "scraper"', desc: 'Zawierające "scraper" w nazwie'}, {flag: '-k "not slow"', desc: 'Wszystko oprócz "slow"'}, {flag: '-k "fetch or parse"', desc: 'fetch LUB parse'}], tips: ['Wygodne przy pracy nad konkretną funkcją', 'Case-insensitive'] }
          },
          { cmd: 'pytest -m smoke', desc: 'Uruchom testy z konkretnym markerem',
            detail: { what: 'Uruchamia tylko testy oznaczone @pytest.mark.smoke. Markery musisz zdefiniować w pytest.ini/pyproject.toml.', how: 'pytest filtruje po markerach przed uruchomieniem.', flags: [{flag: '-m smoke', desc: 'Tylko smoke testy'}, {flag: '-m "not slow"', desc: 'Pomiń wolne testy'}, {flag: '-m "smoke or integration"', desc: 'smoke lub integration'}], tips: ['Zdefiniuj markery w pyproject.toml żeby uniknąć ostrzeżeń', 'pytest --markers — pokaż wszystkie dostępne markery'] }
          },
          { cmd: 'pytest -x', desc: 'Zatrzymaj przy pierwszym błędzie',
            detail: { what: 'Przerywa wykonywanie testów przy pierwszym FAILED. Przydatne gdy debug ujesz konkretny problem.', how: 'Normalne pytest uruchamia wszystkie testy i zbiera błędy. -x zatrzymuje się natychmiast.', flags: [{flag: '-x', desc: 'Zatrzymaj przy 1. błędzie'}, {flag: '--maxfail=3', desc: 'Zatrzymaj po 3 błędach'}], tips: ['Łącz z -v: pytest -xvs — zatrzymaj + verbose + stdout', 'Świetne gdy naprawiasz testy jeden po drugim'] }
          },
          { cmd: 'pytest --lf', desc: 'Uruchom tylko ostatnio popsute testy',
            detail: { what: '--lf = --last-failed. Uruchamia tylko testy które padły w poprzednim uruchomieniu. Oszczędza czas przy naprawianiu błędów.', how: 'pytest zapamiętuje wyniki w pliku .pytest_cache/. --lf czyta ten cache.', tips: ['--lf — tylko failed', '--ff — failed first, potem reszta', 'Świetne workflow: pytest → napraw błędy → pytest --lf'] }
          },
          { cmd: 'pytest --tb=short', desc: 'Skróć traceback przy błędach',
            detail: { what: 'Kontroluje format traceback przy błędach. short = skrócony, long = pełny (domyślny), no = bez traceback, line = jedna linia.', how: 'Domyślny traceback może być bardzo długi. short pokazuje najważniejsze — gdzie błąd i jakie wartości.', flags: [{flag: '--tb=short', desc: 'Skrócony traceback'}, {flag: '--tb=long', desc: 'Pełny traceback (domyślny)'}, {flag: '--tb=no', desc: 'Bez traceback'}, {flag: '--tb=line', desc: 'Jedna linia na błąd'}], tips: ['Dodaj do pytest.ini: addopts = --tb=short', 'short jest czytelniejszy dla większości przypadków'] }
          },
        ]
      },
      {
        category: 'Coverage i raporty',
        icon: '📊',
        items: [
          { cmd: 'pytest --cov=src', desc: 'Uruchom testy z pomiarem pokrycia kodu',
            detail: { what: 'Mierzy które linie kodu są uruchamiane podczas testów. Wymaga: pip install pytest-cov.', how: 'coverage.py instrumentuje kod — śledzi każdą wykonaną linię. Wynik: % linii objętych testami.', tips: ['--cov=src — mierz tylko folder src/ (nie biblioteki)', 'pytest --cov=. — mierz cały projekt', 'Pierwszy krok: uruchom i sprawdź raport'] }
          },
          { cmd: 'pytest --cov=src --cov-report=html', desc: 'Coverage z raportem HTML',
            detail: { what: 'Generuje interaktywny raport HTML w folderze htmlcov/. Kliknij plik i zobaczysz które linie są czerwone (nieobjęte).', how: 'coverage.py generuje HTML ze wszystkimi plikami źródłowymi. Czerwone linie = brak testu, zielone = objęte.', tips: ['Otwórz htmlcov/index.html w przeglądarce', 'Szukaj funkcji z niskim % — to kandydaci do testów', 'Dodaj htmlcov/ do .gitignore'] }
          },
          { cmd: 'pytest --cov=src --cov-fail-under=80', desc: 'Fail gdy coverage < 80%',
            detail: { what: 'Zwraca exit code 1 (błąd) gdy pokrycie kodu spada poniżej 80%. Idealne do CI/CD — blokuje merge gdy testy nie pokrywają wystarczająco dużo.', how: 'Po uruchomieniu testów coverage sprawdza % i zwraca odpowiedni exit code.', tips: ['Zacznij od niższego progu (np. 60%) i podnoś stopniowo', 'Ustaw w pyproject.toml: [tool.coverage.report] fail_under = 80', '80% to dobry cel — 100% często nie jest praktyczne'] }
          },
          { cmd: 'pytest --cov=src --cov-report=term-missing', desc: 'Pokaż brakujące linie w terminalu',
            detail: { what: 'Wyświetla raport coverage bezpośrednio w terminalu z numerami linii które nie są objęte testami.', how: 'Każdy plik: nazwa, % coverage, numery brakujących linii. Szybsze niż otwieranie HTML.', tips: ['Kolumna "Missing" pokazuje numery linii bez testów', 'Łącz z -v: pytest -v --cov=src --cov-report=term-missing'] }
          },
        ]
      },
      {
        category: 'Instalacja pluginów',
        icon: '🔌',
        items: [
          { cmd: 'pip install pytest-asyncio', desc: 'Plugin dla async testów',
            detail: { what: 'Pozwala pisać async def test_ funkcje. Wymagane do testowania asyncio, FastAPI async endpoints, aiohttp.', how: 'pytest-asyncio uruchamia async testy przez asyncio event loop.', tips: ['Dodaj do pyproject.toml: asyncio_mode = "auto"', 'Bez asyncio_mode = "auto" musisz dekorować: @pytest.mark.asyncio', 'Wersja 0.21+ wymaga explicit konfiguracji mode'] }
          },
          { cmd: 'pip install pytest-mock', desc: 'Mockowanie z mocker fixture',
            detail: { what: 'Dodaje fixture mocker — wrapper na unittest.mock. Prostsze API niż bezpośredni mock.patch.', how: 'mocker.patch() = context manager mock który automatycznie czyści po teście. Nie musisz pamiętać o stop().', tips: ['mocker.patch("module.function") — podmień funkcję', 'mocker.spy(obj, "method") — obserwuj wywołania bez podmiany', 'mocker.MagicMock() — twórz mock obiekty'] }
          },
          { cmd: 'pip install pytest-cov', desc: 'Pomiar pokrycia kodu',
            detail: { what: 'Integracja coverage.py z pytest. Dodaje flagę --cov do pytest.', how: 'coverage.py mierzy które linie kodu są wykonywane podczas testów.', tips: ['Zawsze instaluj razem: pip install pytest pytest-cov', 'Konfiguracja w pyproject.toml: [tool.coverage.run]'] }
          },
          { cmd: 'pip install pytest-xdist', desc: 'Równoległe wykonywanie testów',
            detail: { what: 'Uruchamia testy na wielu CPU równolegle. Drastycznie przyspiesza duże zestawy testów.', how: 'Dzieli testy między wątki/procesy. Każdy worker dostaje podzbiór testów.', flags: [{flag: '-n auto', desc: 'Tyle workerów ile CPU'}, {flag: '-n 4', desc: '4 równoległe workery'}, {flag: '-n 0', desc: 'Wyłącz (serial)'}], tips: ['pytest -n auto — automatyczna liczba workerów', 'Fixtures z scope=session mogą mieć problemy z xdist', 'Nie używaj gdy testy mają shared state'] }
          },
          { cmd: 'pip install freezegun', desc: 'Mockowanie daty i czasu',
            detail: { what: 'Podmienia datetime.now(), date.today(), time.time() na kontrolowaną wartość. Testuj kod zależny od czasu bez czekania.', how: '@freeze_time("2024-01-15") dekorator lub context manager. Podmienia we wszystkich modułach jednocześnie.', tips: ['@freeze_time("2024-01-15 12:00:00") — konkretna data i czas', 'with freeze_time("2024-01-01"): — context manager', 'Działa też na asyncio i threading'] }
          },
          { cmd: 'pip install responses', desc: 'Mockowanie HTTP requests',
            detail: { what: 'Przechwytuje wywołania requests.get/post itp. i zwraca zdefiniowane odpowiedzi. Testy bez prawdziwego HTTP.', how: '@responses.activate dekorator + responses.add() definiuje mock response. Wszystkie niezdefinowane requesty rzucają ConnectionError.', tips: ['Lepsze niż monkeypatch dla requests', 'responses.calls — sprawdź ile razy wywołano endpoint', 'Dla httpx: pip install respx (analogiczne API)'] }
          },
        ]
      },
      {
        category: 'Debugowanie testów',
        icon: '🐛',
        items: [
          { cmd: 'pytest -s', desc: 'Pokaż print() output podczas testów',
            detail: { what: 'pytest domyślnie przechwytuje stdout (ukrywa print()). -s = --capture=no, wyłącza przechwytywanie.', how: 'Bez -s: print() w testach jest ukryte (tylko przy błędzie). Z -s: widzisz wszystkie print() na bieżąco.', tips: ['pytest -vs — verbose + stdout (najczęstsze combo przy debugowaniu)', 'Alternatywa: użyj capfd fixture zamiast print()'] }
          },
          { cmd: 'pytest --pdb', desc: 'Wejdź w debugger przy pierwszym błędzie',
            detail: { what: 'Przy padnięciu testu automatycznie otwiera Python debugger (pdb). Możesz interaktywnie sprawdzić zmienne, wywołać funkcje.', how: 'pdb uruchamia się w miejscu gdzie test padł. Masz dostęp do wszystkich lokalnych zmiennych.', tips: ['n = next line, s = step into, c = continue, q = quit', 'p zmienna — wypisz wartość', '--pdb --pdbcls=IPython.core.debugger:Pdb — IPython debugger (ładniejszy)'] }
          },
          { cmd: 'pytest -v --tb=long 2>&1 | head -100', desc: 'Ogranicz output do pierwszych 100 linii',
            detail: { what: 'Przy wielu błędach output może być ogromny. Pipe do head ogranicza wyświetlane linie.', how: '2>&1 = przekieruj stderr do stdout. head -100 = pokaż pierwsze 100 linii.', tips: ['Przydatne gdy masz setki testów i wiele błędów', 'Alternatywa: pytest -x — zatrzymaj przy pierwszym błędzie'] }
          },
          { cmd: 'pytest --co', desc: 'Pokaż jakie testy zostaną uruchomione (bez uruchamiania)',
            detail: { what: '--co = --collect-only. Wyświetla listę wszystkich testów które zostaną znalezione i uruchomione. Bez faktycznego uruchamiania.', how: 'pytest zbiera testy, wypisuje ich nazwy i kończy. Zero wykonania.', tips: ['Sprawdź przed uruchomieniem czy -k filtruje właściwie', 'pytest --co -q — lista bez verbose', 'Zobaczysz hierarchię: plik → klasa → funkcja'] }
          },
        ]
      }
    ]
  }
};
