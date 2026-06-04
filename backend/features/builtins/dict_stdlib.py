"""
POPULARNE MODUŁY STDLIB
"""

STDLIB: dict[str, dict] = {


    "os": {
        "opis": "Operacje na systemie plików i procesach — ścieżki, foldery, zmienne środowiskowe.",
        "przyklad": "os.path.join('folder', 'plik.txt')",
        "kategoria": "module",
    },
    "sys": {
        "opis": "Informacje o interpreterze i środowisku — argumenty, wyjście, ścieżki importu.",
        "przyklad": "sys.argv  # → lista argumentów z linii poleceń",
        "kategoria": "module",
    },
    "json": {
        "opis": "Czytanie i zapisywanie danych w formacie JSON — popularny format wymiany danych.",
        "przyklad": "json.dumps({'a': 1})  # → '{\"a\": 1}'",
        "kategoria": "module",
    },
    "re": {
        "opis": "Wyrażenia regularne — zaawansowane wyszukiwanie i zamiana wzorców w tekście.",
        "przyklad": "re.findall(r'\\d+', 'abc123def456')",
        "kategoria": "module",
    },
    "math": {
        "opis": "Funkcje matematyczne — pierwiastki, logarytmy, trygonometria, stałe.",
        "przyklad": "math.sqrt(16)  # → 4.0",
        "kategoria": "module",
    },
    "datetime": {
        "opis": "Praca z datami i czasem — tworzenie, formatowanie, obliczanie różnic.",
        "przyklad": "datetime.now().strftime('%Y-%m-%d')",
        "kategoria": "module",
    },
    "time": {
        "opis": "Funkcje czasu — mierzenie czasu, wstrzymywanie programu.",
        "przyklad": "time.sleep(1)  # czekaj 1 sekundę",
        "kategoria": "module",
    },
    "random": {
        "opis": "Generowanie liczb losowych i losowe wybieranie elementów.",
        "przyklad": "random.choice(['a','b','c'])",
        "kategoria": "module",
    },
    "collections": {
        "opis": "Zaawansowane struktury danych — Counter, defaultdict, deque, namedtuple.",
        "przyklad": "Counter('abracadabra').most_common(3)",
        "kategoria": "module",
    },
    "itertools": {
        "opis": "Narzędzia do pracy z iteratorami — kombinacje, permutacje, grupowanie.",
        "przyklad": "itertools.combinations([1,2,3], 2)",
        "kategoria": "module",
    },
    "functools": {
        "opis": "Narzędzia do programowania funkcyjnego — partial, reduce, lru_cache.",
        "przyklad": "@functools.lru_cache(maxsize=None)",
        "kategoria": "module",
    },
    "pathlib": {
        "opis": "Nowoczesna praca ze ścieżkami plików — czytelniejsza alternatywa dla os.path.",
        "przyklad": "Path('folder') / 'plik.txt'",
        "kategoria": "module",
    },
    "typing": {
        "opis": "Typy danych do adnotacji kodu — List, Dict, Optional, Union, Any.",
        "przyklad": "def f(x: List[int]) -> Optional[str]: ...",
        "kategoria": "module",
    },
    "asyncio": {
        "opis": "Programowanie asynchroniczne — pozwala wykonywać wiele zadań jednocześnie.",
        "przyklad": "asyncio.run(main())",
        "kategoria": "module",
    },
    "subprocess": {
        "opis": "Uruchamianie zewnętrznych programów i poleceń systemowych.",
        "przyklad": "subprocess.run(['ls', '-la'])",
        "kategoria": "module",
    },
    "threading": {
        "opis": "Wielowątkowość — uruchamianie kodu równolegle w osobnych wątkach.",
        "przyklad": "t = threading.Thread(target=funkcja); t.start()",
        "kategoria": "module",
    },
    "logging": {
        "opis": "Profesjonalne logowanie — zapisywanie informacji o działaniu programu.",
        "przyklad": "logging.info('Program wystartował')",
        "kategoria": "module",
    },
    "unittest": {
        "opis": "Framework do testów automatycznych — sprawdzanie czy kod działa poprawnie.",
        "przyklad": "class Test(unittest.TestCase): ...",
        "kategoria": "module",
    },
    "dataclasses": {
        "opis": "Automatyczne generowanie klas danych — mniej boilerplate niż ręczne __init__.",
        "przyklad": "@dataclass\nclass Punkt:\n    x: float\n    y: float",
        "kategoria": "module",
    },
    "abc": {
        "opis": "Klasy abstrakcyjne — definiowanie interfejsów które podklasy muszą implementować.",
        "przyklad": "class Baza(ABC):\n    @abstractmethod\n    def metoda(self): ...",
        "kategoria": "module",
    },
    "copy": {
        "opis": "Kopiowanie obiektów — płytka kopia (copy) i głęboka kopia (deepcopy).",
        "przyklad": "import copy; nowy = copy.deepcopy(oryginal)",
        "kategoria": "module",
    },
    "io": {
        "opis": "Strumienie wejścia/wyjścia — praca z plikami w pamięci i buforami.",
        "przyklad": "io.StringIO('tekst w pamięci')",
        "kategoria": "module",
    },
    "hashlib": {
        "opis": "Funkcje skrótu kryptograficznego — MD5, SHA256 i inne.",
        "przyklad": "hashlib.sha256(b'dane').hexdigest()",
        "kategoria": "module",
    },
    "base64": {
        "opis": "Kodowanie i dekodowanie danych w formacie Base64.",
        "przyklad": "base64.b64encode(b'hello')",
        "kategoria": "module",
    },
    "csv": {
        "opis": "Czytanie i zapisywanie plików CSV (wartości oddzielone przecinkami).",
        "przyklad": "csv.reader(open('dane.csv'))",
        "kategoria": "module",
    },
    "sqlite3": {
        "opis": "Wbudowana baza danych SQLite — prosta baza bez serwera, dane w jednym pliku.",
        "przyklad": "conn = sqlite3.connect('baza.db')",
        "kategoria": "module",
    },
    "urllib": {
        "opis": "Narzędzia do pracy z URL-ami i żądaniami HTTP.",
        "przyklad": "urllib.request.urlopen('http://...')",
        "kategoria": "module",
    },
    "socket": {
        "opis": "Niskopoziomowa komunikacja sieciowa — tworzenie połączeń TCP/UDP.",
        "przyklad": "s = socket.socket(); s.connect(('localhost', 8000))",
        "kategoria": "module",
    },

}
