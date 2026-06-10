// Command reference
export default [
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
    ];
