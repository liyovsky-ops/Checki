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
    ]

  }
};
