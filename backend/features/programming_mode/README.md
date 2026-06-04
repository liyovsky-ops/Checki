# programming_mode

Przepisuje kod w jednym z 5 trybów programowania — każdy tryb ma inną filozofię i styl.

## Endpointy

### `POST /programming-mode/rewrite`
Przepisuje kod zgodnie z wybranym trybem — Gemini dostaje kod + prompt trybu.

**Request:** `{ "code": "...", "mode": "eco" }`
**Response:** `{ "rewritten_code": "..." }`

## Tryby

| Tryb | Filozofia |
|------|-----------|
| `eco` | Minimalny kod — jak najmniej linii, czytelność ponad wszystko |
| `comfort` | Czytelny i przyjemny — jak podręcznik do programowania |
| `sport` | Wydajny — optymalizacje, szybkość, mniej alokacji |
| `enterprise` | Korporacyjny — pełna dokumentacja, typy, logowanie, obsługa błędów |
| `security` | Bezpieczny — walidacja inputów, brak podatności, defensive coding |

## Pliki

| Plik | Co robi |
|------|---------|
| `router.py` | Endpoint FastAPI, walidacja trybu |
| `service.py` | 5 promptów (jeden per tryb) + wywołanie Gemini |
