"""
Pełny słownik Pythona — opisy po polsku.
Kategorie: built-iny, słowa kluczowe, metody str/list/dict/set, wyjątki, moduły stdlib.
"""

PYTHON_DICTIONARY: dict[str, dict] = {

    # ─────────────────────────────────────────────
    # WBUDOWANE FUNKCJE (built-ins)
    # ─────────────────────────────────────────────

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

    # ─────────────────────────────────────────────
    # SŁOWA KLUCZOWE
    # ─────────────────────────────────────────────

    "def": {
        "opis": "Definiuje nową funkcję — blok kodu który można wielokrotnie wywoływać.",
        "przyklad": "def powitaj(imie): ...",
        "kategoria": "keyword",
    },
    "class": {
        "opis": "Definiuje nową klasę — szablon do tworzenia obiektów.",
        "przyklad": "class Samochod: ...",
        "kategoria": "keyword",
    },
    "return": {
        "opis": "Kończy funkcję i zwraca wartość do miejsca wywołania.",
        "przyklad": "return wynik",
        "kategoria": "keyword",
    },
    "if": {
        "opis": "Sprawdza warunek — kod w środku wykona się tylko gdy warunek jest prawdziwy.",
        "przyklad": "if x > 0: ...",
        "kategoria": "keyword",
    },
    "elif": {
        "opis": "Sprawdza kolejny warunek gdy poprzedni if był fałszywy.",
        "przyklad": "elif x == 0: ...",
        "kategoria": "keyword",
    },
    "else": {
        "opis": "Wykonuje się gdy żaden wcześniejszy if/elif nie był prawdziwy.",
        "przyklad": "else: ...",
        "kategoria": "keyword",
    },
    "for": {
        "opis": "Pętla — powtarza blok kodu dla każdego elementu w kolekcji.",
        "przyklad": "for element in lista: ...",
        "kategoria": "keyword",
    },
    "while": {
        "opis": "Pętla — powtarza blok kodu dopóki warunek jest prawdziwy.",
        "przyklad": "while x > 0: ...",
        "kategoria": "keyword",
    },
    "break": {
        "opis": "Natychmiast kończy pętlę for lub while i wychodzi z niej.",
        "przyklad": "if x == 5: break",
        "kategoria": "keyword",
    },
    "continue": {
        "opis": "Pomija resztę bieżącej iteracji pętli i przechodzi do następnej.",
        "przyklad": "if x < 0: continue",
        "kategoria": "keyword",
    },
    "pass": {
        "opis": "Nic nie robi — placeholder gdy składnia wymaga bloku kodu ale nie masz co wpisać.",
        "przyklad": "def todo(): pass",
        "kategoria": "keyword",
    },
    "import": {
        "opis": "Ładuje moduł (bibliotekę) żebyś mógł użyć jego funkcji.",
        "przyklad": "import os",
        "kategoria": "keyword",
    },
    "from": {
        "opis": "Importuje konkretną funkcję lub klasę z modułu.",
        "przyklad": "from os import path",
        "kategoria": "keyword",
    },
    "as": {
        "opis": "Nadaje alias — krótszą lub inną nazwę importowanemu modułowi lub wyjątkowi.",
        "przyklad": "import numpy as np",
        "kategoria": "keyword",
    },
    "try": {
        "opis": "Blok kodu który może rzucić wyjątek — Python 'próbuje' go wykonać.",
        "przyklad": "try: ...",
        "kategoria": "keyword",
    },
    "except": {
        "opis": "Łapie wyjątek (błąd) i pozwala go obsłużyć zamiast zatrzymywać program.",
        "przyklad": "except ValueError as e: ...",
        "kategoria": "keyword",
    },
    "finally": {
        "opis": "Wykonuje się zawsze po try/except — niezależnie czy był błąd czy nie.",
        "przyklad": "finally: plik.close()",
        "kategoria": "keyword",
    },
    "raise": {
        "opis": "Rzuca wyjątek — sygnalizuje że coś poszło nie tak.",
        "przyklad": "raise ValueError('Zła wartość')",
        "kategoria": "keyword",
    },
    "with": {
        "opis": "Otwiera zasób (np. plik) i automatycznie go zamyka po wyjściu z bloku.",
        "przyklad": "with open('plik.txt') as f: ...",
        "kategoria": "keyword",
    },
    "lambda": {
        "opis": "Tworzy małą anonimową funkcję w jednej linii.",
        "przyklad": "podwoj = lambda x: x * 2",
        "kategoria": "keyword",
    },
    "yield": {
        "opis": "Zwraca wartość z generatora i pauzuje funkcję — nie kończy jej jak return.",
        "przyklad": "yield wartosc",
        "kategoria": "keyword",
    },
    "async": {
        "opis": "Oznacza funkcję jako asynchroniczną — może być wstrzymana bez blokowania programu.",
        "przyklad": "async def pobierz(): ...",
        "kategoria": "keyword",
    },
    "await": {
        "opis": "Czeka na wynik asynchronicznej operacji nie blokując reszty programu.",
        "przyklad": "dane = await pobierz()",
        "kategoria": "keyword",
    },
    "global": {
        "opis": "Mówi że zmienna wewnątrz funkcji to ta sama co na poziomie modułu.",
        "przyklad": "global licznik",
        "kategoria": "keyword",
    },
    "nonlocal": {
        "opis": "Mówi że zmienna wewnątrz funkcji zagnieżdżonej pochodzi z funkcji zewnętrznej.",
        "przyklad": "nonlocal x",
        "kategoria": "keyword",
    },
    "del": {
        "opis": "Usuwa zmienną, element listy lub atrybut obiektu z pamięci.",
        "przyklad": "del lista[0]",
        "kategoria": "keyword",
    },
    "in": {
        "opis": "Sprawdza czy element należy do kolekcji. Zwraca True lub False.",
        "przyklad": "if 'a' in 'abc': ...",
        "kategoria": "keyword",
    },
    "not": {
        "opis": "Odwraca wartość logiczną — True staje się False i odwrotnie.",
        "przyklad": "not True  # → False",
        "kategoria": "keyword",
    },
    "and": {
        "opis": "Logiczne I — True tylko gdy oba warunki są prawdziwe.",
        "przyklad": "if x > 0 and x < 10: ...",
        "kategoria": "keyword",
    },
    "or": {
        "opis": "Logiczne LUB — True gdy choć jeden warunek jest prawdziwy.",
        "przyklad": "if x < 0 or x > 100: ...",
        "kategoria": "keyword",
    },
    "is": {
        "opis": "Sprawdza czy dwie zmienne wskazują na TEN SAM obiekt w pamięci (nie tylko równe wartości).",
        "przyklad": "if x is None: ...",
        "kategoria": "keyword",
    },
    "assert": {
        "opis": "Sprawdza warunek i rzuca AssertionError jeśli jest fałszywy. Używane w testach.",
        "przyklad": "assert wynik == 42, 'Zły wynik'",
        "kategoria": "keyword",
    },
    "True": {
        "opis": "Wartość logiczna 'prawda'.",
        "przyklad": "x = True",
        "kategoria": "keyword",
    },
    "False": {
        "opis": "Wartość logiczna 'fałsz'.",
        "przyklad": "x = False",
        "kategoria": "keyword",
    },
    "None": {
        "opis": "Reprezentuje brak wartości — jak 'nic'. Funkcje bez return zwracają None.",
        "przyklad": "x = None",
        "kategoria": "keyword",
    },

    # ─────────────────────────────────────────────
    # METODY STRINGÓW
    # ─────────────────────────────────────────────

    "upper": {
        "opis": "Zamienia wszystkie litery w tekście na WIELKIE.",
        "przyklad": "'hello'.upper()  # → 'HELLO'",
        "kategoria": "str_method",
    },
    "lower": {
        "opis": "Zamienia wszystkie litery w tekście na małe.",
        "przyklad": "'HELLO'.lower()  # → 'hello'",
        "kategoria": "str_method",
    },
    "strip": {
        "opis": "Usuwa białe znaki (spacje, entery) z początku i końca tekstu.",
        "przyklad": "'  hello  '.strip()  # → 'hello'",
        "kategoria": "str_method",
    },
    "lstrip": {
        "opis": "Usuwa białe znaki tylko z lewej strony tekstu.",
        "przyklad": "'  hello  '.lstrip()  # → 'hello  '",
        "kategoria": "str_method",
    },
    "rstrip": {
        "opis": "Usuwa białe znaki tylko z prawej strony tekstu.",
        "przyklad": "'  hello  '.rstrip()  # → '  hello'",
        "kategoria": "str_method",
    },
    "split": {
        "opis": "Dzieli tekst na listę fragmentów według podanego separatora.",
        "przyklad": "'a,b,c'.split(',')  # → ['a','b','c']",
        "kategoria": "str_method",
    },
    "join": {
        "opis": "Łączy elementy listy w jeden tekst wstawiając separator między nimi.",
        "przyklad": "', '.join(['a','b','c'])  # → 'a, b, c'",
        "kategoria": "str_method",
    },
    "replace": {
        "opis": "Zamienia wszystkie wystąpienia jednego fragmentu tekstu na inny.",
        "przyklad": "'hello world'.replace('world', 'Python')",
        "kategoria": "str_method",
    },
    "find": {
        "opis": "Szuka fragmentu w tekście i zwraca indeks pierwszego wystąpienia. -1 jeśli brak.",
        "przyklad": "'hello'.find('ll')  # → 2",
        "kategoria": "str_method",
    },
    "startswith": {
        "opis": "Sprawdza czy tekst zaczyna się od podanego fragmentu.",
        "przyklad": "'hello'.startswith('he')  # → True",
        "kategoria": "str_method",
    },
    "endswith": {
        "opis": "Sprawdza czy tekst kończy się podanym fragmentem.",
        "przyklad": "'hello'.endswith('lo')  # → True",
        "kategoria": "str_method",
    },
    "count": {
        "opis": "Liczy ile razy podany fragment pojawia się w tekście.",
        "przyklad": "'banana'.count('a')  # → 3",
        "kategoria": "str_method",
    },
    "encode": {
        "opis": "Zamienia tekst na bajty według podanego kodowania (domyślnie UTF-8).",
        "przyklad": "'hello'.encode('utf-8')",
        "kategoria": "str_method",
    },
    "title": {
        "opis": "Zamienia pierwsze litery każdego słowa na wielkie.",
        "przyklad": "'hello world'.title()  # → 'Hello World'",
        "kategoria": "str_method",
    },
    "capitalize": {
        "opis": "Zamienia tylko pierwszą literę całego tekstu na wielką.",
        "przyklad": "'hello world'.capitalize()  # → 'Hello world'",
        "kategoria": "str_method",
    },
    "isdigit": {
        "opis": "Sprawdza czy tekst zawiera wyłącznie cyfry.",
        "przyklad": "'123'.isdigit()  # → True",
        "kategoria": "str_method",
    },
    "isalpha": {
        "opis": "Sprawdza czy tekst zawiera wyłącznie litery.",
        "przyklad": "'abc'.isalpha()  # → True",
        "kategoria": "str_method",
    },
    "isalnum": {
        "opis": "Sprawdza czy tekst zawiera wyłącznie litery i cyfry (bez spacji i znaków).",
        "przyklad": "'abc123'.isalnum()  # → True",
        "kategoria": "str_method",
    },
    "zfill": {
        "opis": "Uzupełnia tekst zerami z lewej strony do podanej długości.",
        "przyklad": "'42'.zfill(5)  # → '00042'",
        "kategoria": "str_method",
    },
    "center": {
        "opis": "Wyśrodkowuje tekst w polu o podanej szerokości, wypełniając spacjami.",
        "przyklad": "'hi'.center(10)  # → '    hi    '",
        "kategoria": "str_method",
    },
    "format": {
        "opis": "Wstawia wartości w miejsca {} w tekście.",
        "przyklad": "'{} ma {} lat'.format('Jan', 30)",
        "kategoria": "str_method",
    },

    # ─────────────────────────────────────────────
    # METODY LIST
    # ─────────────────────────────────────────────

    "append": {
        "opis": "Dodaje element na koniec listy.",
        "przyklad": "lista.append(42)",
        "kategoria": "list_method",
    },
    "extend": {
        "opis": "Dodaje wszystkie elementy innej listy na koniec tej listy.",
        "przyklad": "lista.extend([4,5,6])",
        "kategoria": "list_method",
    },
    "insert": {
        "opis": "Wstawia element na podanej pozycji w liście.",
        "przyklad": "lista.insert(0, 'pierwszy')",
        "kategoria": "list_method",
    },
    "remove": {
        "opis": "Usuwa pierwsze wystąpienie podanej wartości z listy.",
        "przyklad": "lista.remove('stary')",
        "kategoria": "list_method",
    },
    "pop": {
        "opis": "Usuwa i zwraca element z podanej pozycji (domyślnie ostatni).",
        "przyklad": "ostatni = lista.pop()",
        "kategoria": "list_method",
    },
    "clear": {
        "opis": "Usuwa wszystkie elementy z listy — lista staje się pusta.",
        "przyklad": "lista.clear()",
        "kategoria": "list_method",
    },
    "index": {
        "opis": "Zwraca indeks pierwszego wystąpienia wartości w liście.",
        "przyklad": "lista.index('szukana')  # → 3",
        "kategoria": "list_method",
    },
    "sort": {
        "opis": "Sortuje listę w miejscu — modyfikuje oryginalną listę.",
        "przyklad": "lista.sort(reverse=True)",
        "kategoria": "list_method",
    },
    "reverse": {
        "opis": "Odwraca kolejność elementów listy w miejscu.",
        "przyklad": "lista.reverse()",
        "kategoria": "list_method",
    },
    "copy": {
        "opis": "Tworzy płytką kopię listy — nową listę z tymi samymi elementami.",
        "przyklad": "nowa = lista.copy()",
        "kategoria": "list_method",
    },

    # ─────────────────────────────────────────────
    # METODY SŁOWNIKÓW
    # ─────────────────────────────────────────────

    "keys": {
        "opis": "Zwraca widok wszystkich kluczy słownika.",
        "przyklad": "slownik.keys()  # → dict_keys(['a','b'])",
        "kategoria": "dict_method",
    },
    "values": {
        "opis": "Zwraca widok wszystkich wartości słownika.",
        "przyklad": "slownik.values()",
        "kategoria": "dict_method",
    },
    "items": {
        "opis": "Zwraca widok par (klucz, wartość) słownika — idealne do iteracji.",
        "przyklad": "for k, v in slownik.items(): ...",
        "kategoria": "dict_method",
    },
    "get": {
        "opis": "Pobiera wartość klucza ze słownika. Zwraca None (lub domyślną) gdy klucz nie istnieje.",
        "przyklad": "slownik.get('klucz', 'domyslna')",
        "kategoria": "dict_method",
    },
    "update": {
        "opis": "Aktualizuje słownik danymi z innego słownika — dodaje i nadpisuje klucze.",
        "przyklad": "slownik.update({'nowy': 1})",
        "kategoria": "dict_method",
    },
    "setdefault": {
        "opis": "Zwraca wartość klucza. Jeśli klucz nie istnieje — dodaje go z podaną wartością.",
        "przyklad": "slownik.setdefault('klucz', [])",
        "kategoria": "dict_method",
    },

    # ─────────────────────────────────────────────
    # METODY ZBIORÓW (SET)
    # ─────────────────────────────────────────────

    "add": {
        "opis": "Dodaje element do zbioru. Jeśli już istnieje — nic się nie dzieje.",
        "przyklad": "zbior.add(42)",
        "kategoria": "set_method",
    },
    "discard": {
        "opis": "Usuwa element ze zbioru. Nie rzuca błędu gdy element nie istnieje.",
        "przyklad": "zbior.discard(42)",
        "kategoria": "set_method",
    },
    "union": {
        "opis": "Zwraca nowy zbiór zawierający elementy z obu zbiorów (suma).",
        "przyklad": "a.union(b)  # → {1,2,3,4}",
        "kategoria": "set_method",
    },
    "intersection": {
        "opis": "Zwraca nowy zbiór zawierający tylko elementy wspólne dla obu zbiorów.",
        "przyklad": "a.intersection(b)  # → {2,3}",
        "kategoria": "set_method",
    },
    "difference": {
        "opis": "Zwraca elementy które są w pierwszym zbiorze ale nie w drugim.",
        "przyklad": "a.difference(b)",
        "kategoria": "set_method",
    },
    "issubset": {
        "opis": "Sprawdza czy wszystkie elementy tego zbioru są w podanym zbiorze.",
        "przyklad": "{1,2}.issubset({1,2,3})  # → True",
        "kategoria": "set_method",
    },

    # ─────────────────────────────────────────────
    # WYJĄTKI
    # ─────────────────────────────────────────────

    "Exception": {
        "opis": "Bazowa klasa wszystkich wyjątków. Łapie każdy błąd.",
        "przyklad": "except Exception as e: print(e)",
        "kategoria": "exception",
    },
    "ValueError": {
        "opis": "Rzucany gdy funkcja dostaje argument złego typu wartości (np. int('abc')).",
        "przyklad": "raise ValueError('Oczekiwano liczby')",
        "kategoria": "exception",
    },
    "TypeError": {
        "opis": "Rzucany gdy operacja jest wykonywana na złym typie danych.",
        "przyklad": "1 + 'a'  # TypeError",
        "kategoria": "exception",
    },
    "KeyError": {
        "opis": "Rzucany gdy klucz nie istnieje w słowniku.",
        "przyklad": "slownik['nieistniejacy']  # KeyError",
        "kategoria": "exception",
    },
    "IndexError": {
        "opis": "Rzucany gdy indeks jest poza zakresem listy.",
        "przyklad": "lista[99]  # IndexError gdy lista ma 3 elementy",
        "kategoria": "exception",
    },
    "AttributeError": {
        "opis": "Rzucany gdy obiekt nie ma danego atrybutu lub metody.",
        "przyklad": "(42).upper()  # AttributeError",
        "kategoria": "exception",
    },
    "ImportError": {
        "opis": "Rzucany gdy nie można zaimportować modułu.",
        "przyklad": "import nieistniejacy_modul  # ImportError",
        "kategoria": "exception",
    },
    "FileNotFoundError": {
        "opis": "Rzucany gdy próbujesz otworzyć plik który nie istnieje.",
        "przyklad": "open('brak.txt')  # FileNotFoundError",
        "kategoria": "exception",
    },
    "OSError": {
        "opis": "Rzucany przy błędach systemu operacyjnego — pliki, uprawnienia, procesy.",
        "przyklad": "except OSError as e: ...",
        "kategoria": "exception",
    },
    "RuntimeError": {
        "opis": "Rzucany gdy błąd nie pasuje do żadnej innej kategorii.",
        "przyklad": "raise RuntimeError('Nieoczekiwany stan')",
        "kategoria": "exception",
    },
    "StopIteration": {
        "opis": "Sygnalizuje że iterator nie ma więcej elementów. Automatycznie łapany przez for.",
        "przyklad": "next(iter([]))  # StopIteration",
        "kategoria": "exception",
    },
    "NameError": {
        "opis": "Rzucany gdy używasz zmiennej która nie została wcześniej zdefiniowana.",
        "przyklad": "print(x)  # NameError gdy x nie istnieje",
        "kategoria": "exception",
    },
    "ZeroDivisionError": {
        "opis": "Rzucany przy próbie dzielenia przez zero.",
        "przyklad": "1 / 0  # ZeroDivisionError",
        "kategoria": "exception",
    },
    "PermissionError": {
        "opis": "Rzucany gdy brak uprawnień do wykonania operacji na pliku lub zasobie.",
        "przyklad": "open('/root/plik')  # PermissionError",
        "kategoria": "exception",
    },
    "RecursionError": {
        "opis": "Rzucany gdy funkcja wywołuje samą siebie zbyt wiele razy — za głęboka rekurencja.",
        "przyklad": "def f(): f()  # RecursionError",
        "kategoria": "exception",
    },
    "OverflowError": {
        "opis": "Rzucany gdy wynik operacji matematycznej jest za duży dla danego typu.",
        "przyklad": "float('inf') + float('inf')",
        "kategoria": "exception",
    },
    "MemoryError": {
        "opis": "Rzucany gdy program nie może przydzielić pamięci — skończyła się RAM.",
        "przyklad": "[0] * 10**12  # MemoryError",
        "kategoria": "exception",
    },
    "AssertionError": {
        "opis": "Rzucany gdy warunek w assert jest fałszywy.",
        "przyklad": "assert 1 == 2  # AssertionError",
        "kategoria": "exception",
    },
    "NotImplementedError": {
        "opis": "Rzucany w metodach które muszą być zaimplementowane przez podklasę.",
        "przyklad": "raise NotImplementedError('Zaimplementuj w podklasie')",
        "kategoria": "exception",
    },

    # ─────────────────────────────────────────────
    # POPULARNE MODUŁY STDLIB
    # ─────────────────────────────────────────────

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


def lookup(nazwa: str) -> dict | None:
    return PYTHON_DICTIONARY.get(nazwa)


def get_all_names() -> list[str]:
    return list(PYTHON_DICTIONARY.keys())
