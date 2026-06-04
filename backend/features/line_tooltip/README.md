# line_tooltip

Analizuje kod i tworzy mapę bloków logicznych — każda linia należy do jakiegoś bloku z opisem.
Jeden call do Gemini analizuje cały kod, potem lookups są lokalne (bez LLM).

## Endpointy

### `POST /line-tooltip/analyze`
Wysyła cały kod do Gemini — dostaje z powrotem listę bloków logicznych.
Jeden blok = zakres linii + nazwa bloku + wyjaśnienie po polsku.

**Request:** `{ "code": "..." }`
**Response:**
```json
{
  "blocks": [
    { "start": 1, "end": 5, "blok": "importy", "wyjasnienie": "..." },
    { "start": 6, "end": 12, "blok": "funkcja main", "wyjasnienie": "..." }
  ],
  "total_lines": 12
}
```

---

### `POST /line-tooltip/lookup`
Szuka bloku dla konkretnej linii — bez wywołania LLM, czysto po stronie serwera.

**Request:** `{ "blocks": [...], "line_number": 7 }`
**Response:** `{ "blok": "funkcja main", "wyjasnienie": "..." }`

## Pliki

| Plik | Co robi |
|------|---------|
| `router.py` | Definicja endpointów FastAPI |
| `service.py` | Prompt analizy bloków + funkcja lookup |
