"""
Prompty dla każdej kategorii analizy złych wzorców.
Każda kategoria = osobny call do Gemini z precyzyjnym kontekstem.
"""

SECURITY = """Jesteś ekspertem bezpieczeństwa aplikacji. Przeanalizuj kod pod kątem LUKI BEZPIECZEŃSTWA.

Szukaj wyłącznie:
- Hardcoded credentials (hasła, klucze API, tokeny w kodzie)
- SQL Injection — string concatenation w zapytaniach SQL zamiast parametrów
- eval() lub exec() z danymi od użytkownika
- Path traversal — ścieżki plików budowane z inputu użytkownika bez walidacji
- Command injection — subprocess/os.system z inputem użytkownika
- Brak walidacji/sanityzacji danych wejściowych
- Niezabezpieczone deserializacje (pickle.loads z zewnętrznych danych)
- XSS — wstawianie HTML bez escapowania
- debug=True lub SECRET_KEY na stałe w kodzie produkcyjnym

Każdy problem: numer linii, krótki opis PO POLSKU dlaczego to luka i jak można to wykorzystać.
Poziom: "critical" jeśli można bezpośrednio zaatakować, "high" jeśli wymaga dodatkowych warunków.

Odpowiedz TYLKO JSON:
{{"category": "security", "issues": [{{"lines": [4], "severity": "critical", "label": "Hasło w kodzie", "reason": "Hasło jest wpisane bezpośrednio w kodzie — każdy kto zobaczy ten plik zna hasło do bazy.", "fix": "Użyj os.environ.get('DB_PASSWORD') i trzymaj hasło w zmiennych środowiskowych."}}]}}

Kod:
{code}"""

RELIABILITY = """Jesteś ekspertem niezawodności systemów. Przeanalizuj kod pod kątem PROBLEMÓW Z NIEZAWODNOŚCIĄ.

Szukaj wyłącznie:
- Puste bloki except: lub except Exception: które połykają błędy bez logowania
- Brak obsługi błędów przy operacjach IO (otwieranie plików, połączenia sieciowe, baza danych)
- Potencjalne dzielenie przez zero bez sprawdzenia
- Nieskończone pętle bez warunku wyjścia
- Race conditions przy dostępie do współdzielonych zasobów
- Niezamknięte zasoby (pliki, połączenia) — brak with/finally/close()
- Mutowanie listy/słownika podczas iteracji po niej

Każdy problem: numer linii, opis PO POLSKU co może pójść nie tak w produkcji.
Poziom: "high" jeśli crashuje aplikację, "medium" jeśli powoduje niepoprawne działanie.

Odpowiedz TYLKO JSON:
{{"category": "reliability", "issues": [{{"lines": [8, 9, 10], "severity": "high", "label": "Brak obsługi błędów", "reason": "Połączenie z bazą danych może się nie udać — brak try/except spowoduje crash aplikacji.", "fix": "Opakuj w try/except i obsłuż wyjątek DatabaseError."}}]}}

Kod:
{code}"""

MAINTAINABILITY = """Jesteś senior developerem robiącym code review. Znajdź problemy z CZYTELNOŚCIĄ I UTRZYMANIEM KODU.

Szukaj wyłącznie:
- Funkcje dłuższe niż ~30 linii — za dużo odpowiedzialności
- Głębokie zagnieżdżenie (więcej niż 3 poziomy if/for/while)
- Magic numbers — liczby bez kontekstu (np. if status == 403, time.sleep(300))
- Duplikacja kodu — ten sam blok powtórzony 2+ razy
- Nazwy zmiennych bez znaczenia (x, tmp, data2, foo)
- Bardzo długie linie (>120 znaków)
- Funkcja robi więcej niż jedną rzecz (naruszenie SRP)

Każdy problem: numer linii, opis PO POLSKU dlaczego utrudnia utrzymanie.
Poziom: "medium" standardowo, "low" dla stylistycznych.

Odpowiedz TYLKO JSON:
{{"category": "maintainability", "issues": [{{"lines": [15], "severity": "medium", "label": "Magiczna liczba", "reason": "Liczba 300 nie mówi nic — czy to sekundy? milisekundy? timeout? limit?", "fix": "Zdefiniuj stałą: REQUEST_TIMEOUT_SECONDS = 300"}}]}}

Kod:
{code}"""

PERFORMANCE = """Jesteś ekspertem wydajności. Znajdź PROBLEMY Z WYDAJNOŚCIĄ w kodzie.

Szukaj wyłącznie:
- N+1 queries — zapytanie SQL w pętli zamiast jednego zapytania z JOIN
- Niepotrzebne obliczenia w pętli (np. len(lista) wywołane przy każdej iteracji)
- Wczytywanie całego pliku do pamięci gdy można strumieniować
- Tworzenie nowych obiektów w pętli zamiast reużywania
- Zbędne konwersje typów (str→int→str)
- Brak indeksów przy częstych wyszukiwaniach w listach (użyj set/dict)
- Synchroniczne operacje IO które mogłyby być async

Każdy problem: numer linii, opis PO POLSKU jaki jest wpływ na wydajność.
Poziom: "high" jeśli skaluje się źle (O(n²)), "medium" jeśli wolniejsze ale poprawne.

Odpowiedz TYLKO JSON:
{{"category": "performance", "issues": [{{"lines": [22, 23], "severity": "high", "label": "Zapytanie w pętli", "reason": "Każda iteracja pętli wysyła osobne zapytanie SQL — przy 1000 rekordach = 1000 zapytań.", "fix": "Użyj jednego zapytania z WHERE id IN (...) lub JOIN."}}]}}

Kod:
{code}"""

BEST_PRACTICES = """Jesteś doświadczonym developerem Pythona. Znajdź NARUSZENIA DOBRYCH PRAKTYK.

Szukaj wyłącznie:
- print() do debugowania zamiast modułu logging
- Importy wewnątrz funkcji bez powodu (powinny być na górze pliku)
- Używanie mutable default arguments (def foo(lista=[]))
- Porównywanie z None przez == zamiast is (if x == None)
- Używanie type() zamiast isinstance() do sprawdzania typów
- String concatenation w pętli zamiast join()
- Brak __main__ guard dla skryptów wykonywalnych
- Globalne zmienne modyfikowane w funkcjach bez global/nonlocal

Każdy problem: numer linii, opis PO POLSKU dlaczego to zła praktyka.
Poziom: "medium" dla praktyk które mogą powodować bugi, "low" dla stylistycznych.

Odpowiedz TYLKO JSON:
{{"category": "best_practices", "issues": [{{"lines": [7], "severity": "low", "label": "print zamiast logger", "reason": "print() nie ma poziomów (DEBUG/INFO/ERROR), nie można go wyłączyć w produkcji i nie zapisuje timestampów.", "fix": "import logging; logger = logging.getLogger(__name__); logger.debug('...')"}}]}}

Kod:
{code}"""
