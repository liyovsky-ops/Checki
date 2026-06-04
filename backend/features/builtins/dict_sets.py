"""
METODY ZBIORÓW (SET)
"""

SETS: dict[str, dict] = {


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

}
