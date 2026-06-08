const FW_BS4_DATA = {
  meta: {
    id: 'beautifulsoup', name: 'BeautifulSoup', icon: '🍲', color: '#3CB371', color2: '#2E8B57',
    tagline: 'Parsowanie HTML i XML — scraping bez bólu',
    year: 2004, author: 'Leonard Richardson', lang: 'Python 3.7+',
    github: 'waylan/beautifulsoup', stars: '7k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Selektory' },
    { id: 'hooki',      label: 'Nawigacja' },
    { id: 'routing',    label: 'Modyfikacja' },
    { id: 'state',      label: 'Zaawansowane' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Ekosystem' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać BeautifulSoup?',
        firstComponent: 'Pierwsze parsowanie',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest BeautifulSoup?',
        desc: 'BeautifulSoup to biblioteka Python do parsowania dokumentów HTML i XML. Tworzy drzewo parsowania z którego możesz wyciągać dane przez intuicyjne API. Nie pobiera stron — to robi requests lub httpx. BS4 dostaje gotowy HTML i pozwala ci w nim wyszukiwać. Standardowe narzędzie do web scrapingu w Pythonie.',
      },
      concepts: [
        {
          title: 'Parser',
          desc: 'BS4 nie parsuje HTML samodzielnie — potrzebuje parsera. html.parser wbudowany w Python, lxml najszybszy, html5lib najbardziej tolerancyjny. Wybór parsera wpływa na wyniki.',
          icon: '⚙️'
        },
        {
          title: 'Drzewo DOM',
          desc: 'BS4 buduje drzewo obiektów odzwierciedlające strukturę HTML. Tag, NavigableString, BeautifulSoup — trzy podstawowe typy. Możesz przechodzić drzewo w górę, dół i na boki.',
          icon: '🌳'
        },
        {
          title: 'Wyszukiwanie',
          desc: 'find() zwraca pierwszy element, find_all() zwraca listę. Możesz szukać po nazwie tagu, klasie CSS, id, atrybutach lub wyrażeniu regularnym.',
          icon: '🔍'
        },
        {
          title: 'CSS Selektory',
          desc: 'select() i select_one() przyjmują selektory CSS — jeśli znasz CSS to już umiesz szukać w BS4. Intuicyjniejsze niż find() dla złożonych zapytań.',
          icon: '🎯'
        }
      ],
      whenToUse: [
        'Scraping stron statycznych (HTML bez JavaScript)',
        'Wyciąganie danych ze stron rządowych, sklepów, portali ogłoszeniowych',
        'Parsowanie odpowiedzi HTML z API które zwracają HTML zamiast JSON',
        'Czyszczenie i przetwarzanie dokumentów HTML/XML',
        'Automatyzacja zbierania danych do analiz i ML',
        'Gdy Selenium/Playwright to za dużo — strona nie wymaga JS'
      ],
      firstComponent: `import requests
from bs4 import BeautifulSoup

# 1. Pobierz stronę
url = "https://books.toscrape.com"
response = requests.get(url)

# 2. Sparsuj HTML
soup = BeautifulSoup(response.text, "html.parser")

# 3. Znajdź elementy
tytuly = soup.find_all("h3")
for t in tytuly:
    print(t.find("a")["title"])

# 4. CSS selector — bardziej zwięźle
ceny = soup.select("p.price_color")
for cena in ceny:
    print(cena.text.strip())`
    },

    komponenty: [
      {
        title: 'find() i find_all() — podstawowe wyszukiwanie',
        desc: 'find() zwraca pierwszy pasujący element lub None. find_all() zwraca listę wszystkich pasujących. Przyjmują nazwę tagu, atrybuty, funkcję lub wyrażenie regularne.',
        code: `from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")

# Po nazwie tagu
naglowek = soup.find("h1")
wszystkie_linki = soup.find_all("a")

# Po klasie CSS
karta = soup.find("div", class_="product-card")
karty = soup.find_all("div", class_="product-card")

# Po id
header = soup.find(id="main-header")

# Po wielu atrybutach
input_email = soup.find("input", {"type": "email", "name": "email"})

# Limit wyników
pierwsze_5 = soup.find_all("li", limit=5)`
      },
      {
        title: 'CSS selektory — select() i select_one()',
        desc: 'select_one() jak find(), select() jak find_all(). Przyjmują pełne selektory CSS — klasy, id, atrybuty, zagnieżdżenia, pseudo-selektory.',
        code: `# Jeden element
tytul = soup.select_one("h1.page-title")
pierwszy_link = soup.select_one("nav a")

# Lista elementów
linki_w_menu = soup.select("nav ul li a")
obrazki = soup.select("div.gallery img")

# Złożone selektory
aktywny = soup.select_one("li.active > a")
ceny = soup.select("table.oferty td[data-col='cena']")

# Dzieci bezpośrednie
bezposrednie_li = soup.select("ul > li")

# Atrybut zawiera wartość
linki_pdf = soup.select("a[href$='.pdf']")
linki_http = soup.select("a[href^='http']")`
      },
      {
        title: 'Wyciąganie danych z elementów',
        desc: 'Gdy masz element — pobierasz tekst, atrybuty, HTML. .text lub .get_text() do tekstu, element["atrybut"] lub .get() do atrybutów.',
        code: `element = soup.find("a", class_="produkt")

# Tekst
print(element.text)           # surowy tekst z dziećmi
print(element.get_text())     # to samo
print(element.get_text(strip=True))         # bez whitespace
print(element.get_text(separator=" | "))    # separator między blokami

# Atrybuty
print(element["href"])          # rzuca KeyError jeśli brak
print(element.get("href"))      # None jeśli brak
print(element.get("href", "#")) # default jeśli brak
print(element.attrs)            # słownik wszystkich atrybutów

# Wewnętrzny HTML
print(element.decode_contents())  # HTML dzieci`
      },
      {
        title: 'Wyrażenia regularne w wyszukiwaniu',
        desc: 'find() i find_all() akceptują skompilowane regex w miejscu stringa. Przydatne gdy szukasz po częściowej nazwie klasy, częściowym URL, wzorcu tekstu.',
        code: `import re
from bs4 import BeautifulSoup

# Tagi pasujące do wzorca
naglowki = soup.find_all(re.compile("^h[1-6]$"))

# Klasy zawierające "btn"
przyciski = soup.find_all(class_=re.compile("btn"))

# Linki do zewnętrznych domen
zewnetrzne = soup.find_all("a", href=re.compile("^https://(?!moja-strona)"))

# Tekst pasujący do wzorca
ceny = soup.find_all(string=re.compile(r"\d+[,\.]\d{2} zł"))`
      },
    ],

    hooki: [
      {
        title: 'Nawigacja w górę drzewa — .parent i .parents',
        desc: '.parent to bezpośredni rodzic elementu. .parents to generator wszystkich przodków aż do rootu. Przydatne gdy znalazłeś element i potrzebujesz jego kontenera.',
        code: `link = soup.find("a", text="Szczegóły")

# Bezpośredni rodzic
wiersz_tabeli = link.parent      # <td>
print(wiersz_tabeli.name)        # "td"

# Wszyscy przodkowie
for przodek in link.parents:
    print(przodek.name)

# Znajdź pierwszego przodka o danej klasie
karta = link.find_parent("div", class_="product-card")
karty = link.find_parents("div")  # lista`
      },
      {
        title: 'Nawigacja w dół — .children i .descendants',
        desc: '.children to generator bezpośrednich dzieci (włącznie z whitespace). .descendants to wszystkie potomki rekurencyjnie. .contents to lista children.',
        code: `lista = soup.find("ul", class_="menu")

# Bezpośrednie dzieci (generator)
for dziecko in lista.children:
    if dziecko.name == "li":  # pomiń NavigableString (whitespace)
        print(dziecko.text)

# Lista dzieci
dzieci = list(lista.children)
print(lista.contents[0])  # pierwsze dziecko

# Wszystkie potomki rekurencyjnie
for potomek in lista.descendants:
    if potomek.name:  # tylko tagi, nie tekst
        print(potomek.name)

# Bezpośrednio — pierwsza/ostatnia linia kodu dzieci
pierwsze = lista.find("li")  # to samo co children[0] ale czytelniej`
      },
      {
        title: 'Nawigacja na boki — .next_sibling i .previous_sibling',
        desc: 'Rodzeństwo — elementy na tym samym poziomie drzewa. Uwaga: whitespace między tagami to też NavigableString — często trzeba pominąć.',
        code: `naglowek = soup.find("h2", text="Opis produktu")

# Następny element
nastepny = naglowek.next_sibling
# Może być NavigableString (whitespace) — sprawdź:
nastepny = naglowek.find_next_sibling()  # pomija whitespace

# Poprzedni
poprzedni = naglowek.find_previous_sibling("h2")

# Wszystkie następne rodzeństwo
for rodzenstwo in naglowek.find_next_siblings("p"):
    print(rodzenstwo.text)

# Następny element w całym dokumencie (nie tylko rodzeństwo)
kolejny = naglowek.find_next("p")
wszystkie_kolejne = naglowek.find_all_next("a")`
      },
      {
        title: 'Przechodzenie drzewa — iteracja',
        desc: 'Praktyczne wzorce do iterowania przez strukturę dokumentu — tabele, listy, zagnieżdżone elementy.',
        code: `# Iteracja przez wiersze tabeli
tabela = soup.find("table", class_="oferty")
wiersze = tabela.find_all("tr")[1:]  # pomiń nagłówek

for wiersz in wiersze:
    komorki = wiersz.find_all("td")
    if len(komorki) >= 3:
        nazwa  = komorki[0].get_text(strip=True)
        cena   = komorki[1].get_text(strip=True)
        dostep = komorki[2].get_text(strip=True)
        print(f"{nazwa}: {cena} ({dostep})")

# Iteracja przez zagnieżdżone listy
def parsuj_liste(ul, poziom=0):
    for li in ul.find_all("li", recursive=False):
        print("  " * poziom + li.find(text=True, recursive=False).strip())
        pod_lista = li.find("ul")
        if pod_lista:
            parsuj_liste(pod_lista, poziom + 1)`
      },
    ],

    routing: [
      {
        title: 'Modyfikacja — zmiana tekstu i atrybutów',
        desc: 'BS4 pozwala modyfikować drzewo — zmienić tekst, atrybuty, dodać/usunąć elementy. Przydatne do czyszczenia HTML przed zapisem.',
        code: `# Zmień tekst elementu
tag = soup.find("h1")
tag.string = "Nowy tytuł"

# Zmień atrybut
link = soup.find("a")
link["href"] = "https://nowy-url.pl"
link["class"] = ["btn", "btn-primary"]

# Dodaj atrybut
img = soup.find("img")
img["loading"] = "lazy"

# Usuń atrybut
del img["style"]
img.attrs.pop("onclick", None)  # bezpieczne usunięcie`
      },
      {
        title: 'Dodawanie i usuwanie elementów',
        desc: 'insert(), append(), decompose() do manipulacji drzewem. Przydatne gdy chcesz oczyścić HTML — usunąć reklamy, skrypty, style przed przetworzeniem.',
        code: `from bs4 import BeautifulSoup, Tag

# Usuń element z drzewa
for skrypt in soup.find_all("script"):
    skrypt.decompose()  # usuwa i niszczy

for reklama in soup.find_all("div", class_="ad-banner"):
    reklama.extract()  # usuwa i zwraca element

# Utwórz nowy tag
nowy_div = soup.new_tag("div", **{"class": "wrapper"})
nowy_p = soup.new_tag("p")
nowy_p.string = "Nowy akapit"

# Wstaw
kontener = soup.find("div", id="content")
kontener.append(nowy_p)         # na końcu
kontener.insert(0, nowy_div)    # na początku
nowy_div.insert(0, nowy_p)      # zagnieżdż`
      },
      {
        title: 'Czyszczenie HTML — praktyczny wzorzec',
        desc: 'Częsty przypadek: pobierz artykuł, usuń śmieci (reklamy, skrypty, style), zostaw czysty tekst lub uproszczony HTML.',
        code: `def wyciagnij_artykul(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")

    # Usuń zbędne elementy
    for tag in soup.find_all(["script", "style", "nav",
                               "footer", "aside", "form"]):
        tag.decompose()

    for el in soup.find_all(class_=["ad", "cookie-banner",
                                     "newsletter", "sidebar"]):
        el.decompose()

    # Znajdź treść artykułu
    artykul = (soup.find("article") or
               soup.find("main") or
               soup.find("div", id="content"))

    if not artykul:
        return soup.get_text(separator="\n", strip=True)

    return artykul.get_text(separator="\n", strip=True)`
      },
      {
        title: 'Serializacja — z powrotem do HTML/tekstu',
        desc: 'str(soup) i prettify() do exportu HTML. get_text() do czystego tekstu. encode() do bajtów z konkretnym encodingiem.',
        code: `# Cały dokument jako string
html_string = str(soup)

# Ładnie sformatowany HTML
ladny_html = soup.prettify()
ladny_html = soup.prettify(encoding="utf-8")

# Sam fragment
fragment = str(soup.find("div", class_="content"))

# Czysty tekst
tekst = soup.get_text()
tekst = soup.get_text(separator="\n", strip=True)

# Zapis do pliku
with open("output.html", "w", encoding="utf-8") as f:
    f.write(str(soup))

with open("output.txt", "w", encoding="utf-8") as f:
    f.write(soup.get_text(strip=True))`
      },
    ],

    state: [
      {
        title: 'Wybór parsera — html.parser vs lxml vs html5lib',
        desc: 'Parser determinuje jak BS4 interpretuje niepoprawny HTML. Każdy ma inne zachowanie przy brakujących tagach, złej składni, kodowaniu.',
        code: `from bs4 import BeautifulSoup

html = "<html><body><p>Tekst</p></body></html>"

# html.parser — wbudowany, wolniejszy, wystarczający
soup = BeautifulSoup(html, "html.parser")

# lxml — najszybszy, wymaga: pip install lxml
soup = BeautifulSoup(html, "lxml")

# html5lib — najbardziej tolerancyjny (jak przeglądarka)
# wymaga: pip install html5lib
soup = BeautifulSoup(html, "html5lib")

# XML (lxml)
soup = BeautifulSoup(xml_string, "xml")

# Porównanie prędkości (orientacyjnie):
# lxml:       ~10x szybszy niż html.parser
# html.parser: ok (dla 1-10 stron)
# html5lib:   ~3x wolniejszy niż html.parser`
      },
      {
        title: 'Encoding i problemy z kodowaniem',
        desc: 'Scraping często przynosi problemy z encodingiem. BS4 automatycznie wykrywa kodowanie przez chardet/charset-normalizer ale czasem trzeba pomóc.',
        code: `import requests
from bs4 import BeautifulSoup

# requests może źle wykryć encoding
response = requests.get("https://example.com")

# Sprawdź co wykrył requests
print(response.encoding)           # np. "ISO-8859-2"
print(response.apparent_encoding)  # wykrycie przez chardet

# Wymuś encoding
response.encoding = "utf-8"
soup = BeautifulSoup(response.text, "lxml")

# Lub użyj response.content (bytes) i pozwól BS4 wykryć
soup = BeautifulSoup(response.content, "lxml")

# BS4 patrzy na <meta charset="..."> i nagłówki HTTP
print(soup.original_encoding)  # co BS4 wykrył`
      },
      {
        title: 'Scraping z paginacją',
        desc: 'Większość stron ma wiele podstron. Pętla przez strony + zbieranie danych do listy.',
        code: `import requests
from bs4 import BeautifulSoup
import time

def scrape_all_pages(base_url: str) -> list[dict]:
    results = []
    page = 1

    while True:
        url = f"{base_url}?page={page}"
        response = requests.get(url, headers={
            "User-Agent": "Mozilla/5.0 (scraper research)"
        })

        if response.status_code != 200:
            break

        soup = BeautifulSoup(response.content, "lxml")
        items = soup.select("div.item")

        if not items:  # brak elementów = koniec paginacji
            break

        for item in items:
            results.append({
                "title": item.select_one("h3").get_text(strip=True),
                "price": item.select_one(".price").get_text(strip=True),
                "url": item.select_one("a")["href"],
            })

        page += 1
        time.sleep(1)  # szanuj serwer

    return results`
      },
      {
        title: 'SoupStrainer — parsuj tylko fragment HTML',
        desc: 'SoupStrainer pozwala parsować tylko wybrane elementy — szybsze gdy HTML jest duży a potrzebujesz tylko małej części.',
        code: `from bs4 import BeautifulSoup, SoupStrainer

html = requests.get(url).text

# Parsuj tylko tagi <a>
only_links = SoupStrainer("a")
soup = BeautifulSoup(html, "lxml", parse_only=only_links)
linki = [a["href"] for a in soup.find_all("a", href=True)]

# Parsuj tylko div.product
only_products = SoupStrainer("div", class_="product")
soup = BeautifulSoup(html, "lxml", parse_only=only_products)

# Parsuj przez funkcję
def tylko_duze_naglowki(tag, attrs):
    return tag in ["h1", "h2"]

strainer = SoupStrainer(tylko_duze_naglowki)
soup = BeautifulSoup(html, "lxml", parse_only=strainer)`
      },
    ],

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
    ],

    komendy: [
      {
        category: 'Instalacja',
        icon: '📦',
        items: [
          { cmd: 'pip install beautifulsoup4', desc: 'Zainstaluj BeautifulSoup4',
            detail: { what: 'Instaluje BS4. Uwaga: pakiet to beautifulsoup4, import to bs4.', how: 'pip install beautifulsoup4 — nie "beautifulsoup" ani "bs4"', tips: ['pip install beautifulsoup4 lxml — razem z najlepszym parserem', 'Zawsze: bs4 + lxml + requests = gotowy stack do scrapingu'] }
          },
          { cmd: 'pip install lxml', desc: 'Najszybszy parser HTML/XML',
            detail: { what: 'Parser C dla BS4. 10x szybszy niż html.parser. Wymagany w produkcji.', how: 'Po instalacji używaj: BeautifulSoup(html, "lxml")', tips: ['Zawsze instaluj przy BS4', 'pip install lxml requests beautifulsoup4 — pełny stack'] }
          },
          { cmd: 'pip install html5lib', desc: 'Parser tolerancyjny — jak przeglądarka',
            detail: { what: 'Parsuje HTML dokładnie jak Chrome/Firefox. Naprawia brakujące tagi, złą składnię. Wolniejszy niż lxml.', how: 'BeautifulSoup(html, "html5lib")', tips: ['Używaj gdy lxml daje złe wyniki', 'Najlepsza tolerancja na zły HTML'] }
          },
        ]
      },
      {
        category: 'Parsowanie',
        icon: '🔍',
        items: [
          { cmd: 'BeautifulSoup(html, "lxml")', desc: 'Sparsuj HTML z parserem lxml',
            detail: { what: 'Tworzy obiekt BeautifulSoup z HTML stringa lub bajtów. Drugi argument to parser.', how: 'Przekaż response.text (str) lub response.content (bytes). BS4 wykryje encoding z content.', tips: ['Zawsze używaj response.content (bytes) + lxml — BS4 sam wykryje encoding', 'html.parser gdy nie masz lxml'] }
          },
          { cmd: 'soup.find("div", class_="card")', desc: 'Znajdź pierwszy pasujący element',
            detail: { what: 'find() zwraca pierwszy pasujący Tag lub None. Nigdy nie rzuca wyjątku gdy nie znajdzie.', how: 'Pierwszy arg = nazwa tagu, class_ (nie class bo keyword Python), id, lub słownik atrybutów.', tips: ['class_ z podkreślnikiem — "class" jest zarezerwowane w Python', 'Sprawdź czy None: if el: ... przed użyciem'] }
          },
          { cmd: 'soup.find_all("a", href=True)', desc: 'Znajdź wszystkie linki z atrybutem href',
            detail: { what: 'find_all() zwraca listę (nigdy None). href=True = ma atrybut href, nieważne jaką wartość.', how: 'Każdy element listy to Tag. Iteruj: for a in soup.find_all("a", href=True): print(a["href"])', tips: ['find_all() zawsze zwraca listę — może być pusta', 'limit=5 — ogranicz wyniki'] }
          },
          { cmd: 'soup.select("div.product > h3")', desc: 'CSS selector — lista elementów',
            detail: { what: 'select() przyjmuje selektor CSS i zwraca listę. select_one() zwraca pierwszy lub None.', how: 'Pełne selektory CSS: .klasa, #id, [atrybut], > dziecko, + sąsiad, przestrzeń=potomek.', tips: ['Intuicyjniejsze niż find() dla złożonych struktur', 'soup.select_one() = odpowiednik find()'] }
          },
          { cmd: 'element.get_text(strip=True)', desc: 'Pobierz czysty tekst elementu',
            detail: { what: 'get_text() zwraca tekst elementu i wszystkich jego dzieci. strip=True usuwa wiodące/kończące białe znaki.', how: 'separator=" " łączy bloki tekstem spacją. strip=True usuwa \n\t na początku i końcu.', flags: [{flag: 'strip=True', desc: 'Usuń whitespace'}, {flag: 'separator=" "', desc: 'Separator między blokami'}], tips: ['element.text to skrót — ale bez opcji', 'get_text(separator="\\n", strip=True) = czytelny tekst'] }
          },
          { cmd: 'element.get("href", "")', desc: 'Bezpieczne pobieranie atrybutu',
            detail: { what: 'element["href"] rzuca KeyError gdy brak. element.get("href") zwraca None gdy brak. element.get("href", "") zwraca "" gdy brak.', how: 'Jak dict.get() — drugi argument to wartość domyślna.', tips: ['Zawsze używaj .get() zamiast [] przy scrapingu — unikniesz KeyError', 'Sprawdź czy URL absolutny: href.startswith("http")'] }
          },
        ]
      },
      {
        category: 'Praktyczne wzorce',
        icon: '🛠️',
        items: [
          { cmd: 'soup.select("a[href^=\'https\']")', desc: 'Linki zaczynające się od https',
            detail: { what: 'Selektor atrybutu CSS: ^= zaczyna od, $= kończy na, *= zawiera.', how: 'Uważaj na cudzysłowy — w Python stringu musisz escapować lub używać naprzemiennie " i \'.', tips: ['a[href$=".pdf"] — linki do PDF', 'a[href*="github"] — linki zawierające "github"'] }
          },
          { cmd: 'soup.find_all(string=re.compile(r"\\d+ zł"))', desc: 'Znajdź teksty pasujące do regex',
            detail: { what: 'string= szuka w NavigableString (węzłach tekstowych). Zwraca listę stringów, nie tagów.', how: 'import re. Kompiluj wzorzec dla wydajności przy wielokrotnym użyciu.', tips: ['Zwraca stringi — użyj .parent żeby dostać tag', 'Przydatne do znajdowania cen, dat, numerów'] }
          },
          { cmd: 'for row in table.find_all("tr")[1:]:', desc: 'Iteruj przez wiersze tabeli (pomiń nagłówek)',
            detail: { what: '[1:] pomija pierwszy wiersz (nagłówki). Każdy row to <tr>, komorki to find_all("td").', how: 'komorki = row.find_all("td"). komorki[0].get_text(strip=True) = tekst pierwszej komórki.', tips: ['Sprawdź len(komorki) przed indeksowaniem', 'pd.read_html(url) parsuje tabele automatycznie — często szybsze'] }
          },
        ]
      },
    ]
  }
};
