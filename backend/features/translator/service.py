import json
from shared.gemini_client import ask_gemini

PROMPT_TEMPLATE = """Jesteś asystentem który pomaga osobom uczącym się programowania zrozumieć kod.

Wytłumacz poniższy kod prostym, codziennym językiem polskim.
- Żadnego żargonu technicznego — jeśli musisz użyć pojęcia (np. "pętla"), wyjaśnij je jednym słowem w nawiasie
- Pisz tak, jakbyś tłumaczył komuś kto nigdy nie programował
- Maksymalnie 5 zdań
- Skup się na TYM CO KOD ROBI, nie na tym jak jest zbudowany

Kod:
{code}"""

LINES_PROMPT_TEMPLATE = """Jesteś asystentem który pomaga osobom uczącym się programowania zrozumieć kod.

Przetłumacz każdą linię kodu na prosty, codzienny język polski.
Zasady:
- Żadnego żargonu — jeśli musisz użyć pojęcia technicznego, wyjaśnij je jednym słowem w nawiasie
- Pisz tak, jakbyś tłumaczył komuś kto nigdy nie programował
- Jedno zdanie na linię, maksymalnie krótkie
- Puste linie i linie z samymi nawiasami/wcięciami — pomiń (zwróć pusty string)
- Zwróć TYLKO obiekt JSON, bez żadnego markdownu ani wyjaśnień

Format odpowiedzi (numery linii zaczynają się od 1):
{{
  "1": "tłumaczenie pierwszej linii",
  "2": "tłumaczenie drugiej linii",
  "3": ""
}}

Kod do przetłumaczenia:
{code}"""


def translate_code(code: str) -> str:
    prompt = PROMPT_TEMPLATE.format(code=code)
    return ask_gemini(prompt)


def translate_lines(code: str) -> dict:
    prompt = LINES_PROMPT_TEMPLATE.format(code=code)
    raw = ask_gemini(prompt)
    # usuń markdown code block jeśli Gemini go dodał
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
    return json.loads(cleaned.strip())
