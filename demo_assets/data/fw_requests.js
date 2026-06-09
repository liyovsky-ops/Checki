const FW_REQUESTS_DATA = {
  meta: {
    id: 'requests', name: 'requests', icon: '🌐', color: '#2C3E50', color2: '#E74C3C',
    tagline: 'HTTP dla ludzi — najpopularniejsza biblioteka Python',
    year: 2011, author: 'Kenneth Reitz', lang: 'Python 3.7+',
    github: 'psf/requests', stars: '52k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Metody HTTP' },
    { id: 'hooki',      label: 'Sesje' },
    { id: 'routing',    label: 'Auth & Headers' },
    { id: 'state',      label: 'Zaawansowane' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Rozszerzenia' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać requests?',
        firstComponent: 'Pierwszy request',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest requests?',
        desc: 'requests to najpopularniejsza biblioteka Python do wykonywania zapytań HTTP. "HTTP dla ludzi" — proste API, czytelny kod, automatyczna obsługa JSON, cookies, sesji i autoryzacji. Podstawa każdego projektu scrapingu i automatyzacji w Pythonie. Pobierana ponad 300 milionów razy miesięcznie.',
      },
      concepts: [
        {
          title: 'Response Object',
          desc: 'Każde zapytanie zwraca obiekt Response z: status_code, text, json(), headers, cookies, content (bytes). Jeden obiekt = wszystko o odpowiedzi.',
          icon: '📦'
        },
        {
          title: 'Session',
          desc: 'Session przechowuje ustawienia między requestami: cookies, headers, auth. Wielokrotnie szybsza niż osobne requesty — reużywa połączenia TCP.',
          icon: '🔗'
        },
        {
          title: 'Timeout',
          desc: 'ZAWSZE ustawiaj timeout. Bez niego request może czekać w nieskończoność i zamrozić skrypt. timeout=(connect, read) — osobno dla połączenia i odczytu.',
          icon: '⏱️'
        },
        {
          title: 'Raise for Status',
          desc: 'response.raise_for_status() rzuca wyjątek przy błędzie HTTP (4xx, 5xx). Krótszy i bezpieczniejszy niż ręczne sprawdzanie status_code.',
          icon: '🔴'
        }
      ],
      whenToUse: [
        'Scraping stron — pobieranie HTML do parsowania przez BeautifulSoup',
        'Komunikacja z REST API — pobieranie i wysyłanie danych',
        'Automatyzacja — login, wypełnianie formularzy, pobieranie plików',
        'Monitoring — sprawdzanie czy serwis działa',
        'Integracja z zewnętrznymi serwisami (Slack, GitHub, webhooks)'
      ],
      firstComponent: `import requests

# Najprostsze GET
response = requests.get("https://api.github.com/users/tiangolo")

# Sprawdź status
print(response.status_code)  # 200

# JSON automatycznie
user = response.json()
print(user["name"])       # Sebastián Ramírez
print(user["public_repos"])

# ZAWSZE ustawiaj timeout!
response = requests.get("https://api.github.com", timeout=10)`
    },

    komponenty: [
      {
        title: 'GET — pobieranie danych',
        desc: 'Podstawowa metoda HTTP. params= automatycznie enkoduje parametry query string. Nie musisz ręcznie budować URL.',
        code: `import requests

# Prosty GET
response = requests.get("https://httpbin.org/get")

# Z parametrami query string
# Automatycznie buduje: /search?q=python&page=2&per_page=10
response = requests.get(
    "https://api.github.com/search/repositories",
    params={"q": "python", "page": 2, "per_page": 10},
    timeout=10
)

data = response.json()
print(f"Status: {response.status_code}")
print(f"Znaleziono: {data['total_count']} repozytoriów")`
      },
      {
        title: 'POST — wysyłanie danych',
        desc: 'POST do wysyłania danych. json= automatycznie serializuje dict i ustawia Content-Type: application/json. data= dla form data.',
        code: `import requests

# POST JSON (API)
response = requests.post(
    "https://httpbin.org/post",
    json={"username": "test", "action": "scrape"},  # auto Content-Type JSON
    timeout=10
)

# POST form data (formularz HTML)
response = requests.post(
    "https://example.com/login",
    data={"username": "user", "password": "pass"},  # form-encoded
    timeout=10
)

# POST z plikiem
with open("data.csv", "rb") as f:
    response = requests.post(
        "https://api.example.com/upload",
        files={"file": ("data.csv", f, "text/csv")},
        timeout=30
    )`
      },
      {
        title: 'PUT, PATCH, DELETE',
        desc: 'Pełne CRUD przez HTTP. PUT = zastąp zasób, PATCH = aktualizuj częściowo, DELETE = usuń.',
        code: `import requests

BASE = "https://api.example.com"

# PUT — zastąp cały zasób
response = requests.put(
    f"{BASE}/users/42",
    json={"name": "Alice", "email": "alice@test.com"},
    timeout=10
)

# PATCH — aktualizuj częściowo
response = requests.patch(
    f"{BASE}/users/42",
    json={"email": "new@email.com"},  # tylko email
    timeout=10
)

# DELETE
response = requests.delete(f"{BASE}/users/42", timeout=10)
print(response.status_code)  # 204 No Content`
      },
      {
        title: 'Response — odczytywanie odpowiedzi',
        desc: 'Obiekt Response zawiera wszystko o odpowiedzi. Zawsze sprawdzaj status przed odczytem danych.',
        code: `import requests

response = requests.get("https://api.github.com/users/torvalds", timeout=10)

# Status code
print(response.status_code)       # 200
print(response.ok)                 # True jeśli 200-299

# Rzuć wyjątek dla 4xx/5xx — ZALECANE
response.raise_for_status()

# Treść odpowiedzi
print(response.text)               # string (HTML, JSON jako string)
print(response.json())             # dict (automatyczny parse JSON)
print(response.content)            # bytes (obrazy, PDF)

# Metadane
print(response.headers["Content-Type"])
print(response.url)                # finalny URL (po redirectach)
print(response.elapsed)            # czas odpowiedzi
print(response.history)            # lista redirectów`
      },
      {
        title: 'Obsługa błędów — exceptions',
        desc: 'Zawsze opakowuj requesty w try/except. requests może rzucić wyjątek przy problemach z siecią, timeout lub złym URL.',
        code: `import requests
from requests.exceptions import (
    Timeout, ConnectionError, HTTPError, RequestException
)

def safe_get(url, timeout=10):
    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()  # rzuć dla 4xx, 5xx
        return response.json()

    except Timeout:
        print(f"Timeout po {timeout}s: {url}")
    except ConnectionError:
        print(f"Nie można połączyć: {url}")
    except HTTPError as e:
        print(f"HTTP błąd {e.response.status_code}: {url}")
    except RequestException as e:
        print(f"Nieznany błąd: {e}")

    return None`
      },
      {
        title: 'Pobieranie plików — streaming',
        desc: 'Duże pliki pobieraj przez streaming — nie ładuj całości do pamięci. stream=True + iter_content() = pobieranie chunkami.',
        code: `import requests

def download_file(url, output_path):
    response = requests.get(url, stream=True, timeout=30)
    response.raise_for_status()

    total = int(response.headers.get("content-length", 0))
    downloaded = 0

    with open(output_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                print(f"\\r{downloaded}/{total} bytes", end="")

    print(f"\\n✅ Pobrano: {output_path}")

download_file("https://example.com/large_file.zip", "file.zip")`
      }
    ],

    hooki: [
      {
        name: 'Session — reużywanie połączeń',
        desc: 'Session utrzymuje połączenie TCP między requestami (keep-alive). Reużywa cookies i headers. Znacznie szybszy przy wielu requestach do tego samego hosta.',
        when: 'Wiele requestów do jednego API, scraping z logowaniem, wszelka automatyzacja',
        code: `import requests

# BEZ Session — nowe połączenie TCP każdy request
# requests.get(url1)
# requests.get(url2)  # nowe połączenie!

# Z Session — jedno połączenie TCP
with requests.Session() as session:
    # Ustaw raz dla wszystkich requestów
    session.headers.update({
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "pl-PL"
    })

    # Wszystkie requesty reużywają połączenie
    r1 = session.get("https://api.example.com/page/1")
    r2 = session.get("https://api.example.com/page/2")
    r3 = session.get("https://api.example.com/page/3")
# Session automatycznie zamknięta przez with`
      },
      {
        name: 'Session z logowaniem',
        desc: 'Zaloguj się przez Session — cookies są automatycznie przechowywane i wysyłane w kolejnych requestach. Idealne do scrapowania stron za loginem.',
        when: 'Scraping za loginem, automatyzacja formularzy, utrzymywanie sesji użytkownika',
        code: `import requests

with requests.Session() as session:
    # Krok 1: Zaloguj się
    login_response = session.post(
        "https://example.com/login",
        data={"email": "user@test.com", "password": "secret"},
        timeout=10
    )
    login_response.raise_for_status()

    # Session automatycznie zapisała cookies z logowania!
    print("Cookies:", session.cookies.get_dict())

    # Krok 2: Pobierz chronione zasoby
    # Cookies są automatycznie wysyłane
    dashboard = session.get("https://example.com/dashboard", timeout=10)
    data = session.get("https://example.com/api/my-data", timeout=10)

    print(data.json())`
      },
      {
        name: 'Session z retry — automatyczne ponawianie',
        desc: 'HTTPAdapter z Retry automatycznie ponawia request przy błędach sieci lub 5xx. Kluczowe w produkcyjnym scrapingu.',
        when: 'Produkcyjny scraping, niestabilne API, długo działające skrypty automatyzacji',
        code: `import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_resilient_session():
    session = requests.Session()

    retry = Retry(
        total=3,           # max 3 próby
        backoff_factor=1,  # czekaj 1s, 2s, 4s między próbami
        status_forcelist=[429, 500, 502, 503, 504],  # retry przy tych kodach
    )

    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)

    return session

with create_resilient_session() as session:
    response = session.get("https://api.example.com/data", timeout=10)
    # Automatycznie ponowi jeśli dostanie 503!`
      },
      {
        name: 'Cookies — zarządzanie',
        desc: 'requests automatycznie obsługuje cookies. Możesz je ręcznie ustawiać, odczytywać i zapisywać między sesjami.',
        when: 'Scraping za loginem, bypass CSRF, utrzymywanie stanu sesji między uruchomieniami',
        code: `import requests, json

with requests.Session() as session:
    # Ręczne ustawienie cookie
    session.cookies.set("session_id", "abc123", domain="example.com")

    # Odczytaj cookies po requeście
    session.get("https://example.com/login", timeout=10)
    cookies_dict = session.cookies.get_dict()
    print(cookies_dict)

    # Zapisz cookies do pliku (między uruchomieniami)
    with open("cookies.json", "w") as f:
        json.dump(cookies_dict, f)

# Wczytaj cookies w następnym uruchomieniu
with requests.Session() as session:
    with open("cookies.json") as f:
        cookies = json.load(f)
    session.cookies.update(cookies)`
      },
      {
        name: 'Hooks — interceptory requestów',
        desc: 'response hooks = funkcje wywoływane po każdym requeście. Do logowania, retry logic, transformacji odpowiedzi.',
        when: 'Logowanie wszystkich requestów, auto-refresh tokenu, monitoring czasu odpowiedzi',
        code: `import requests, time

def log_response(response, *args, **kwargs):
    print(f"{response.request.method} {response.url}")
    print(f"→ {response.status_code} ({response.elapsed.total_seconds():.2f}s)")

def auto_raise(response, *args, **kwargs):
    response.raise_for_status()

with requests.Session() as session:
    # Dodaj hooki — wywoływane po każdym requeście
    session.hooks["response"].append(log_response)
    session.hooks["response"].append(auto_raise)

    # Każdy request automatycznie loguje i rzuca przy błędzie
    session.get("https://api.example.com/data", timeout=10)`
      },
      {
        name: 'Rate limiting — nie banuj się',
        desc: 'Przy scrapingu zawsze kontroluj częstotliwość requestów. Zbyt szybko = IP ban. time.sleep() lub biblioteka ratelimit.',
        when: 'Scraping publicznych stron, API z limitami, produkcyjna automatyzacja',
        code: `import requests, time, random

def polite_scraper(urls, delay=1.0, jitter=0.5):
    """Scraper który nie dostanie bana."""
    with requests.Session() as session:
        session.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0)"

        for url in urls:
            try:
                response = session.get(url, timeout=10)
                response.raise_for_status()
                yield url, response.text

            except Exception as e:
                print(f"Błąd {url}: {e}")

            finally:
                # Czekaj między requestami (+ losowy jitter)
                sleep_time = delay + random.uniform(0, jitter)
                time.sleep(sleep_time)

for url, html in polite_scraper(["https://a.com", "https://b.com"]):
    print(f"✓ {url}: {len(html)} chars")`
      }
    ],

    routing: {
      install: 'pip install requests',
      version: 'requests 2.31+',
      sections: [
        {
          title: 'Headers — nagłówki requestu',
          code: `import requests

# Globalne headers dla session
with requests.Session() as session:
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
        "Accept": "application/json",
        "Accept-Language": "pl-PL,pl;q=0.9",
        "Referer": "https://google.com",
    })

    # Nadpisz header dla konkretnego requestu
    response = session.get(
        "https://api.example.com/data",
        headers={"Authorization": "Bearer TOKEN"},
        timeout=10
    )

# Sprawdź nagłówki odpowiedzi
print(response.headers["Content-Type"])
print(response.headers.get("X-Rate-Limit-Remaining", "brak"))`
        },
        {
          title: 'Autoryzacja — Basic, Bearer, API Key',
          code: `import requests
from requests.auth import HTTPBasicAuth, HTTPDigestAuth

# Basic Auth
response = requests.get(
    "https://api.example.com/data",
    auth=HTTPBasicAuth("username", "password"),
    timeout=10
)
# Lub skrót:
response = requests.get(url, auth=("username", "password"), timeout=10)

# Bearer Token (JWT, OAuth)
headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9..."}
response = requests.get(url, headers=headers, timeout=10)

# API Key w nagłówku
headers = {"X-API-Key": "your-api-key-here"}
response = requests.get(url, headers=headers, timeout=10)

# API Key w query param
response = requests.get(url, params={"api_key": "KEY"}, timeout=10)`
        },
        {
          title: 'Proxies — routing przez proxy',
          code: `import requests

proxies = {
    "http": "http://proxy.example.com:8080",
    "https": "http://proxy.example.com:8080",
}

response = requests.get(
    "https://example.com",
    proxies=proxies,
    timeout=10
)

# SOCKS proxy (pip install requests[socks])
proxies = {
    "http": "socks5://user:pass@proxy:1080",
    "https": "socks5://user:pass@proxy:1080",
}

# Dla Session
with requests.Session() as session:
    session.proxies.update(proxies)
    response = session.get("https://example.com")`
        },
        {
          title: 'SSL — weryfikacja certyfikatów',
          code: `import requests

# Domyślnie — weryfikacja SSL włączona
response = requests.get("https://secure.example.com", timeout=10)

# Wyłącz weryfikację (DEV ONLY — nigdy w produkcji!)
response = requests.get(
    "https://self-signed.example.com",
    verify=False,          # ⚠️ niebezpieczne
    timeout=10
)
# Wycisz warning:
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Własny certyfikat CA
response = requests.get(
    "https://internal.company.com",
    verify="/path/to/ca-bundle.crt",
    timeout=10
)

# Certyfikat klienta (mTLS)
response = requests.get(url, cert=("client.crt", "client.key"))`
        },
        {
          title: 'Timeouts — zawsze ustawiaj',
          code: `import requests

# ❌ BEZ TIMEOUTU — może czekać w nieskończoność!
# response = requests.get(url)

# ✅ Zawsze podaj timeout
response = requests.get(url, timeout=10)  # 10s dla wszystkiego

# Rozdziel timeout na connect i read
response = requests.get(
    url,
    timeout=(5, 30)  # 5s połączenie, 30s odczyt
)
# Dla dużych plików: timeout=(5, None) — bez limitu odczytu

# Domyślny timeout dla całej sesji
with requests.Session() as session:
    session.request = lambda *a, **kw: (
        kw.setdefault("timeout", 10),
        super(requests.Session, session).request(*a, **kw)
    )[1]`
        },
        {
          title: 'Redirecty — kontrola przekierowań',
          code: `import requests

# Domyślnie requests podąża za redirectami (max 30)
response = requests.get("https://httpbin.org/redirect/3", timeout=10)
print(response.url)        # finalny URL
print(response.history)    # lista Response z redirectami

# Wyłącz podążanie za redirectami
response = requests.get(
    "https://httpbin.org/redirect/1",
    allow_redirects=False,
    timeout=10
)
print(response.status_code)  # 301 lub 302
print(response.headers["Location"])  # dokąd redirect`
        }
      ]
    },

    state: [
      {
        name: 'Scraping z User-Agent rotation',
        icon: '🔄',
        color: '#2C3E50',
        complexity: 'Średnia',
        bundle: 'requests + fake-useragent',
        when: 'Produkcyjny scraping gdzie chcesz unikać wykrycia bota',
        code: `from fake_useragent import UserAgent
import requests, random, time

ua = UserAgent()

def random_session():
    session = requests.Session()
    session.headers["User-Agent"] = ua.random
    return session

urls = ["https://example.com/page/1", "https://example.com/page/2"]

for url in urls:
    with random_session() as s:
        response = s.get(url, timeout=10)
        print(f"{s.headers['User-Agent'][:50]}...")
    time.sleep(random.uniform(1, 3))  # losowy delay`
      },
      {
        name: 'Concurrent requests — ThreadPoolExecutor',
        icon: '⚡',
        color: '#E74C3C',
        complexity: 'Średnia',
        bundle: 'concurrent.futures',
        when: 'Pobieranie wielu URLi jednocześnie przez wątki (requests jest sync)',
        code: `import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

def fetch(url):
    try:
        r = requests.get(url, timeout=10)
        return url, r.status_code, len(r.content)
    except Exception as e:
        return url, None, str(e)

urls = [f"https://httpbin.org/get?n={i}" for i in range(10)]

with ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(fetch, url): url for url in urls}

    for future in as_completed(futures):
        url, status, size = future.result()
        print(f"{status} | {size} bytes | {url}")`
      },
      {
        name: 'Requests + BeautifulSoup pipeline',
        icon: '🍲',
        color: '#27AE60',
        complexity: 'Niska',
        bundle: 'requests + bs4',
        when: 'Klasyczny pipeline scrapingu: requests pobiera HTML, BeautifulSoup parsuje',
        code: `import requests
from bs4 import BeautifulSoup

def scrape_links(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("http"):
            links.append({"text": a.text.strip(), "url": href})

    return links

results = scrape_links("https://python.org")
for link in results[:5]:
    print(f"{link['text']}: {link['url']}")`
      },
      {
        name: 'Requests + FastAPI webhook',
        icon: '🔔',
        color: '#9B59B6',
        complexity: 'Niska',
        bundle: 'requests',
        when: 'Wysyłanie wyników automatyzacji do FastAPI, Slack, Discord, Telegram',
        code: `import requests

def send_to_slack(message: str, webhook_url: str):
    payload = {
        "text": message,
        "username": "Automation Bot",
        "icon_emoji": ":robot_face:"
    }
    response = requests.post(webhook_url, json=payload, timeout=10)
    response.raise_for_status()
    return response.status_code

def notify_fastapi(data: dict, api_url: str, api_key: str):
    response = requests.post(
        f"{api_url}/webhook/results",
        json=data,
        headers={"X-API-Key": api_key},
        timeout=10
    )
    response.raise_for_status()
    return response.json()`
      },
      {
        name: 'HTTP caching — nie scrape tego samego',
        icon: '💾',
        color: '#F39C12',
        complexity: 'Niska',
        bundle: 'requests-cache',
        when: 'Podczas developmentu — cache odpowiedzi żeby nie bombardować serwisów',
        code: `import requests_cache
# pip install requests-cache

# Zainstaluj globalny cache (SQLite)
requests_cache.install_cache(
    "scraping_cache",
    expire_after=3600  # cache 1h
)

import requests

# Pierwszy request — prawdziwy HTTP
r = requests.get("https://api.github.com/users/torvalds", timeout=10)
print(r.from_cache)  # False

# Drugi request — z cache (natychmiastowy!)
r = requests.get("https://api.github.com/users/torvalds", timeout=10)
print(r.from_cache)  # True

# Wyczyść cache
requests_cache.clear()`
      },
      {
        name: 'GraphQL przez requests',
        icon: '🔷',
        color: '#E10098',
        complexity: 'Niska',
        bundle: 'requests',
        when: 'API które używa GraphQL zamiast REST — GitHub API v4, Shopify, wiele nowoczesnych API',
        code: `import requests

def graphql_query(endpoint, query, variables=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    payload = {"query": query, "variables": variables or {}}
    response = requests.post(endpoint, json=payload, headers=headers, timeout=10)
    response.raise_for_status()

    result = response.json()
    if "errors" in result:
        raise Exception(result["errors"])
    return result["data"]

# GitHub GraphQL API
query = """
query($login: String!) {
  user(login: $login) {
    name
    repositories { totalCount }
  }
}
"""
data = graphql_query(
    "https://api.github.com/graphql",
    query,
    variables={"login": "torvalds"},
    token="YOUR_GITHUB_TOKEN"
)`
      }
    ],

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
    ],

    komendy: [
      {
        category: 'Instalacja',
        icon: '📦',
        items: [
          { cmd: 'pip install requests', desc: 'Zainstaluj requests',
            detail: { what: 'Instaluje bibliotekę requests. To jedyna zależność potrzebna do większości przypadków użycia.', how: 'requests ma minimalne zależności: urllib3, certifi, charset-normalizer, idna.', tips: ['pip install requests[security] — dodaje PyOpenSSL, cryptography', 'pip install requests[socks] — obsługa SOCKS proxy', 'Sprawdź wersję: pip show requests'] }
          },
          { cmd: 'pip install requests httpx', desc: 'requests + async httpx',
            detail: { what: 'Instaluje oba: requests dla kodu sync, httpx dla async. httpx ma identyczne API — łatwa migracja.', how: 'Dobra praktyka: requests w skryptach sync, httpx w FastAPI i asyncio.', tips: ['httpx.Client() ≈ requests.Session()', 'httpx.AsyncClient() = async version', 'Migracja z requests: zamień requests.get na client.get'] }
          },
          { cmd: 'pip install requests-cache', desc: 'Cache HTTP requestów',
            detail: { what: 'Automatycznie cache\'uje odpowiedzi HTTP. Podczas developmentu nie musisz bombardować API — drugie zapytanie odpowie z cache natychmiast.', how: 'requests_cache.install_cache() podmienia transport requests. Przezroczyste — nie zmienisz kodu requestów.', tips: ['requests_cache.install_cache("dev_cache", expire_after=3600)', 'Przydatne: scraping podczas developmentu — nie trafiasz na rate limit', 'requests_cache.clear() — wyczyść cache'] }
          },
          { cmd: 'pip install fake-useragent', desc: 'Losowe User-Agent do scrapingu',
            detail: { what: 'Biblioteka z bazą prawdziwych User-Agent stringów. Rotuj UA przy każdym requeście żeby wyglądać jak prawdziwy użytkownik.', how: 'UserAgent().random = losowy UA z bazy. Aktualizuje bazę online.', tips: ['from fake_useragent import UserAgent; ua = UserAgent()', 'session.headers["User-Agent"] = ua.random', 'ua.chrome, ua.firefox — konkretna przeglądarka'] }
          },
        ]
      },
      {
        category: 'Podstawowe HTTP',
        icon: '🌐',
        items: [
          { cmd: 'requests.get(url)', desc: 'GET request — pobierz dane',
            detail: { what: 'Wysyła HTTP GET. Zwraca Response object. Najczęstsza metoda — pobieranie danych z API i stron.', how: 'r = requests.get(url). Zawsze sprawdź r.status_code lub wywołaj r.raise_for_status().', flags: [{flag: 'params={"key": "val"}', desc: 'Query string: ?key=val'}, {flag: 'headers={"Authorization": "Bearer TOKEN"}', desc: 'Nagłówki requestu'}, {flag: 'timeout=5', desc: 'Timeout w sekundach'}, {flag: 'verify=False', desc: 'Pomiń SSL (nie w prod)'}], tips: ['r.json() — parsuj JSON odpowiedzi', 'r.status_code == 200 — sprawdź sukces', 'Zawsze ustawiaj timeout= — bez tego wisząca sesja zawiesi skrypt'] }
          },
          { cmd: 'requests.post(url, json=data)', desc: 'POST request — wyślij dane JSON',
            detail: { what: 'Wysyła HTTP POST z body jako JSON. json= automatycznie serializuje dict i ustawia Content-Type: application/json.', how: 'data = {"name": "Jan", "age": 30}. r = requests.post(url, json=data).', flags: [{flag: 'json=dict', desc: 'Body jako JSON (auto Content-Type)'}, {flag: 'data=dict', desc: 'Body jako form-data (application/x-www-form-urlencoded)'}, {flag: 'files={"file": open("plik.pdf","rb")}', desc: 'Upload pliku (multipart/form-data)'}], tips: ['json= dla REST API, data= dla formularzy HTML', 'r.json() — odpowiedź serwera jako dict', 'requests.post(url, data=json.dumps(d), headers={"Content-Type":"application/json"}) = to samo co json=d'] }
          },
          { cmd: 'requests.put(url, json=data)', desc: 'PUT / PATCH — aktualizuj zasób',
            detail: { what: 'PUT = zamień cały zasób. PATCH = aktualizuj część zasobu.', how: 'r = requests.put(url, json=data) lub requests.patch(url, json={"field": "value"})', tips: ['REST: PUT /users/5 zastępuje użytkownika, PATCH /users/5 aktualizuje pola', 'Oba zwracają Response jak GET i POST'] }
          },
          { cmd: 'requests.delete(url)', desc: 'DELETE request — usuń zasób',
            detail: { what: 'Wysyła HTTP DELETE. REST API: usuwa zasób pod danym URL.', how: 'r = requests.delete(url). Często z nagłówkiem Authorization.', tips: ['r.status_code == 204 = sukces bez treści (no content)', 'Dodaj headers={"Authorization": "Bearer TOKEN"} dla chronionych endpointów'] }
          },
        ]
      },
      {
        category: 'Session i nagłówki',
        icon: '🔐',
        items: [
          { cmd: 'session = requests.Session()', desc: 'Sesja z persystentnym stanem (cookies, headers)',
            detail: { what: 'Session ponownie używa połączeń TCP i zachowuje cookies między requestami. Szybsza niż pojedyncze wywołania i utrzymuje login.', how: 'session = requests.Session(). Używaj jak requests: session.get(url), session.post(url, json=d).', tips: ['session.headers.update({"Authorization": "Bearer TOKEN"}) — raz, działa wszędzie', 'with requests.Session() as s: — automatyczne zamknięcie', 'session.cookies — dostęp do cookies sesji'] }
          },
          { cmd: 'headers = {"Authorization": "Bearer TOKEN"}', desc: 'Nagłówek autoryzacji Bearer',
            detail: { what: 'Najpopularniejszy sposób auth w REST API. Token JWT lub API key przekazywany w każdym requeście.', how: 'requests.get(url, headers=headers) lub session.headers.update(headers)', flags: [{flag: '"Authorization": "Bearer TOKEN"', desc: 'JWT / OAuth token'}, {flag: '"Authorization": "Basic BASE64"', desc: 'Basic auth (user:pass base64)'}, {flag: '"X-API-Key": "klucz"', desc: 'API key w custom nagłówku'}, {flag: '"Content-Type": "application/json"', desc: 'Typ treści (auto przy json=)'}], tips: ['requests.get(url, auth=("user", "pass")) — Basic auth automatycznie', 'Nie hardkoduj tokenów — ładuj z os.environ'] }
          },
          { cmd: 'r = requests.get(url, timeout=(3, 10))', desc: 'Timeout połączenia i odczytu',
            detail: { what: '(connect_timeout, read_timeout). 3s na nawiązanie połączenia, 10s na odpowiedź. Bez timeout skrypt może wisieć w nieskończoność.', how: 'timeout=5 = 5s na całość. timeout=(3,10) = osobne czasy.', tips: ['ZAWSZE ustawiaj timeout w produkcji', 'requests.exceptions.Timeout — wyjątek gdy przekroczony', 'Typowe wartości: connect=3, read=30 dla API, read=60 dla dużych plików'] }
          },
        ]
      },
      {
        category: 'Odpowiedzi i błędy',
        icon: '📨',
        items: [
          { cmd: 'r.raise_for_status()', desc: 'Rzuć wyjątek dla błędów HTTP (4xx/5xx)',
            detail: { what: 'Rzuca requests.exceptions.HTTPError gdy status code to błąd. Czysta obsługa bez if r.status_code != 200.', how: 'r = requests.get(url); r.raise_for_status() — po tej linii wiesz że status jest OK.', tips: ['try: r.raise_for_status() except requests.HTTPError as e: print(e.response.status_code)', 'r.ok — True gdy status_code < 400 (prostsze niż raise_for_status dla warunkowej logiki)'] }
          },
          { cmd: 'data = r.json()', desc: 'Parsuj JSON odpowiedzi',
            detail: { what: 'Deserializuje JSON z odpowiedzi. Rzuca json.JSONDecodeError gdy odpowiedź nie jest JSON.', how: 'r = requests.get(url); data = r.json(). Działa dla list i obiektów.', flags: [{flag: 'r.text', desc: 'Treść jako string'}, {flag: 'r.content', desc: 'Treść jako bytes (obrazki, pliki)'}, {flag: 'r.json()', desc: 'Treść jako Python dict/list'}, {flag: 'r.status_code', desc: 'Kod HTTP (200, 404, ...)'}, {flag: 'r.headers', desc: 'Nagłówki odpowiedzi jako dict'}], tips: ['r.encoding — encoding odpowiedzi (auto-wykryty)', 'Sprawdź r.headers["Content-Type"] przed r.json()'] }
          },
          { cmd: 'except requests.exceptions.RequestException as e:', desc: 'Złap wszystkie błędy requests',
            detail: { what: 'RequestException to bazowy wyjątek dla wszystkich błędów requests. Złap na końcu po bardziej szczegółowych.', how: 'Hierarchia: ConnectionError → Timeout, HTTPError → wszystkie pod RequestException.', flags: [{flag: 'requests.exceptions.Timeout', desc: 'Przekroczono timeout'}, {flag: 'requests.exceptions.ConnectionError', desc: 'Brak połączenia z serwerem'}, {flag: 'requests.exceptions.HTTPError', desc: 'Błąd HTTP (4xx/5xx) po raise_for_status'}, {flag: 'requests.exceptions.RequestException', desc: 'Bazowy — łapie wszystko'}], tips: ['Zawsze obsłuż co najmniej Timeout i ConnectionError', 'e.response.status_code — kod gdy HTTPError'] }
          },
        ]
      },
      {
        category: 'Testowanie requestów',
        icon: '🧪',
        items: [
          { cmd: 'pip install responses', desc: 'Mock HTTP requestów w testach',
            detail: { what: 'Przechwytuje calls do requests i zwraca zdefiniowane odpowiedzi. Testy bez prawdziwego HTTP.', how: '@responses.activate + responses.add() = zamień prawdziwy HTTP na mock.', tips: ['from responses import activate, add, GET', '@activate dekorator lub with RequestsMock() as rsps:', 'responses.calls[0].request — sprawdź co zostało wysłane'] }
          },
          { cmd: 'curl -X GET https://httpbin.org/get', desc: 'Test endpoint przez curl',
            detail: { what: 'httpbin.org to serwis do testowania HTTP. Zwraca echo requestu — headers, params, body. Używaj do sprawdzenia co wysyłasz.', how: 'curl = command-line HTTP klient. Szybkie sprawdzenie bez pisania kodu Python.', flags: [{flag: '-X POST', desc: 'Metoda HTTP'}, {flag: '-H "Authorization: Bearer TOKEN"', desc: 'Nagłówek'}, {flag: '-d \'{"key":"val"}\'', desc: 'Body'}, {flag: '-v', desc: 'Verbose — pokaż headers'}], tips: ['httpbin.org/anything — zwraca wszystko o requeście', 'httpbin.org/delay/2 — opóźnij odpowiedź o 2s (test timeout)', 'httpbin.org/status/404 — zwróć konkretny status code'] }
          },
          { cmd: 'python -m requests --help', desc: 'requests CLI (jeśli zainstalowany)',
            detail: { what: 'Niektóre wersje requests mają CLI do szybkich testów z linii poleceń.', how: 'Alternatywa: użyj httpie (pip install httpie) — czytelniejszy CLI niż curl.', tips: ['pip install httpie — polecana alternatywa', 'http GET https://api.github.com/users/torvalds — httpie', 'http POST https://api.example.com/data key=value — httpie auto JSON'] }
          },
        ]
      },
      {
        category: 'Debugging i monitoring',
        icon: '🔍',
        items: [
          { cmd: 'python -c "import requests; print(requests.__version__)"', desc: 'Sprawdź wersję requests',
            detail: { what: 'Wyświetla zainstalowaną wersję requests. Przydatne przy debugowaniu lub sprawdzeniu czy instalacja się powiodła.', how: '-c "kod" = uruchom jednolinijkowy kod Python.', tips: ['pip show requests — więcej info (wersja, lokalizacja, zależności)', 'pip list | grep requests — lista paczek z "requests" w nazwie'] }
          },
          { cmd: 'pip install logging', desc: 'Loguj szczegóły HTTP (wbudowane)',
            detail: { what: 'requests używa modułu logging. Włącz DEBUG żeby widzieć pełne szczegóły każdego requestu i odpowiedzi.', how: 'logging.basicConfig(level=logging.DEBUG) włącza logi urllib3 (używany przez requests).', tips: ['import logging; logging.basicConfig(level=logging.DEBUG)', 'Zobaczysz: URL, headers requestu, headers odpowiedzi, timing', 'W produkcji wyłącz: logging.getLogger("urllib3").setLevel(logging.WARNING)'] }
          },
          { cmd: 'pip install httpretty', desc: 'Alternatywny mock HTTP do testów',
            detail: { what: 'Alternatywa dla responses — mockuje HTTP na poziomie socket. Działa z requests, urllib, urllib3.', how: '@httpretty.activate + httpretty.register_uri() definiuje mock.', tips: ['Bardziej niski poziom niż responses', 'Działa z dowolną biblioteką HTTP (nie tylko requests)', 'responses jest prostszy dla czystego requests'] }
          },
        ]
      },
      {
        category: 'Produkcja i scraping',
        icon: '🚀',
        items: [
          { cmd: 'pip install requests[socks]', desc: 'Obsługa SOCKS proxy',
            detail: { what: 'Dodaje obsługę SOCKS4/SOCKS5 proxy. Potrzebne do routowania przez Tor, własne proxy, VPN.', how: 'Instaluje PySocks. Używaj: proxies={"https": "socks5://host:port"}.', tips: ['Tor: socks5://127.0.0.1:9050', 'socks5h:// = DNS przez proxy (ważne dla anonimowości)', 'pip install requests[socks] — dodaje PySocks dependency'] }
          },
          { cmd: 'pip install tenacity', desc: 'Retry z backoff — profesjonalna wersja',
            detail: { what: 'Biblioteka do retry logic z dekoratorami. Bardziej elastyczna niż Retry z urllib3.', how: '@retry dekorator z konfiguracją kiedy i jak ponawiać. backoff_factor, stop_after_attempt, retry_if_exception_type.', tips: ['@retry(stop=stop_after_attempt(3), wait=wait_exponential())', 'retry_if_exception_type(requests.exceptions.Timeout)', 'Logowanie prób: before=before_log(logger, logging.DEBUG)'] }
          },
          { cmd: 'pip install ratelimit', desc: 'Rate limiting dekoratorem',
            detail: { what: 'Prosty dekorator @limits do ograniczenia częstotliwości wywołań funkcji. Nie przekroczysz limitu API.', how: '@limits(calls=10, period=60) = max 10 wywołań na 60 sekund. Rzuca RateLimitException gdy przekroczony.', tips: ['from ratelimit import limits, sleep_and_retry', '@sleep_and_retry @limits(calls=5, period=1) — czekaj zamiast rzucać błąd', 'Alternatywa: time.sleep() między requestami (prostsze)'] }
          },
        ]
      }
    ]
  }
};
