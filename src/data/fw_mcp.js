import _advanced from './fw_mcp_advanced.js';
import _ref      from './fw_mcp_ref.js';
import _komendy  from './fw_mcp_komendy.js';
export const FW_MCP_DATA = {
  meta: {
    id: 'mcp', name: 'MCP', icon: '🔌', color: '#a78bfa', color2: '#7c3aed',
    tagline: 'Model Context Protocol — podłącz AI do każdego narzędzia',
    year: 2024, author: 'Anthropic', lang: 'Python / TypeScript',
    github: 'modelcontextprotocol/python-sdk', stars: '7k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Serwery' },
    { id: 'hooki',      label: 'Narzędzia' },
    { id: 'routing',    label: 'Zasoby' },
    { id: 'state',      label: 'Klienci' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Ekosystem' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać MCP?',
        firstComponent: 'Minimalny serwer MCP',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest MCP?',
        desc: 'Model Context Protocol (MCP) to otwarty standard od Anthropic który pozwala modelom AI (Claude, GPT, Gemini) łączyć się z zewnętrznymi narzędziami, bazami danych i usługami. Zamiast hardkodować każdą integrację — tworzysz serwer MCP który wystawia narzędzia i zasoby. Klient (np. Claude Desktop) łączy się i może ich używać. USB-C dla AI — jeden standard, wszystkie narzędzia.',
      },
      concepts: [
        {
          title: 'Architektura Host–Client–Server',
          desc: 'Host (np. Claude Desktop) uruchamia Klientów. Każdy Klient łączy się z jednym Serwerem MCP. Serwer wystawia Narzędzia, Zasoby i Prompty. Model AI pyta hosta o dostępne narzędzia i może je wywoływać.',
          icon: '🏗️'
        },
        {
          title: 'Tools (Narzędzia)',
          desc: 'Funkcje które model może wywołać — jak function calling w OpenAI. Przykłady: search_database(), create_file(), send_email(). Model sam decyduje kiedy użyć narzędzia na podstawie opisu.',
          icon: '🔧'
        },
        {
          title: 'Resources (Zasoby)',
          desc: 'Dane które serwer udostępnia do odczytu — pliki, wyniki zapytań, dokumenty. URI-based: file:///path, database://query. Model może poprosić o zasób żeby uzyskać kontekst.',
          icon: '📦'
        },
        {
          title: 'Transport: stdio vs HTTP',
          desc: 'stdio — serwer uruchamiany jako subprocess, komunikacja przez stdin/stdout. Prosty, lokalny. HTTP/SSE — serwer jako usługa sieciowa, wiele klientów. Claude Desktop używa stdio.',
          icon: '🚀'
        }
      ],
      whenToUse: [
        'Podłącz Claude do własnej bazy danych — niech pisze SQL i czyta wyniki',
        'Daj AI dostęp do lokalnych plików i projektów (lepiej niż kopiowanie do chatu)',
        'Integracja z zewnętrznymi API (GitHub, Jira, Slack) bez pisania integracji per-model',
        'Własne narzędzia developerskie dostępne w Claude Code / Claude Desktop',
        'Agenci AI którzy wykonują akcje w systemie (tworzą pliki, uruchamiają skrypty)',
        'Standaryzacja: jeden serwer MCP działa z każdym klientem (Claude, GPT, Gemini)',
      ],
      firstComponent: `# pip install mcp
from mcp.server.fastmcp import FastMCP

# Utwórz serwer
mcp = FastMCP("Mój Serwer")

# Zdefiniuj narzędzie — model może je wywołać
@mcp.tool()
def dodaj(a: int, b: int) -> int:
    """Dodaj dwie liczby."""
    return a + b

@mcp.tool()
def powitaj(imie: str) -> str:
    """Przywitaj użytkownika po imieniu."""
    return f"Cześć, {imie}!"

# Uruchom serwer (stdio — dla Claude Desktop)
if __name__ == "__main__":
    mcp.run()`,
    },

    komponenty: {
      title: 'Tworzenie serwerów MCP',
      items: [
        {
          name: 'FastMCP — szybki start',
          desc: 'Wysokopoziomowe API — dekoratory zamiast boilerplate.',
          code: `from mcp.server.fastmcp import FastMCP
import httpx

mcp = FastMCP("WeatherServer")

@mcp.tool()
async def get_weather(city: str) -> str:
    """Pobierz aktualną pogodę dla miasta."""
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://wttr.in/{city}?format=3"
        )
        return r.text

@mcp.tool()
def convert_temp(celsius: float) -> dict:
    """Konwertuj temperaturę z Celsius na Fahrenheit i Kelvin."""
    return {
        "celsius": celsius,
        "fahrenheit": round(celsius * 9/5 + 32, 1),
        "kelvin": round(celsius + 273.15, 2)
    }

if __name__ == "__main__":
    mcp.run()`,
        },
        {
          name: 'Serwer z bazą danych',
          desc: 'Daj modelowi dostęp do SQLite przez MCP.',
          code: `from mcp.server.fastmcp import FastMCP
import sqlite3
from typing import Any

mcp = FastMCP("DatabaseServer")
DB_PATH = "myapp.db"

@mcp.tool()
def query_db(sql: str) -> list[dict[str, Any]]:
    """Wykonaj SELECT na bazie danych. Tylko odczyt!"""
    # Bezpieczeństwo: tylko SELECT
    if not sql.strip().upper().startswith("SELECT"):
        raise ValueError("Dozwolone tylko zapytania SELECT")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.execute(sql)
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

@mcp.tool()
def list_tables() -> list[str]:
    """Lista wszystkich tabel w bazie danych."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()
    return tables

@mcp.tool()
def describe_table(table_name: str) -> list[dict]:
    """Pokaż strukturę tabeli (kolumny i typy)."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.execute(f"PRAGMA table_info({table_name})")
    columns = [dict(zip(
        ["id","name","type","notnull","default","pk"],
        row
    )) for row in cursor.fetchall()]
    conn.close()
    return columns

if __name__ == "__main__":
    mcp.run()`,
        },
        {
          name: 'Serwer z plikami',
          desc: 'Dostęp do systemu plików przez MCP.',
          code: `from mcp.server.fastmcp import FastMCP
from pathlib import Path

mcp = FastMCP("FileServer")
BASE_DIR = Path("/home/user/projects")  # Ogranicz dostęp

def safe_path(relative: str) -> Path:
    """Sprawdź czy ścieżka jest w dozwolonym folderze."""
    path = (BASE_DIR / relative).resolve()
    if not str(path).startswith(str(BASE_DIR)):
        raise ValueError("Dostęp poza dozwolonym folderem!")
    return path

@mcp.tool()
def read_file(path: str) -> str:
    """Odczytaj zawartość pliku tekstowego."""
    return safe_path(path).read_text(encoding="utf-8")

@mcp.tool()
def write_file(path: str, content: str) -> str:
    """Zapisz zawartość do pliku."""
    p = safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Zapisano: {p}"

@mcp.tool()
def list_files(directory: str = ".") -> list[str]:
    """Lista plików w katalogu."""
    p = safe_path(directory)
    return [str(f.relative_to(BASE_DIR)) for f in p.iterdir()]

if __name__ == "__main__":
    mcp.run()`,
        },
      ]
    },

    hooki: {
      title: 'Definiowanie narzędzi (Tools)',
      items: [
        {
          name: 'Typy parametrów i walidacja',
          desc: 'MCP automatycznie generuje schema JSON z type hints.',
          code: `from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field
from typing import Optional, Literal
from enum import Enum

mcp = FastMCP("TypedServer")

class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskInput(BaseModel):
    title: str = Field(description="Tytuł zadania")
    priority: Priority = Field(default=Priority.MEDIUM)
    tags: list[str] = Field(default_factory=list)
    due_days: Optional[int] = Field(None, ge=0, le=365)

@mcp.tool()
def create_task(task: TaskInput) -> dict:
    """Utwórz nowe zadanie z walidacją Pydantic."""
    return {
        "id": 42,
        "title": task.title,
        "priority": task.priority.value,
        "tags": task.tags,
        "due_in_days": task.due_days
    }

@mcp.tool()
def search(
    query: str,
    limit: int = Field(default=10, ge=1, le=100),
    category: Literal["docs", "code", "issues"] = "docs"
) -> list[str]:
    """Wyszukaj z ograniczeniami na parametry."""
    return [f"Wynik {i}: {query} ({category})" for i in range(limit)]`,
        },
        {
          name: 'Narzędzia asynchroniczne',
          desc: 'Async tools dla operacji I/O (HTTP, baza, pliki).',
          code: `from mcp.server.fastmcp import FastMCP
import httpx
import asyncio

mcp = FastMCP("AsyncServer")

@mcp.tool()
async def fetch_url(url: str) -> str:
    """Pobierz zawartość URL."""
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.text[:5000]  # Ogranicz rozmiar

@mcp.tool()
async def fetch_multiple(urls: list[str]) -> dict[str, str]:
    """Pobierz kilka URLi równolegle."""
    async with httpx.AsyncClient(timeout=10) as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks, return_exceptions=True)

    results = {}
    for url, resp in zip(urls, responses):
        if isinstance(resp, Exception):
            results[url] = f"Błąd: {resp}"
        else:
            results[url] = resp.text[:1000]
    return results

if __name__ == "__main__":
    mcp.run()`,
        },
        {
          name: 'Obsługa błędów w narzędziach',
          desc: 'Jak poprawnie zgłaszać błędy modelowi.',
          code: `from mcp.server.fastmcp import FastMCP
from mcp import McpError
from mcp.types import ErrorCode

mcp = FastMCP("ErrorHandlingServer")

@mcp.tool()
def divide(a: float, b: float) -> float:
    """Podziel a przez b."""
    if b == 0:
        # McpError — model zobaczy czytelny błąd
        raise McpError(
            ErrorCode.INVALID_PARAMS,
            "Nie można dzielić przez zero"
        )
    return a / b

@mcp.tool()
def get_user(user_id: int) -> dict:
    """Pobierz użytkownika z bazy."""
    users = {1: {"name": "Anna"}, 2: {"name": "Bartek"}}
    user = users.get(user_id)
    if not user:
        raise McpError(
            ErrorCode.INVALID_PARAMS,
            f"Użytkownik {user_id} nie istnieje. "
            f"Dostępni: {list(users.keys())}"
        )
    return user`,
        },
      ]
    }
,
    ..._advanced,
    ..._ref,
    komendy: _komendy,
  }
};
