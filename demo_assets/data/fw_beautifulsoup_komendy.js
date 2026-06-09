// Command reference
FW_BS4_DATA.content.komendy = [
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
      {
        category: 'Pipeline scrapingu',
        icon: '🕷️',
        items: [
          { cmd: 'soup = BeautifulSoup(requests.get(url).content, "lxml")', desc: 'Pobierz stronę i parsuj jedną linią',
            detail: { what: 'Kompletny pipeline: requests pobiera stronę, .content (bytes) przekazuje do BS4, lxml parsuje.', how: 'requests.get(url, headers={"User-Agent": "Mozilla/5.0"}) — dodaj UA żeby uniknąć blokad.', tips: ['Użyj .content (bytes) nie .text (str) — BS4 samo wykryje encoding', 'Zawsze ustawiaj timeout: requests.get(url, timeout=10)', 'headers z User-Agent gdy strona blokuje boty'] }
          },
          { cmd: 'from urllib.parse import urljoin', desc: 'Absolutyzacja względnych URL-i',
            detail: { what: 'Zamienia href="/strona" na "https://example.com/strona". Niezbędne przy scrapingu linków — większość href na stronach to względne URL-e.', how: 'urljoin(base_url, href) = absolutny URL. Działa dla ../, /, ./path itp.', tips: ['for a in soup.find_all("a", href=True): url = urljoin(base, a["href"])', 'urljoin("https://example.com/a/b", "../c") = "https://example.com/a/c"', 'Nie używaj string concatenation dla URL-i — urljoin obsługuje edge cases'] }
          },
          { cmd: 'print(soup.prettify())', desc: 'Sformatuj HTML do debugowania',
            detail: { what: 'Zwraca HTML z wcięciami i nowymi liniami. Użyj żeby zobaczyć strukturę drzewa DOM przed pisaniem selektorów.', how: 'print(soup.find("div", class_="main").prettify()) — sformatuj fragment.', tips: ['Niezbędne przy debugowaniu — widzisz gdzie są dane', 'soup.prettify()[:2000] — tylko pierwsze 2000 znaków (strony są duże)', 'Otwórz DevTools w Chrome/Firefox zamiast prettify dla całej strony'] }
          },
          { cmd: 'el.decompose()', desc: 'Usuń element z drzewa DOM',
            detail: { what: 'Usuwa element i wszystkie jego dzieci z drzewa. Przydatne gdy chcesz usunąć reklamy, nawigację przed wyciąganiem tekstu.', how: 'for el in soup.find_all("script"): el.decompose() — usuń wszystkie script tagy.', tips: ['el.extract() — usuwa i zwraca element (możesz go użyć dalej)', 'soup.find("nav").decompose() — usuń nawigację przed get_text()'] }
          },
          { cmd: 'next_page = soup.select_one("a.next-page")', desc: 'Paginacja — znajdź link do następnej strony',
            detail: { what: 'Wzorzec scrapingu wielu stron: znajdź link "następna strona" i kontynuuj pętlę.', how: 'while True: soup = ...; next = soup.select_one("a.next"); if not next: break; url = urljoin(base, next["href"])', tips: ['Dodaj time.sleep(1) między requestami — nie bombarduj serwera', 'Sprawdź robots.txt zanim zaczniesz scrapować', 'Ustaw limit stron na starcie — while page < 100:'] }
          },
        ]
      },
      {
        category: 'Parsowanie zaawansowane',
        icon: '⚙️',
        items: [
          { cmd: 'soup.find_all(True)', desc: 'Wszystkie tagi (dowolny element)',
            detail: { what: 'True jako argument zwraca wszystkie tagi. Przydatne z atrybutem: soup.find_all(True, attrs={"data-id": True}).', how: 'soup.find_all(["h1","h2","h3"]) — lista tagów = znajdź wszystkie nagłówki.', tips: ['soup.find_all(re.compile("^h")) — tagi pasujące do regex (h1,h2,h3...)', 'soup.find(lambda tag: tag.name=="div" and "card" in tag.get("class",[])) — custom filter'] }
          },
          { cmd: 'soup.find("meta", attrs={"name":"description"})', desc: 'Pobierz meta tag (og:title, description)',
            detail: { what: 'Meta tagi zawierają SEO i OpenGraph dane. Użyj do wyciągania tytułów, opisów, obrazków ze stron.', how: 'el["content"] — wartość atrybutu content.', tips: ['soup.find("meta", property="og:title")["content"] — Open Graph title', 'soup.find("title").get_text() — tytuł strony', 'soup.find("link", rel="canonical")["href"] — kanoniczny URL'] }
          },
          { cmd: 'data = [el.get_text(strip=True) for el in soup.select(".item")]', desc: 'List comprehension — szybkie zbieranie danych',
            detail: { what: 'Pythonowy idiom do zbierania danych z wielu elementów jedną linią.', how: 'Lista wszystkich tekstów elementów o klasie .item.', tips: ['[{"name": el.find("h3").text, "price": el.find(".price").text} for el in soup.select(".product")]', 'Dodaj if el.find("h3") żeby pominąć elementy bez tytułu'] }
          },
        ]
      },
    ];
