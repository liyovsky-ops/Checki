from shared.gemini_client import ask_gemini

PROMPT_TEMPLATE = """Jesteś asystentem który pomaga osobom uczącym się programowania zrozumieć kod.

Wytłumacz poniższy kod prostym, codziennym językiem polskim.
- Żadnego żargonu technicznego — jeśli musisz użyć pojęcia (np. "pętla"), wyjaśnij je jednym słowem w nawiasie
- Pisz tak, jakbyś tłumaczył komuś kto nigdy nie programował
- Maksymalnie 5 zdań
- Skup się na TYM CO KOD ROBI, nie na tym jak jest zbudowany

Kod:
{code}"""


def translate_code(code: str) -> str:
    prompt = PROMPT_TEMPLATE.format(code=code)
    return ask_gemini(prompt)
