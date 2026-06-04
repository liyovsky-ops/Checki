"""
WYJĄTKI
"""

EXCEPTIONS: dict[str, dict] = {


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

}
