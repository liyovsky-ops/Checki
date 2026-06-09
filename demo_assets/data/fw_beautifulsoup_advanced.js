// Advanced patterns: routing + state
FW_BS4_DATA.content.routing  = [
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
    ];
FW_BS4_DATA.content.state    = [
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
    ];
