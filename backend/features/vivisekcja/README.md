# vivisekcja

Analizuje kod krok po kroku — każdy logiczny blok dostaje własny KROK z tabelą objaśnień,
mental modelem i przykładem. Na końcu: kluczowe koncepcje, przepływ danych, checklist rozumienia.

## Endpointy

### `POST /vivisekcja/analyze`
Wysyła kod do Gemini, dostaje z powrotem analizę w Markdown.

**Request:** `{ "code": "..." }`
**Response:** `{ "markdown": "## KROK 1: Importy\n..." }`

## Pliki

| Plik | Co robi |
|------|---------|
| `router.py` | Endpoint FastAPI |
| `service.py` | Prompt Gemini — format krok po kroku z tabelami i mental model |
