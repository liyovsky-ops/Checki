# dead_code

Wykrywa martwy kod — fragmenty które nigdy się nie wykonają lub są zbędne.

## Endpoint

### `POST /dead-code/detect`

**Request:** `{ "code": "..." }`
**Response:**
```json
{
  "dead": [
    {
      "lines": [18, 19, 20],
      "type": "unused_function",
      "label": "Nieużywana funkcja",
      "reason": "Funkcja old_get_users() jest zdefiniowana ale nigdy nie jest wywoływana."
    }
  ]
}
```

## Co wykrywa

| Typ | Opis |
|-----|------|
| `unused_function` | Funkcja nigdy nie wywoływana |
| `unreachable_code` | Kod po return/break/raise |
| `unused_variable` | Zmienna przypisana ale nieużyta |
| `unused_import` | Import którego nie używa żadna linia |
| `dead_condition` | Warunek zawsze True lub False |
