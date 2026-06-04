"""
METODY STRINGÓW
"""

STRINGS: dict[str, dict] = {


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

}
