"""
WBUDOWANE FUNKCJE (built-ins)
"""

BUILTINS: dict[str, dict] = {


    "abs": {
        "opis": "Zwraca wartość bezwzględną liczby — czyli zawsze liczbę dodatnią. abs(-5) = 5.",
        "przyklad": "abs(-7)  # → 7",
        "kategoria": "built-in",
    },
    "aiter": {
        "opis": "Zwraca asynchroniczny iterator z obiektu. Używane w pętlach async for.",
        "przyklad": "aiter(async_iterable)",
        "kategoria": "built-in",
    },
    "all": {
        "opis": "Zwraca True jeśli WSZYSTKIE elementy listy są prawdziwe. Jeden fałszywy = False.",
        "przyklad": "all([True, True, True])  # → True",
        "kategoria": "built-in",
    },
    "anext": {
        "opis": "Pobiera następny element z asynchronicznego iteratora.",
        "przyklad": "await anext(async_iter)",
        "kategoria": "built-in",
    },
    "any": {
        "opis": "Zwraca True jeśli CHOĆ JEDEN element listy jest prawdziwy.",
        "przyklad": "any([False, False, True])  # → True",
        "kategoria": "built-in",
    },
    "ascii": {
        "opis": "Zamienia obiekt na tekst, zamieniając znaki spoza ASCII na sekwencje \\uXXXX.",
        "przyklad": "ascii('ą')  # → \"'\\\\u0105'\"",
        "kategoria": "built-in",
    },
    "bin": {
        "opis": "Zamienia liczbę całkowitą na jej zapis binarny (w systemie dwójkowym).",
        "przyklad": "bin(10)  # → '0b1010'",
        "kategoria": "built-in",
    },
    "bool": {
        "opis": "Zamienia wartość na True lub False. Puste listy, 0, None to False.",
        "przyklad": "bool(0)  # → False",
        "kategoria": "built-in",
    },
    "breakpoint": {
        "opis": "Zatrzymuje program i uruchamia debugger — możesz wtedy sprawdzić stan zmiennych.",
        "przyklad": "breakpoint()  # wchodzi do pdb",
        "kategoria": "built-in",
    },
    "bytearray": {
        "opis": "Tworzy modyfikowalną sekwencję bajtów. Przydatna przy pracy z danymi binarnymi.",
        "przyklad": "bytearray(b'hello')",
        "kategoria": "built-in",
    },
    "bytes": {
        "opis": "Tworzy niemodyfikowalną sekwencję bajtów. Używana przy plikach i sieci.",
        "przyklad": "bytes('tekst', 'utf-8')",
        "kategoria": "built-in",
    },
    "callable": {
        "opis": "Sprawdza czy obiekt można wywołać jak funkcję. Zwraca True lub False.",
        "przyklad": "callable(print)  # → True",
        "kategoria": "built-in",
    },
    "chr": {
        "opis": "Zamienia numer kodu Unicode na znak. Odwrotność ord().",
        "przyklad": "chr(65)  # → 'A'",
        "kategoria": "built-in",
    },
    "classmethod": {
        "opis": "Dekorator — tworzy metodę klasy. Pierwszym argumentem jest klasa, nie instancja.",
        "przyklad": "@classmethod\ndef stworz(cls): ...",
        "kategoria": "built-in",
    },
    "compile": {
        "opis": "Kompiluje tekst do kodu Pythona który można później wykonać przez exec().",
        "przyklad": "compile('x=1', '<str>', 'exec')",
        "kategoria": "built-in",
    },
    "complex": {
        "opis": "Tworzy liczbę zespoloną z częścią rzeczywistą i urojoną.",
        "przyklad": "complex(2, 3)  # → (2+3j)",
        "kategoria": "built-in",
    },
    "delattr": {
        "opis": "Usuwa atrybut z obiektu. Odwrotność setattr().",
        "przyklad": "delattr(obiekt, 'nazwa')",
        "kategoria": "built-in",
    },
    "dict": {
        "opis": "Tworzy słownik — strukturę par klucz:wartość. Szybkie wyszukiwanie po kluczu.",
        "przyklad": "dict(imie='Jan', wiek=30)",
        "kategoria": "built-in",
    },
    "dir": {
        "opis": "Zwraca listę wszystkich atrybutów i metod obiektu. Przydatne do eksploracji.",
        "przyklad": "dir([])  # → wszystkie metody listy",
        "kategoria": "built-in",
    },
    "divmod": {
        "opis": "Zwraca jednocześnie wynik dzielenia i resztę z dzielenia jako parę.",
        "przyklad": "divmod(17, 5)  # → (3, 2)",
        "kategoria": "built-in",
    },
    "enumerate": {
        "opis": "Dodaje licznik do iteracji — zwraca pary (indeks, wartość).",
        "przyklad": "for i, v in enumerate(['a','b']): ...",
        "kategoria": "built-in",
    },
    "eval": {
        "opis": "Wykonuje tekst jako wyrażenie Pythona i zwraca wynik. Ostrożnie — ryzyko bezpieczeństwa.",
        "przyklad": "eval('2 + 2')  # → 4",
        "kategoria": "built-in",
    },
    "exec": {
        "opis": "Wykonuje tekst jako kod Pythona. Nie zwraca wartości. Ostrożnie — ryzyko bezpieczeństwa.",
        "przyklad": "exec('x = 5')",
        "kategoria": "built-in",
    },
    "filter": {
        "opis": "Filtruje listę — zostawia tylko elementy dla których funkcja zwraca True.",
        "przyklad": "list(filter(lambda x: x>0, [-1,2,-3,4]))",
        "kategoria": "built-in",
    },
    "float": {
        "opis": "Zamienia wartość na liczbę zmiennoprzecinkową (z przecinkiem).",
        "przyklad": "float('3.14')  # → 3.14",
        "kategoria": "built-in",
    },
    "format": {
        "opis": "Formatuje wartość według podanego wzorca — np. liczbę do 2 miejsc po przecinku.",
        "przyklad": "format(3.14159, '.2f')  # → '3.14'",
        "kategoria": "built-in",
    },
    "frozenset": {
        "opis": "Tworzy niemodyfikowalny zbiór unikalnych elementów.",
        "przyklad": "frozenset([1, 2, 2, 3])  # → {1, 2, 3}",
        "kategoria": "built-in",
    },
    "getattr": {
        "opis": "Pobiera wartość atrybutu obiektu po jego nazwie jako tekście.",
        "przyklad": "getattr(obiekt, 'nazwa', domyslna)",
        "kategoria": "built-in",
    },
    "globals": {
        "opis": "Zwraca słownik wszystkich zmiennych globalnych w bieżącym module.",
        "przyklad": "globals()['x']  # → wartość zmiennej x",
        "kategoria": "built-in",
    },
    "hasattr": {
        "opis": "Sprawdza czy obiekt posiada dany atrybut. Zwraca True lub False.",
        "przyklad": "hasattr(obiekt, 'metoda')",
        "kategoria": "built-in",
    },
    "hash": {
        "opis": "Zwraca unikalny numer (hash) obiektu — używany wewnętrznie przez słowniki i zbiory.",
        "przyklad": "hash('hello')  # → liczba całkowita",
        "kategoria": "built-in",
    },
    "help": {
        "opis": "Wyświetla dokumentację obiektu lub funkcji. Pomocne przy nauce.",
        "przyklad": "help(print)  # → opis funkcji print",
        "kategoria": "built-in",
    },
    "hex": {
        "opis": "Zamienia liczbę całkowitą na zapis szesnastkowy.",
        "przyklad": "hex(255)  # → '0xff'",
        "kategoria": "built-in",
    },
    "id": {
        "opis": "Zwraca unikalny identyfikator obiektu w pamięci. Każdy obiekt ma swoje id.",
        "przyklad": "id(x)  # → np. 140234567",
        "kategoria": "built-in",
    },
    "input": {
        "opis": "Zatrzymuje program i czeka na wpisanie tekstu przez użytkownika.",
        "przyklad": "imie = input('Podaj imię: ')",
        "kategoria": "built-in",
    },
    "int": {
        "opis": "Zamienia wartość na liczbę całkowitą. Odcina część dziesiętną.",
        "przyklad": "int('42')  # → 42",
        "kategoria": "built-in",
    },
    "isinstance": {
        "opis": "Sprawdza czy obiekt jest określonego typu. Zwraca True lub False.",
        "przyklad": "isinstance(42, int)  # → True",
        "kategoria": "built-in",
    },
    "issubclass": {
        "opis": "Sprawdza czy jedna klasa dziedziczy po drugiej.",
        "przyklad": "issubclass(bool, int)  # → True",
        "kategoria": "built-in",
    },
    "iter": {
        "opis": "Tworzy iterator z obiektu — pozwala przechodzić przez elementy jeden po jednym.",
        "przyklad": "it = iter([1,2,3]); next(it)  # → 1",
        "kategoria": "built-in",
    },
    "len": {
        "opis": "Zwraca liczbę elementów w liście, tekście, słowniku lub innej kolekcji.",
        "przyklad": "len([1, 2, 3])  # → 3",
        "kategoria": "built-in",
    },
    "list": {
        "opis": "Tworzy listę — modyfikowalną kolekcję elementów w określonej kolejności.",
        "przyklad": "list('abc')  # → ['a', 'b', 'c']",
        "kategoria": "built-in",
    },
    "locals": {
        "opis": "Zwraca słownik wszystkich zmiennych lokalnych w bieżącej funkcji.",
        "przyklad": "locals()['x']  # → wartość lokalnej zmiennej x",
        "kategoria": "built-in",
    },
    "map": {
        "opis": "Stosuje funkcję do każdego elementu listy — jak pętla for, ale krócej.",
        "przyklad": "list(map(str, [1,2,3]))  # → ['1','2','3']",
        "kategoria": "built-in",
    },
    "max": {
        "opis": "Zwraca największą wartość z listy lub spośród podanych argumentów.",
        "przyklad": "max([3, 1, 4, 1, 5])  # → 5",
        "kategoria": "built-in",
    },
    "memoryview": {
        "opis": "Daje dostęp do wewnętrznej pamięci obiektu bez kopiowania danych.",
        "przyklad": "memoryview(b'hello')",
        "kategoria": "built-in",
    },
    "min": {
        "opis": "Zwraca najmniejszą wartość z listy lub spośród podanych argumentów.",
        "przyklad": "min([3, 1, 4, 1, 5])  # → 1",
        "kategoria": "built-in",
    },
    "next": {
        "opis": "Pobiera następny element z iteratora. Gdy się skończy, rzuca StopIteration.",
        "przyklad": "next(iter([1,2,3]))  # → 1",
        "kategoria": "built-in",
    },
    "object": {
        "opis": "Bazowa klasa wszystkich klas w Pythonie. Każda klasa po niej dziedziczy.",
        "przyklad": "class Moja(object): ...",
        "kategoria": "built-in",
    },
    "oct": {
        "opis": "Zamienia liczbę całkowitą na zapis ósemkowy.",
        "przyklad": "oct(8)  # → '0o10'",
        "kategoria": "built-in",
    },
    "open": {
        "opis": "Otwiera plik do czytania lub pisania. Najlepiej używać z 'with open(...)'.",
        "przyklad": "with open('plik.txt', 'r') as f: ...",
        "kategoria": "built-in",
    },
    "ord": {
        "opis": "Zamienia znak na jego numer kodu Unicode. Odwrotność chr().",
        "przyklad": "ord('A')  # → 65",
        "kategoria": "built-in",
    },
    "pow": {
        "opis": "Podnosi liczbę do potęgi. pow(2,10) = 1024. Opcjonalnie zwraca resztę z modulo.",
        "przyklad": "pow(2, 10)  # → 1024",
        "kategoria": "built-in",
    },
    "print": {
        "opis": "Wyświetla tekst lub wartości na ekranie. Można podać wiele argumentów naraz.",
        "przyklad": "print('Witaj', 'świecie', sep=', ')",
        "kategoria": "built-in",
    },
    "property": {
        "opis": "Dekorator — tworzy właściwość klasy z getter/setter/deleter.",
        "przyklad": "@property\ndef wiek(self): return self._wiek",
        "kategoria": "built-in",
    },
    "range": {
        "opis": "Generuje ciąg liczb całkowitych. Używany głównie w pętlach for.",
        "przyklad": "range(0, 10, 2)  # → 0,2,4,6,8",
        "kategoria": "built-in",
    },
    "repr": {
        "opis": "Zwraca oficjalną tekstową reprezentację obiektu — jak Python go widzi wewnętrznie.",
        "przyklad": "repr([1,2])  # → '[1, 2]'",
        "kategoria": "built-in",
    },
    "reversed": {
        "opis": "Zwraca iterator który przechodzi przez sekwencję od końca do początku.",
        "przyklad": "list(reversed([1,2,3]))  # → [3,2,1]",
        "kategoria": "built-in",
    },
    "round": {
        "opis": "Zaokrągla liczbę do podanej liczby miejsc dziesiętnych.",
        "przyklad": "round(3.14159, 2)  # → 3.14",
        "kategoria": "built-in",
    },
    "set": {
        "opis": "Tworzy zbiór unikalnych elementów — duplikaty są automatycznie usuwane.",
        "przyklad": "set([1,2,2,3])  # → {1,2,3}",
        "kategoria": "built-in",
    },
    "setattr": {
        "opis": "Ustawia wartość atrybutu obiektu po jego nazwie jako tekście.",
        "przyklad": "setattr(obiekt, 'nazwa', wartosc)",
        "kategoria": "built-in",
    },
    "slice": {
        "opis": "Tworzy obiekt reprezentujący wycinek sekwencji — start, stop, krok.",
        "przyklad": "slice(1, 5, 2)  # jak [1:5:2]",
        "kategoria": "built-in",
    },
    "sorted": {
        "opis": "Zwraca nową posortowaną listę nie zmieniając oryginału. Można podać klucz.",
        "przyklad": "sorted([3,1,2])  # → [1,2,3]",
        "kategoria": "built-in",
    },
    "staticmethod": {
        "opis": "Dekorator — tworzy metodę statyczną, która nie potrzebuje self ani cls.",
        "przyklad": "@staticmethod\ndef narzedzie(): ...",
        "kategoria": "built-in",
    },
    "str": {
        "opis": "Zamienia wartość na tekst. Każdy typ danych można zamienić na string.",
        "przyklad": "str(42)  # → '42'",
        "kategoria": "built-in",
    },
    "sum": {
        "opis": "Sumuje wszystkie elementy listy. Można podać wartość startową.",
        "przyklad": "sum([1,2,3,4])  # → 10",
        "kategoria": "built-in",
    },
    "super": {
        "opis": "Daje dostęp do metod klasy nadrzędnej (rodzica). Używane przy dziedziczeniu.",
        "przyklad": "super().__init__()",
        "kategoria": "built-in",
    },
    "tuple": {
        "opis": "Tworzy krotkę — niemodyfikowalną listę. Szybsza niż lista, nie można jej zmieniać.",
        "przyklad": "tuple([1,2,3])  # → (1,2,3)",
        "kategoria": "built-in",
    },
    "type": {
        "opis": "Zwraca typ (klasę) obiektu. Przydatne do debugowania i sprawdzania danych.",
        "przyklad": "type(42)  # → <class 'int'>",
        "kategoria": "built-in",
    },
    "vars": {
        "opis": "Zwraca słownik atrybutów obiektu lub zmiennych lokalnych jeśli bez argumentu.",
        "przyklad": "vars(obiekt)  # → {'x': 1, 'y': 2}",
        "kategoria": "built-in",
    },
    "zip": {
        "opis": "Łączy wiele list w pary — jak zamek błyskawiczny. Zatrzymuje się na najkrótszej.",
        "przyklad": "list(zip([1,2],[3,4]))  # → [(1,3),(2,4)]",
        "kategoria": "built-in",
    },
    "__import__": {
        "opis": "Wewnętrzna funkcja importowania modułów. Normalnie używasz 'import nazwa'.",
        "przyklad": "__import__('os')",
        "kategoria": "built-in",
    },

}
