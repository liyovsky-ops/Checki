// Ecosystem: rywale + pluginy
export default {
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
    ]
};
