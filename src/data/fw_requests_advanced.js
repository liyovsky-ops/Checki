// Advanced patterns: routing + state
export default {
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
    ]
};
