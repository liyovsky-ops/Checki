import _advanced from './fw_beautifulsoup_advanced.js';
import _ref      from './fw_beautifulsoup_ref.js';
import _komendy  from './fw_beautifulsoup_komendy.js';
export const FW_BS4_DATA = {
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
    ]
,
    ..._advanced,
    ..._ref,
    komendy: _komendy,
  }
};
