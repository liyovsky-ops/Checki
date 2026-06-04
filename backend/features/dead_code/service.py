import json
from shared.gemini_client import ask_gemini

PROMPT_TEMPLATE = """Jesteś analizatorem kodu. Znajdź w poniższym kodzie MARTWY KOD.

MARTWY KOD to wyłącznie:
1. Funkcja zdefiniowana (def ...) ale NIGDZIE w kodzie nie wywoływana
2. Kod który fizycznie nie może się wykonać — np. linie po return/raise/break na tym samym poziomie wcięcia
3. Import modułu który nie jest używany NIGDZIE w kodzie
4. Zmienna przypisana i od razu nadpisana bez użycia (np. x = 1, x = 2 — pierwsze przypisanie martwe)

NIE oznaczaj jako martwy kod:
- Zmiennych lokalnych używanych w tej samej funkcji (conn, users, result itp.)
- Parametrów funkcji
- Zmiennych zwracanych przez return
- Czegokolwiek co jest używane choćby raz poniżej

Bądź KONSERWATYWNY — lepiej pominąć wątpliwy przypadek niż błędnie oznaczyć działający kod.

Dla każdego znalezionego problemu podaj:
- lines: lista numerów linii których dotyczy (numeracja od 1)
- type: typ problemu po angielsku (unused_function / unreachable_code / unused_import / overwritten_variable)
- label: krótka nazwa po polsku
- reason: wyjaśnienie prostym językiem polskim — dlaczego to martwy kod

Jeśli nie ma martwego kodu — zwróć pustą listę.
Odpowiedz TYLKO poprawnym JSON, bez markdown:

{{
  "dead": [
    {{
      "lines": [18, 19, 20],
      "type": "unused_function",
      "label": "Nieużywana funkcja",
      "reason": "Funkcja old_get_users() jest zdefiniowana ale nigdy nie jest wywoływana w kodzie."
    }}
  ]
}}

Kod:
{code}"""


def detect_dead_code(code: str) -> list:
    prompt = PROMPT_TEMPLATE.format(code=code)
    raw = ask_gemini(prompt)

    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()

    data = json.loads(cleaned)
    return data.get("dead", [])
