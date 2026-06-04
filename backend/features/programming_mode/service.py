from shared.gemini_client import ask_gemini

MODE_PROMPTS = {
    "eco": """Przepisz poniższy kod w Pythonie tak, żeby był jak najprostszy i miał minimum abstrakcji.
- Zero klas jeśli nie są konieczne
- Żadnych helperów, wrapperów ani warstw pośrednich
- Płaski, liniowy kod — krok po kroku
- Najkrótsze nazwy zmiennych które wciąż mają sens
- Zachowaj dokładnie tą samą funkcjonalność

Kod do przepisania:
{code}

Odpowiedz TYLKO kodem, bez żadnych komentarzy ani wyjaśnień.""",

    "comfort": """Przepisz poniższy kod w Pythonie jako solidny, czytelny kod produkcyjny.
- Dobre nazwy zmiennych i funkcji
- Rozsądny podział na funkcje
- Obsługa podstawowych błędów
- Czytelna struktura, łatwa do utrzymania
- Zachowaj dokładnie tą samą funkcjonalność

Kod do przepisania:
{code}

Odpowiedz TYLKO kodem, bez żadnych komentarzy ani wyjaśnień.""",

    "sport": """Przepisz poniższy kod w Pythonie z naciskiem na maksymalną wydajność.
- Unikaj zbędnych alokacji pamięci
- Używaj wbudowanych funkcji i struktur danych które są szybsze (np. set zamiast list do wyszukiwania)
- Minimalizuj liczbę operacji w pętlach
- Używaj list comprehensions, generatorów gdzie to przyspiesza
- Zachowaj dokładnie tą samą funkcjonalność

Kod do przepisania:
{code}

Odpowiedz TYLKO kodem, bez żadnych komentarzy ani wyjaśnień.""",

    "enterprise": """Przepisz poniższy kod w Pythonie z naciskiem na skalowalność i testowalność.
- Zastosuj wzorce które ułatwiają testowanie (dependency injection, interfejsy)
- Podziel logikę na małe, testowalne jednostki
- Użyj type hints wszędzie
- Obsługa błędów przez wyjątki z jawnymi typami
- Zachowaj dokładnie tą samą funkcjonalność

Kod do przepisania:
{code}

Odpowiedz TYLKO kodem, bez żadnych komentarzy ani wyjaśnień.""",

    "security": """Przepisz poniższy kod w Pythonie z naciskiem na bezpieczeństwo.
- Waliduj wszystkie dane wejściowe
- Unikaj eval, exec, i dynamicznego wykonywania kodu
- Używaj bezpiecznych alternatyw dla operacji na plikach i zasobach
- Obsługuj błędy bez ujawniania szczegółów systemu
- Zasada minimalnych uprawnień — kod ma dostęp tylko do tego czego potrzebuje
- Zachowaj dokładnie tą samą funkcjonalność

Kod do przepisania:
{code}

Odpowiedz TYLKO kodem, bez żadnych komentarzy ani wyjaśnień.""",
}


def rewrite_code(code: str, mode: str) -> str:
    prompt = MODE_PROMPTS[mode].format(code=code)
    return ask_gemini(prompt)
