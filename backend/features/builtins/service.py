import re
from .dictionary import PYTHON_DICTIONARY

# Wzorzec: słowo które pojawia się jako identyfikator (nie część dłuższego słowa)
_PATTERN = re.compile(r'\b(' + '|'.join(re.escape(k) for k in PYTHON_DICTIONARY) + r')\b')


def detect(code: str) -> list[dict]:
    """
    Skanuje kod i zwraca listę wszystkich znalezionych słów kluczowych/funkcji
    wraz z ich pozycją (linia, kolumna) i opisem ze słownika.
    """
    wyniki = []
    for nr_linii, linia in enumerate(code.splitlines(), start=1):
        for match in _PATTERN.finditer(linia):
            nazwa = match.group(1)
            wpis = PYTHON_DICTIONARY[nazwa]
            wyniki.append({
                "nazwa": nazwa,
                "linia": nr_linii,
                "col_start": match.start(),
                "col_end": match.end(),
                "opis": wpis["opis"],
                "przyklad": wpis["przyklad"],
                "kategoria": wpis["kategoria"],
            })
    return wyniki
