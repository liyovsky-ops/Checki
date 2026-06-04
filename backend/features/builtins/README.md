# builtins

Słownik wbudowanych funkcji, słów kluczowych i metod Pythona — 194 wpisy, opisy po polsku.
Wykrywa tokeny Pythona w kodzie i zwraca ich definicje (używane przez dymki hover w demo).

## Endpointy

### `POST /builtins/detect`
Wykrywa które tokeny Pythona z kodzie należą do słownika — zwraca listę pasujących wpisów.

**Request:** `{ "code": "..." }`
**Response:** `{ "found": [{ "nazwa": "print", "opis": "...", "przyklad": "...", "kategoria": "built-in" }] }`

---

### `GET /builtins/dictionary`
Zwraca cały słownik — wszystkie 194 wpisy.

**Response:** `{ "dictionary": { "print": {...}, "len": {...}, ... } }`

## Struktura słownika

Słownik podzielony na osobne pliki per-kategoria (każdy < 200 linii):

| Plik | Kategoria | Wpisów |
|------|-----------|--------|
| `dict_builtins.py` | Wbudowane funkcje (abs, len, print...) | ~70 |
| `dict_keywords.py` | Słowa kluczowe (def, class, return...) | ~35 |
| `dict_strings.py` | Metody stringów (.upper, .split...) | ~30 |
| `dict_lists.py` | Metody list (.append, .sort...) | ~15 |
| `dict_dicts.py` | Metody słowników (.get, .keys...) | ~10 |
| `dict_sets.py` | Metody zbiorów (.add, .union...) | ~10 |
| `dict_exceptions.py` | Wyjątki (ValueError, TypeError...) | ~25 |
| `dict_stdlib.py` | Popularne moduły stdlib (os, json...) | ~25 |

`dictionary.py` importuje je wszystkie i scala w jeden `PYTHON_DICTIONARY`.
