"""
Słownik Pythona — scala wszystkie kategorie w jeden dict.
Kategorie trzymane są w osobnych plikach dict_*.py.
"""

from .dict_builtins import BUILTINS
from .dict_keywords import KEYWORDS
from .dict_strings import STRINGS
from .dict_lists import LISTS
from .dict_dicts import DICTS
from .dict_sets import SETS
from .dict_exceptions import EXCEPTIONS
from .dict_stdlib import STDLIB

PYTHON_DICTIONARY: dict[str, dict] = {
    **BUILTINS,
    **KEYWORDS,
    **STRINGS,
    **LISTS,
    **DICTS,
    **SETS,
    **EXCEPTIONS,
    **STDLIB,
}


def lookup(nazwa: str) -> dict | None:
    return PYTHON_DICTIONARY.get(nazwa)


def get_all_names() -> list[str]:
    return list(PYTHON_DICTIONARY.keys())
