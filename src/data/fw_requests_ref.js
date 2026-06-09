// Ecosystem: rywale + pluginy
export default {
rywale: [
      {
        name: 'httpx',
        icon: '⚡',
        color: '#009688',
        tagline: 'Nowoczesny HTTP client — sync i async',
        pros: ['Async natywnie (await client.get())', 'API identyczne z requests', 'HTTP/2 support', 'Timeout domyślnie włączony', 'Używany przez FastAPI TestClient'],
        cons: ['Mniejsza społeczność niż requests', 'Mniej tutoriali', 'Trochę więcej RAM'],
        vsReact: 'httpx to requests z async. Jeśli używasz asyncio lub FastAPI — httpx jest lepszym wyborem. Jeśli piszesz sync kod — requests jest prostszy i szybszy.',
        bestFor: 'Projekty async, FastAPI, kod z asyncio'
      },
      {
        name: 'aiohttp',
        icon: '🌊',
        color: '#2196F3',
        tagline: 'Async HTTP — klient i serwer',
        pros: ['Bardzo szybki async', 'Klient i serwer w jednej paczce', 'Streaming', 'WebSockets'],
        cons: ['Inne API niż requests (nie drop-in)', 'Więcej boilerplate', 'Tylko async'],
        vsReact: 'aiohttp był standardem async zanim pojawił się httpx. Dziś httpx jest łatwiejszy (to samo API co requests). aiohttp wciąż lider w wydajności.',
        bestFor: 'Wysokowydajne serwisy async, WebSocket klienty, gdy potrzeba maksymalnej prędkości'
      },
      {
        name: 'urllib3',
        icon: '🔧',
        color: '#607D8B',
        tagline: 'Niski poziom — requests używa urllib3 pod spodem',
        pros: ['Niski overhead', 'Connection pooling', 'Wbudowany w requests', 'Pełna kontrola'],
        cons: ['Bardziej verbose API', 'Brak auto JSON parse', 'Trudniejszy w użyciu', 'Niższy poziom abstrakcji'],
        vsReact: 'requests używa urllib3 pod spodem. Bezpośrednio urllib3 tylko gdy potrzebujesz maksymalnej kontroli lub minimalizujesz zależności.',
        bestFor: 'Biblioteki które nie chcą zależności od requests, niski overhead'
      },
      {
        name: 'Scrapy',
        icon: '🕷️',
        color: '#60A839',
        tagline: 'Framework do scrapingu — nie biblioteka',
        pros: ['Asynchroniczny scraping out of the box', 'Middleware, pipelines, extensions', 'Throttling, retry, robots.txt', 'Eksport do CSV, JSON, XML'],
        cons: ['Overkill dla prostych przypadków', 'Stroma krzywa uczenia', 'Trudna integracja z asyncio', 'Opinionated architektura'],
        vsReact: 'requests = narzędzie (jedno zapytanie). Scrapy = framework (cały spider). Dla prostego scrapingu requests + BS4. Dla dużego projektu scrapingu z middleware i pipelines — Scrapy.',
        bestFor: 'Duże projekty scrapingu, crawling wielu stron, produkcyjne pipelines'
      },
      {
        name: 'Playwright / Selenium',
        icon: '🎭',
        color: '#45BA4B',
        tagline: 'Browser automation — JavaScript rendering',
        pros: ['Renderuje JavaScript', 'Prawdziwa przeglądarka', 'Obsługa dynamicznych stron (SPA)', 'Screenshots, PDF'],
        cons: ['100x wolniejszy niż requests', 'Duże zasoby (RAM, CPU)', 'Wymaga przeglądarki', 'Trudniejszy w skalowaniu'],
        vsReact: 'requests działa na statycznym HTML (szybki, lekki). Playwright/Selenium uruchamia prawdziwą przeglądarkę (wolniejszy, ale scrape\'uje strony z JS). Użyj requests gdzie możesz.',
        bestFor: 'Strony z dużo JavaScriptem, SPA (React, Vue), gdy requests zwraca pusty HTML'
      },
      {
        name: 'httplib2',
        icon: '📡',
        color: '#9E9E9E',
        tagline: 'HTTP z caching — stara biblioteka',
        pros: ['Wbudowany cache HTTP', 'Obsługuje ETag, Last-Modified', 'Małe zależności'],
        cons: ['Stary, mało aktywny', 'Gorsze API niż requests', 'Mała społeczność', 'Zastąpiony przez requests-cache'],
        vsReact: 'httplib2 to historyczna alternatywa. Dziś requests + requests-cache robi to samo lepiej. Unikaj w nowych projektach.',
        bestFor: 'Legacy projekty które już go używają'
      }
    ],
  pluginy: [
      {
        name: 'responses',
        icon: '🎭',
        color: '#2196F3',
        tagline: 'Mockowanie HTTP w testach — najpopularniejszy',
        install: 'pip install responses',
        use: 'Przechwytuje wywołania requests i zwraca zdefiniowane odpowiedzi. Niezbędny do testowania kodu który robi HTTP bez dostępu do sieci. Integracja z pytest przez dekorator lub context manager.',
        example: `import responses, requests

@responses.activate
def test_github_user():
    responses.add(responses.GET,
        'https://api.github.com/users/octocat',
        json={'login': 'octocat', 'public_repos': 8},
        status=200)
    r = requests.get('https://api.github.com/users/octocat')
    assert r.json()['login'] == 'octocat'
    assert len(responses.calls) == 1`
      },
      {
        name: 'requests-mock',
        icon: '🔧',
        color: '#9C27B0',
        tagline: 'Alternatywne mockowanie — pytest fixture lub adapter',
        install: 'pip install requests-mock',
        use: 'Mockowanie przez pytest fixture lub context manager. Bardziej minimalistyczne niż responses. Dobra alternatywa gdy wolisz fixture-based approach.',
        example: `def test_get_user(requests_mock):
    requests_mock.get(
        'http://api.example.com/users/1',
        json={'id': 1, 'name': 'Jan'})

    import requests
    r = requests.get('http://api.example.com/users/1')
    assert r.json()['name'] == 'Jan'`
      },
      {
        name: 'requests-cache',
        icon: '⚡',
        color: '#FF9800',
        tagline: 'Automatyczne cachowanie odpowiedzi HTTP',
        install: 'pip install requests-cache',
        use: 'Cachuje odpowiedzi na dysku (SQLite) lub Redis. Przydatne przy scrapingu i prototypowaniu — API nie jest wywoływane wielokrotnie. Jeden import — zero zmian w kodzie.',
        example: `import requests_cache
import requests

requests_cache.install_cache(
    'api_cache', expire_after=3600)  # 1 godzina TTL

# Wszystkie requesty są teraz cachowane:
r = requests.get('https://api.example.com/data')
print(r.from_cache)  # True przy kolejnym wywołaniu`
      },
      {
        name: 'requests-toolbelt',
        icon: '🛠️',
        color: '#607D8B',
        tagline: 'Narzędzia do zaawansowanych przypadków',
        install: 'pip install requests-toolbelt',
        use: 'Oficjalne rozszerzenie maintainerów requests. Multipart upload z progress bar, retry adapter, dump request/response do debugowania, threaded downloader.',
        example: `from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Automatyczne retry na błędy połączenia
retry_strategy = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[429, 500, 502, 503, 504]
)
adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("https://", adapter)`
      },
      {
        name: 'requests-oauthlib',
        icon: '🔐',
        color: '#4CAF50',
        tagline: 'OAuth 1.0 i OAuth 2.0',
        install: 'pip install requests-oauthlib',
        use: 'Autoryzacja OAuth dla API (Twitter, GitHub, Google). Automatycznie dodaje i odświeża tokeny. Obsługuje pełny flow OAuth — authorization code, client credentials, refresh.',
        example: `from requests_oauthlib import OAuth2Session

# Client Credentials Flow (API-to-API)
oauth = OAuth2Session(client_id)
token = oauth.fetch_token(
    token_url, client_secret=client_secret)

r = oauth.get('https://api.example.com/resource')`
      },
      {
        name: 'HTTPX',
        icon: '🚀',
        color: '#00BCD4',
        tagline: 'Nowoczesna alternatywa — async + HTTP/2',
        install: 'pip install httpx',
        use: 'API kompatybilne z requests ale z async/await. HTTP/2 support. Jeśli zaczynasz nowy projekt — rozważ httpx zamiast requests. Wymagane do testowania FastAPI przez TestClient.',
        example: `import httpx

# Sync — identyczne API jak requests
r = httpx.get('https://api.example.com')
print(r.json())

# Async
async with httpx.AsyncClient() as client:
    r = await client.get('https://api.example.com')
    print(r.json())`
      },
      {
        name: 'httpretty',
        icon: '🕸️',
        color: '#FF5722',
        tagline: 'Mockowanie na poziomie socket (framework-agnostic)',
        install: 'pip install httpretty',
        use: 'Mockuje HTTP na poziomie socketu — działa z requests, httplib, urllib3, boto i innymi. Gdy biblioteka nie jest oparta na requests, httpretty nadal działa.',
        example: `import httpretty
import requests

httpretty.enable()
httpretty.register_uri(
    httpretty.GET,
    "https://api.example.com/data",
    body='{"status": "ok"}',
    content_type="application/json")

r = requests.get("https://api.example.com/data")
assert r.json() == {"status": "ok"}
httpretty.disable()`
      }
    ]
};
