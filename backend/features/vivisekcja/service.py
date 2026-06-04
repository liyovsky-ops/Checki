from shared.gemini_client import ask_gemini

PROMPT_TEMPLATE = """Jesteś ekspertem który tłumaczy kod programistyczny osobom uczącym się programowania.

Przeanalizuj poniższy kod KROK PO KROKU. Każdy logiczny blok kodu to osobny krok.

Dla każdego kroku zwróć:
- numer kroku i tytuł (np. "KROK 1: Importy")
- fragment kodu którego dotyczy krok (cytuj dokładnie z oryginału)
- tabelę z objaśnieniami każdego elementu (2 kolumny: Element | Znaczenie)
- "Mental model" — jedno zdanie intuicji co się tu dzieje, zaczyna się od "Mental model:"
- ewentualnie "Uwaga:" jeśli jest coś ważnego do zapamiętania

Na końcu dodaj:
- sekcję "KLUCZOWE KONCEPCJE" — tabela 2 kolumny: Koncept | Wyjaśnienie
- sekcję "PRZEPŁYW DANYCH" — krótki opis jak dane przechodzą przez kod (format: A → B → C)
- sekcję "CO TERAZ ROZUMIESZ" — tabela 2 kolumny: Koncept | Rozumiesz? (wartość zawsze ✅)

Pisz po polsku. Zero żargonu — jeśli musisz użyć terminu technicznego, wyjaśnij go w nawiasie.
Odpowiedz w formacie Markdown.

Kod do analizy:
{code}"""


def vivisect_code(code: str) -> str:
    prompt = PROMPT_TEMPLATE.format(code=code)
    return ask_gemini(prompt)
