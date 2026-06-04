"""
SŁOWA KLUCZOWE
"""

KEYWORDS: dict[str, dict] = {


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

}
