// Ecosystem: rywale + pluginy
export default {
rywale: [
      {
        name: 'lxml',
        icon: '⚡',
        color: '#FF9800',
        tagline: 'Szybki parser XML/HTML — niższy poziom niż BS4',
        pros: ['Najszybszy parser Python', 'XPath support', 'Obsługa dużych dokumentów', 'Pełna obsługa XML'],
        cons: ['Bardziej skomplikowane API', 'XPath zamiast CSS selektorów', 'Wymaga instalacji (biblioteka C)', 'Mniej tolerancyjny na złe HTML'],
        vsReact: 'lxml jest szybszy ale trudniejszy. BS4 często używa lxml pod spodem jako parser. Dla prostego scrapingu BS4+lxml = najlepsze combo.',
        bestFor: 'Duże dokumenty XML, gdy wydajność krytyczna, przetwarzanie milionów rekordów'
      },
      {
        name: 'Scrapy',
        icon: '🕷️',
        color: '#60B932',
        tagline: 'Framework do scrapingu — kompletne narzędzie',
        pros: ['Asynchroniczny (szybki)', 'Middleware, pipeline, scheduler', 'Automatyczne throttling', 'Eksport do JSON/CSV/XML', 'Scrapy Cloud deployment'],
        cons: ['Duży overkill dla prostych zadań', 'Stroma krzywa uczenia', 'Własny ekosystem', 'Trudniejszy debugging'],
        vsReact: 'BS4 to biblioteka parsowania, Scrapy to pełny framework. BS4 dla 1-50 stron. Scrapy dla setek tysięcy stron, produkcyjnych crawlerów, złożonych projektów.',
        bestFor: 'Produkcyjne crawlery, duże projekty scrapingowe, dane do ML'
      },
      {
        name: 'Selenium',
        icon: '🤖',
        color: '#43B02A',
        tagline: 'Automatyzacja przeglądarki — strony z JavaScript',
        pros: ['Obsługuje JavaScript (SPA)', 'Klikanie, formularze, interakcja', 'Screenshoty', 'Prawdziwa przeglądarka'],
        cons: ['Bardzo wolny', 'Wymaga WebDrivera', 'Dużo zasobów', 'Łatwy do wykrycia przez anty-bot'],
        vsReact: 'BS4 tylko dla statycznego HTML. Selenium gdy strona wymaga JS, kliknięcia, logowania. BS4 = 10x szybszy gdy HTML jest dostępny bez JS.',
        bestFor: 'Strony SPA, dynamiczny content, formularze, testy E2E'
      },
      {
        name: 'Playwright',
        icon: '🎭',
        color: '#2EAD33',
        tagline: 'Nowoczesna automatyzacja przeglądarki',
        pros: ['Szybszy od Selenium', 'Async natywnie', 'Auto-wait', 'Wszystkie przeglądarki', 'Headless lepszy'],
        cons: ['Też wolny vs BS4', 'Dużo zasobów', 'Overkill dla statycznych stron'],
        vsReact: 'Jak Selenium ale nowoczesny. Jeśli potrzebujesz przeglądarki — Playwright > Selenium. Jeśli nie potrzebujesz JS — BS4 > wszystko.',
        bestFor: 'Dynamiczne strony, testowanie frontendu, nowoczesne SPA'
      },
      {
        name: 'httpx + parsel',
        icon: '🔗',
        color: '#9C27B0',
        tagline: 'Async HTTP + selektory Scrapy (XPath i CSS)',
        pros: ['Async HTTP', 'XPath + CSS selektory', 'Lekki', 'API podobne do Scrapy selectors'],
        cons: ['Mniej popularne', 'Mniejsza społeczność', 'Mniej tutoriali'],
        vsReact: 'parsel to selektory z Scrapy jako osobna biblioteka. Dobra opcja gdy chcesz XPath + async bez pełnego Scrapy i bez BS4.',
        bestFor: 'Async scraping z XPath, gdy chcesz czegoś między BS4 a Scrapy'
      },
    ],
  pluginy: [
      {
        name: 'lxml',
        icon: '⚡',
        color: '#FF9800',
        tagline: 'Najszybszy parser — wymagany w produkcji',
        install: 'pip install lxml',
        use: 'Używany jako parser w BS4. Dramatycznie szybszy niż html.parser. Przy dużych dokumentach lub wielu stronach — zawsze lxml. Instaluj razem z BS4.',
        example: `# Bez lxml (wolno):
soup = BeautifulSoup(html, "html.parser")

# Z lxml (szybko):
soup = BeautifulSoup(html, "lxml")

# Dla XML:
soup = BeautifulSoup(xml, "xml")  # wymaga lxml`
      },
      {
        name: 'requests',
        icon: '🌐',
        color: '#2C3E50',
        tagline: 'HTTP client — pobiera strony dla BS4',
        install: 'pip install requests',
        use: 'BS4 parsuje HTML ale go nie pobiera. requests pobiera. Zawsze razem: requests.get(url).text → BeautifulSoup(). Standardowe combo.',
        example: `import requests
from bs4 import BeautifulSoup

headers = {"User-Agent": "Mozilla/5.0"}
r = requests.get(url, headers=headers, timeout=10)
r.raise_for_status()
soup = BeautifulSoup(r.content, "lxml")`
      },
      {
        name: 'httpx',
        icon: '🚀',
        color: '#00BCD4',
        tagline: 'Async HTTP client — szybki scraping wielu stron',
        install: 'pip install httpx',
        use: 'Async odpowiednik requests. Gdy scrapujesz wiele stron jednocześnie — httpx + asyncio zamiast requests. Kilkukrotnie szybszy przy wielu stronach.',
        example: `import httpx, asyncio
from bs4 import BeautifulSoup

async def scrape_many(urls: list[str]):
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
    return [BeautifulSoup(r.text, "lxml") for r in responses]`
      },
      {
        name: 'charset-normalizer',
        icon: '🔤',
        color: '#607D8B',
        tagline: 'Wykrywanie kodowania — instalowany z requests',
        install: 'pip install charset-normalizer',
        use: 'Wykrywa kodowanie tekstu (UTF-8, ISO-8859-2, Windows-1250). Instalowany automatycznie z requests jako zamiennik chardet. BS4 korzysta z niego przy parsowaniu.',
        example: `from charset_normalizer import from_bytes

result = from_bytes(html_bytes).best()
print(result.encoding)  # "utf-8" / "windows-1250" itp.

# W praktyce BS4 robi to automatycznie:
soup = BeautifulSoup(response.content, "lxml")
print(soup.original_encoding)`
      },
      {
        name: 'pandas',
        icon: '🐼',
        color: '#150458',
        tagline: 'Analiza i eksport danych ze scrapingu',
        install: 'pip install pandas',
        use: 'Gdy zebrane dane chcesz analizować lub eksportować do CSV/Excel. pd.read_html() parsuje tabele HTML bezpośrednio — często szybsze niż ręczny BS4.',
        example: `import pandas as pd
import requests

# Szybkie parsowanie tabeli HTML
url = "https://example.com/tabela"
tabele = pd.read_html(url)  # lista DataFrame z każdej tabeli
df = tabele[0]

# Lub ręcznie zebrane dane
dane = [{"nazwa": n, "cena": c} for n, c in scraped]
df = pd.DataFrame(dane)
df.to_csv("wyniki.csv", index=False, encoding="utf-8-sig")`
      },
      {
        name: 'fake-useragent',
        icon: '🎭',
        color: '#F44336',
        tagline: 'Losowy User-Agent — unikaj blokowania',
        install: 'pip install fake-useragent',
        use: 'Wiele stron blokuje scrapery po User-Agent. fake-useragent losuje realistyczne UA z bazy prawdziwych przeglądarek. Podstawowa ochrona przed prostym blokowaniem.',
        example: `from fake_useragent import UserAgent
import requests

ua = UserAgent()

headers = {"User-Agent": ua.random}
# lub konkretna przeglądarka:
headers = {"User-Agent": ua.chrome}
headers = {"User-Agent": ua.firefox}

r = requests.get(url, headers=headers)`
      },
      {
        name: 'Scrapy',
        icon: '🕷️',
        color: '#60B932',
        tagline: 'Pełny framework scrapingowy — gdy BS4 nie wystarcza',
        install: 'pip install scrapy',
        use: 'Gdy outscrapujesz BS4+requests — Scrapy dla produkcji. Asynchroniczny, z pipeline, middleware, auto-throttling, retry, eksport. BS4 może być parserem w Scrapy.',
        example: `# BS4 jako parser w Scrapy Spider
from scrapy import Spider
from bs4 import BeautifulSoup

class ProductSpider(Spider):
    name = "products"
    start_urls = ["https://example.com/products"]

    def parse(self, response):
        soup = BeautifulSoup(response.text, "lxml")
        for card in soup.select("div.product-card"):
            yield {"name": card.select_one("h3").text.strip()}`
      },
    ]
};
