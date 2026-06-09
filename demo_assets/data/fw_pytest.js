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
    ]

  }
};
