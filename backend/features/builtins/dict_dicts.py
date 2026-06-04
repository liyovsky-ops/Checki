"""
METODY SŁOWNIKÓW
"""

DICTS: dict[str, dict] = {


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

}
