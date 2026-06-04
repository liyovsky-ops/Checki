"""
METODY LIST
"""

LISTS: dict[str, dict] = {


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

}
