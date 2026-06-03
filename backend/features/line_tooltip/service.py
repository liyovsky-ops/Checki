import json
from shared.gemini_client import ask_gemini

ANALYZE_PROMPT = """Jesteś analizatorem kodu. Przeanalizuj CAŁY poniższy kod i podziel go na logiczne bloki.

Dla każdego bloku podaj:
- start: numer pierwszej linii bloku (numeracja od 1)
- end: numer ostatniej linii bloku
- blok: krótka nazwa np. "funkcja oblicz_podatek" lub "klasa Koszyk"
- wyjasnienie: wyjaśnienie prostym językiem polskim, max 3 zdania, zero żargonu technicznego

WAŻNE: Każda linia kodu musi należeć do jakiegoś bloku. Bloki nie mogą się nakładać.
Odpowiedz TYLKO poprawnym JSON, bez żadnego tekstu poza nawiasami:

{{
  "blocks": [
    {{"start": 1, "end": 5, "blok": "...", "wyjasnienie": "..."}},
    {{"start": 6, "end": 12, "blok": "...", "wyjasnienie": "..."}}
  ]
}}

Kod:
{code}"""


def analyze_code(code: str) -> dict:
    prompt = ANALYZE_PROMPT.format(code=code)
    raw = ask_gemini(prompt)

    # Wytnij JSON jeśli Gemini owinął go w markdown
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    data = json.loads(raw)
    return {"blocks": data["blocks"], "total_lines": len(code.splitlines())}


def lookup_line(blocks: list, line_number: int) -> dict:
    for block in blocks:
        if block["start"] <= line_number <= block["end"]:
            return block
    return {"blok": "Nieznany blok", "wyjasnienie": "Nie udało się przypisać tej linii do żadnego bloku."}
