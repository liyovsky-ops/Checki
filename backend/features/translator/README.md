# translator

Tłumaczy kod na prosty język polski — bez żargonu, dla osób uczących się programowania.

## Endpointy

### `POST /translator/explain`
Tłumaczy cały kod jednym promptem — zwraca max 5 zdań opisujących CO kod robi.

**Request:** `{ "code": "..." }`
**Response:** `{ "response": "Tekst tłumaczenia..." }`

---

### `POST /translator/explain-lines`
Tłumaczy każdą linię kodu osobno — zwraca mapę numer linii → tłumaczenie.
Używane przez drawer tłumacza w demo (widok "przypisy").

**Request:** `{ "code": "..." }`
**Response:** `{ "lines": { "1": "tekst", "2": "tekst", ... } }`

Puste linie i linie z samymi nawiasami zwracają pusty string `""`.

## Pliki

| Plik | Co robi |
|------|---------|
| `router.py` | Definicja endpointów FastAPI |
| `service.py` | Logika promptów Gemini — dwa tryby: całościowy i per-linia |
