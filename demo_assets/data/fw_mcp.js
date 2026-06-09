const FW_MCP_DATA = {
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
    },

    routing: {
      title: 'Zasoby (Resources)',
      items: [
        {
          name: 'Statyczne zasoby',
          desc: 'Dane dostępne do odczytu przez model — dokumenty, konfiguracje.',
          code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("ResourceServer")

# Statyczny zasób — zawsze ta sama treść
@mcp.resource("config://app")
def get_app_config() -> str:
    """Konfiguracja aplikacji."""
    return """
    APP_NAME=MyApp
    VERSION=1.0.0
    ENVIRONMENT=production
    MAX_CONNECTIONS=100
    """

# Zasób z pliku
@mcp.resource("docs://readme")
def get_readme() -> str:
    """README projektu."""
    with open("README.md", "r") as f:
        return f.read()

# Zasób binarny (np. obrazek)
@mcp.resource("image://logo", mime_type="image/png")
def get_logo() -> bytes:
    with open("logo.png", "rb") as f:
        return f.read()`,
        },
        {
          name: 'Dynamiczne zasoby (Resource Templates)',
          desc: 'Zasoby parametryczne — URI z zmiennymi.',
          code: `from mcp.server.fastmcp import FastMCP
import json

mcp = FastMCP("DynamicResources")

# Template — {user_id} w URI jest parametrem
@mcp.resource("user://{user_id}/profile")
def get_user_profile(user_id: str) -> str:
    """Profil użytkownika. URI: user://123/profile"""
    # Symulacja bazy danych
    profiles = {
        "1": {"name": "Anna", "role": "admin"},
        "2": {"name": "Bartek", "role": "user"},
    }
    profile = profiles.get(user_id)
    if not profile:
        return f"Użytkownik {user_id} nie istnieje"
    return json.dumps(profile, ensure_ascii=False)

@mcp.resource("db://{table}/schema")
def get_table_schema(table: str) -> str:
    """Schema tabeli. URI: db://users/schema"""
    import sqlite3
    conn = sqlite3.connect("app.db")
    cursor = conn.execute(f"PRAGMA table_info({table})")
    cols = [f"{r[1]} {r[2]}" for r in cursor.fetchall()]
    conn.close()
    return "\\n".join(cols)`,
        },
      ]
    },

    state: {
      title: 'Klienci MCP i integracje',
      items: [
        {
          name: 'Claude Desktop — konfiguracja',
          desc: 'Podłącz serwer MCP do Claude Desktop.',
          code: `// Plik: ~/Library/Application Support/Claude/claude_desktop_config.json
// (Mac) lub %APPDATA%/Claude/claude_desktop_config.json (Windows)

{
  "mcpServers": {
    "moj-serwer": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {
        "DATABASE_URL": "sqlite:///mydb.sqlite"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    }
  }
}`,
        },
        {
          name: 'Claude Code — konfiguracja',
          desc: 'Użyj serwera MCP bezpośrednio w Claude Code CLI.',
          code: `# Dodaj serwer do Claude Code
claude mcp add moj-serwer python /path/to/server.py

# Sprawdź serwery
claude mcp list

# Usuń serwer
claude mcp remove moj-serwer

# Dodaj z zmiennymi środowiskowymi
claude mcp add db-server \\
  --env DATABASE_URL=sqlite:///app.db \\
  python server.py

# Uruchom sesję z określonym serwerem
claude --mcp-server moj-serwer`,
        },
        {
          name: 'Klient programistyczny (Python)',
          desc: 'Połącz się z serwerem MCP z kodu Pythona.',
          code: `import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    # Parametry uruchamiania serwera
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Inicjalizacja połączenia
            await session.initialize()

            # Listuj dostępne narzędzia
            tools = await session.list_tools()
            print("Narzędzia:", [t.name for t in tools.tools])

            # Wywołaj narzędzie
            result = await session.call_tool(
                "dodaj",
                arguments={"a": 5, "b": 3}
            )
            print("Wynik:", result.content[0].text)  # "8"

            # Listuj zasoby
            resources = await session.list_resources()
            print("Zasoby:", [r.uri for r in resources.resources])

asyncio.run(main())`,
        },
      ]
    },

    rywale: [
      {
        name: 'LangChain Tools',
        icon: '🔗',
        color: '#1c3c3c',
        tagline: 'Framework do budowania agentów LLM',
        pros: ['Ogromny ekosystem gotowych narzędzi', 'Działało zanim MCP istniało', 'Integracja z wieloma LLM (OpenAI, Anthropic, Gemini)', 'Chain i Agent abstrakcje'],
        cons: ['Vendor lock-in — narzędzia działają tylko w LangChain', 'Skomplikowane API', 'Częste breaking changes', 'Brak standaryzacji między modelami'],
        vsReact: 'LangChain Tools = narzędzia tylko dla LangChain. MCP = otwarty standard działający z każdym klientem. Jeśli budujesz tylko dla jednego LLM i używasz LangChain — ich tools są OK. MCP dla interoperacyjności.',
        bestFor: 'Projekty już oparte na LangChain, złożone chain/agent workflows'
      },
      {
        name: 'OpenAI Function Calling',
        icon: '✦',
        color: '#10a37f',
        tagline: 'Natywne wywołanie funkcji w GPT-4',
        pros: ['Wbudowane w OpenAI API', 'Dojrzałe, stabilne', 'Structured outputs', 'Dobra dokumentacja'],
        cons: ['Tylko OpenAI — zero przenośności', 'Każdy model wymaga osobnej integracji', 'Brak Resources i Prompts', 'Nie lokalnie'],
        vsReact: 'Function Calling to API feature OpenAI — działasz tylko z GPT. MCP to standard — ten sam serwer działa z Claude, GPT (przez adaptery), Gemini. Budujesz serwer raz, podłączasz wszędzie.',
        bestFor: 'Projekty exclusively na OpenAI, gdy interoperacyjność nie jest potrzebna'
      },
      {
        name: 'LlamaIndex Tools',
        icon: '🦙',
        color: '#FF6B35',
        tagline: 'Framework RAG i agenci',
        pros: ['Świetny do RAG (wyszukiwanie dokumentów)', 'QueryEngine jako narzędzie', 'Wiele integracji data sources', 'Aktywny development'],
        cons: ['Vendor lock-in podobnie jak LangChain', 'Złożona konfiguracja', 'Głównie dla RAG use-case', 'Nie interoperacyjny'],
        vsReact: 'LlamaIndex świetny gdy budujesz RAG-based chatbota nad dokumentami. MCP lepszy gdy chcesz agenta który wykonuje akcje i działa z wieloma modelami.',
        bestFor: 'Chatboty nad dokumentami, Q&A systems, RAG pipelines'
      },
      {
        name: 'AutoGen / AgentOS',
        icon: '🤖',
        color: '#0078D4',
        tagline: 'Framework multi-agent od Microsoft',
        pros: ['Multi-agent conversations', 'Kod wykonuje się automatycznie', 'Open source', 'Dobry do complex workflows'],
        cons: ['Skomplikowana architektura', 'Wymaga dużo konfiguracji', 'Narzędzia nie przenośne', 'Steep learning curve'],
        vsReact: 'AutoGen dla skomplikowanych workflow z wieloma agentami rozmawiającymi ze sobą. MCP jest prostszy i skupiony na dostarczaniu narzędzi/kontekstu do modelu.',
        bestFor: 'Złożone pipelines wieloagentowe, kod auto-wykonujący się'
      },
    ],

    pluginy: [
      {
        name: '@modelcontextprotocol/server-filesystem',
        icon: '📁',
        color: '#4CAF50',
        tagline: 'Gotowy serwer dostępu do plików',
        install: 'npx -y @modelcontextprotocol/server-filesystem /path/to/dir',
        use: 'Oficjalny serwer MCP do dostępu do systemu plików. Wystawia narzędzia: read_file, write_file, list_directory, create_directory, move_file, search_files. Skonfiguruj w claude_desktop_config.json.',
        example: `// claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects"
      ]
    }
  }
}`
      },
      {
        name: '@modelcontextprotocol/server-github',
        icon: '🐱',
        color: '#333333',
        tagline: 'Dostęp do GitHub — issues, PR, kod',
        install: 'npx -y @modelcontextprotocol/server-github',
        use: 'Oficjalny serwer GitHub MCP. Narzędzia: create_issue, create_pull_request, search_repositories, get_file_contents, push_files i więcej. Wymaga GitHub Personal Access Token.',
        example: `// claude_desktop_config.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_twój_token"
      }
    }
  }
}`
      },
      {
        name: 'mcp-server-sqlite',
        icon: '🗄️',
        color: '#003B57',
        tagline: 'Dostęp do bazy SQLite przez MCP',
        install: 'pip install mcp-server-sqlite',
        use: 'Wystawia narzędzia do pracy z bazą SQLite: read_query, write_query, create_table, list_tables, describe_table. Bezpieczny odczyt z trybem tylko do odczytu.',
        example: `// claude_desktop_config.json
{
  "mcpServers": {
    "sqlite": {
      "command": "python",
      "args": ["-m", "mcp_server_sqlite", "--db-path", "app.db"]
    }
  }
}`
      },
      {
        name: 'mcp-server-postgres',
        icon: '🐘',
        color: '#336791',
        tagline: 'Dostęp do PostgreSQL przez MCP',
        install: 'npx -y @modelcontextprotocol/server-postgres',
        use: 'Połącz Claude z bazą PostgreSQL. Narzędzia do wykonywania zapytań i eksploracji schematu. Wymaga connection string.',
        example: `// claude_desktop_config.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://user:pass@localhost/mydb"]
    }
  }
}`
      },
      {
        name: 'FastMCP',
        icon: '⚡',
        color: '#a78bfa',
        tagline: 'Pythonowy framework — szybkie serwery MCP',
        install: 'pip install mcp',
        use: 'FastMCP (wbudowany w SDK Anthropic) to wysokopoziomowy interfejs do tworzenia serwerów MCP. Dekoratory @mcp.tool(), @mcp.resource(), @mcp.prompt() zamiast ręcznego protokołu. Zalecany dla większości projektów.',
        example: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("MójSerwer")

@mcp.tool()
def hello(name: str) -> str:
    """Przywitaj użytkownika."""
    return f"Cześć, {name}!"

if __name__ == "__main__":
    mcp.run()`
      },
      {
        name: 'mcp-use (LangChain adapter)',
        icon: '🔗',
        color: '#1c3c3c',
        tagline: 'Użyj serwerów MCP w LangChain',
        install: 'pip install mcp-use',
        use: 'Adapter który pozwala używać dowolnego serwera MCP jako narzędzia w LangChain agents. Mostek między ekosystemem MCP a LangChain.',
        example: `from mcp_use import MCPAgent, MCPClient
from langchain_anthropic import ChatAnthropic

client = MCPClient.from_config_file("claude_desktop_config.json")
llm = ChatAnthropic(model="claude-opus-4-5")
agent = MCPAgent(llm=llm, client=client, max_steps=15)

result = await agent.run("Jakie pliki są w folderze projects?")`
      },
    ],

    komendy: [
      {
        category: 'Instalacja i setup',
        icon: '📦',
        items: [
          {
            cmd: 'pip install mcp',
            desc: 'Zainstaluj Python SDK dla MCP',
            detail: {
              what: 'Instaluje oficjalne Anthropic SDK dla MCP. Zawiera FastMCP (high-level API), klienta i serwer low-level.',
              how: 'pip pobiera pakiet mcp z PyPI.',
              tips: ['pip install "mcp[cli]" — z narzędziami CLI', 'pip install mcp httpx — dodaj httpx dla HTTP requests w serwerze', 'Wymaga Python 3.10+']
            }
          },
          {
            cmd: 'pip install "mcp[cli]"',
            desc: 'MCP z narzędziami CLI (mcp dev, mcp run)',
            detail: {
              what: 'Instaluje MCP z dodatkowymi narzędziami deweloperskimi: mcp dev (interaktywny tester), mcp run (uruchamianie serwerów).',
              how: 'Extras [cli] dodają zależności dla narzędzi wiersza poleceń.',
              tips: ['mcp dev server.py — uruchom serwer z MCP Inspector', 'mcp run server.py — uruchom serwer bez Inspectora', 'Zalecane podczas developmentu']
            }
          },
          {
            cmd: 'pip install "mcp[cli]" httpx python-dotenv',
            desc: 'Pełny stack MCP + HTTP + env vars',
            detail: {
              what: 'Instaluje wszystko potrzebne do typowego serwera MCP: SDK z CLI, httpx do zewnętrznych API, dotenv do konfiguracji.',
              how: 'Większość serwerów MCP woła zewnętrzne API — httpx i dotenv są standardem.',
              tips: ['pip install fastmcp — uproszczony framework MCP (alternatywa)', 'pip show mcp — sprawdź zainstalowaną wersję', 'Utwórz venv dla każdego serwera MCP — izoluj zależności']
            }
          },
        ]
      },
      {
        category: 'Rozwój i testowanie',
        icon: '🛠️',
        items: [
          {
            cmd: 'mcp dev server.py',
            desc: 'Uruchom serwer z MCP Inspector (UI debugger)',
            detail: {
              what: 'Uruchamia serwer i otwiera MCP Inspector w przeglądarce — graficzny interfejs do testowania narzędzi, zasobów i promptów.',
              how: 'MCP Inspector to webowy klient który łączy się z Twoim serwerem. Możesz ręcznie wywoływać narzędzia i sprawdzać odpowiedzi.',
              tips: ['Otwiera się na http://localhost:5173', 'Zakładka Tools — testuj każde narzędzie osobno', 'Zakładka Resources — przeglądaj dostępne zasoby', 'Niezbędne podczas developmentu']
            }
          },
          {
            cmd: 'mcp dev server.py --with httpx --with pandas',
            desc: 'Uruchom serwer z dodatkowymi zależnościami',
            detail: {
              what: 'Instaluje dodatkowe pakiety (httpx, pandas) przed uruchomieniem serwera w środowisku deweloperskim.',
              how: 'Flaga --with <package> dodaje zależności do tymczasowego środowiska.',
              tips: ['Przydatne gdy serwer używa zewnętrznych bibliotek', 'Alternatywa: pip install httpx pandas w tym samym venv']
            }
          },
          {
            cmd: 'mcp run server.py',
            desc: 'Uruchom serwer MCP (bez Inspectora)',
            detail: {
              what: 'Uruchamia serwer jako proces stdio — tak jak Claude Desktop go uruchamia. Użyj do testowania bez graficznego Inspectora.',
              how: 'Serwer czeka na połączenie przez stdin/stdout. Ctrl+C aby zatrzymać.',
              tips: ['Użyj gdy chcesz przetestować serwer bez IDE', 'Loguj do stderr (nie stdout) — stdout jest zajęty przez protokół MCP']
            }
          },
        ]
      },
      {
        category: 'Claude Code — zarządzanie serwerami',
        icon: '🤖',
        items: [
          {
            cmd: 'claude mcp add nazwa python /path/to/server.py',
            desc: 'Dodaj serwer MCP do Claude Code',
            detail: {
              what: 'Rejestruje serwer MCP w Claude Code. Nazwa to identyfikator z którym będziesz się odwoływać do serwera.',
              how: 'Zapisuje konfigurację w ~/.claude/settings.json. Serwer jest dostępny w następnej sesji.',
              tips: ['claude mcp add --scope global — dostępny we wszystkich projektach', 'claude mcp add --scope local — tylko w bieżącym projekcie (.claude/settings.json)', 'claude mcp add -e VAR=value — przekaż zmienną środowiskową']
            }
          },
          {
            cmd: 'claude mcp list',
            desc: 'Pokaż skonfigurowane serwery MCP',
            detail: {
              what: 'Wyświetla listę wszystkich zarejestrowanych serwerów MCP dla bieżącego projektu i globalnych.',
              how: 'Czyta konfigurację z ~/.claude/settings.json i .claude/settings.json.',
              tips: ['Sprawdź tę komendę gdy serwer nie odpowiada', 'claude mcp get nazwa — szczegóły konkretnego serwera']
            }
          },
          {
            cmd: 'claude mcp remove nazwa',
            desc: 'Usuń serwer MCP',
            detail: {
              what: 'Usuwa rejestrację serwera MCP z konfiguracji Claude Code.',
              how: 'Usuwa wpis z ~/.claude/settings.json lub .claude/settings.json.',
              tips: ['Nie usuwa pliku serwera — tylko konfigurację', 'Przydatne przy przebudowie serwera lub zmianie ścieżki']
            }
          },
          {
            cmd: 'claude mcp add nazwa python /path/to/server.py -e API_KEY=abc',
            desc: 'Dodaj serwer MCP z zmienną środowiskową',
            detail: {
              what: 'Rejestruje serwer z przekazanymi env vars. Serwer otrzyma API_KEY w środowisku — bezpiecznie, bez hardkodowania w kodzie.',
              how: '-e VAR=value można powtórzyć wielokrotnie dla wielu zmiennych.',
              tips: ['claude mcp add --scope global — dostępny we wszystkich projektach', 'claude mcp add --scope local — tylko bieżący projekt (.claude/settings.json)', 'Wartości env vars są przechowywane w konfiguracji — nie w kodzie serwera']
            }
          },
          {
            cmd: 'claude mcp get nazwa',
            desc: 'Pokaż szczegóły konkretnego serwera MCP',
            detail: {
              what: 'Wyświetla konfigurację: komendę, argumenty, zmienne środowiskowe, scope dla danego serwera.',
              how: 'Przydatne gdy serwer nie działa — sprawdź czy ścieżka i konfiguracja są prawidłowe.',
              tips: ['claude mcp list — lista wszystkich serwerów', 'Sprawdź czy ścieżka do server.py istnieje: ls -la /path/to/server.py']
            }
          },
        ]
      },
      {
        category: 'Diagnoza i debugowanie',
        icon: '🐛',
        items: [
          {
            cmd: 'python server.py 2>debug.log',
            desc: 'Uruchom serwer i zapisz logi do pliku',
            detail: {
              what: 'Przekierowuje stderr (logi) do pliku debug.log. Protokół MCP działa na stdout — logi muszą iść na stderr.',
              how: '2> przekierowuje file descriptor 2 (stderr) do pliku.',
              tips: ['print(..., file=sys.stderr) — loguj do stderr', 'import logging; logging.basicConfig(stream=sys.stderr) — standardowy logging', 'tail -f debug.log — śledź logi na bieżąco (Linux/Mac)']
            }
          },
          {
            cmd: 'python -c "from mcp.server.fastmcp import FastMCP; print(\'MCP OK\')"',
            desc: 'Sprawdź czy MCP jest zainstalowany',
            detail: {
              what: 'Szybki test importu. Jeśli wyświetla "MCP OK" — pakiet jest zainstalowany.',
              how: 'Importuje FastMCP — główną klasę SDK.',
              tips: ['Jeśli błąd ModuleNotFoundError: pip install mcp', 'Sprawdź aktywny venv: which python']
            }
          },
          {
            cmd: 'tail -f debug.log',
            desc: 'Śledź logi serwera na żywo',
            detail: {
              what: 'Wyświetla nowe linie debug.log w czasie rzeczywistym. Uruchom w osobnym terminalu gdy testujesz serwer.',
              how: 'Wymaga że serwer loguje do debug.log: python server.py 2>debug.log',
              tips: ['tail -n 50 -f debug.log — ostatnie 50 linii + live', 'grep "ERROR" debug.log — filtruj błędy', 'Ctrl+C aby zatrzymać śledzenie']
            }
          },
          {
            cmd: 'python -c "import mcp; print(mcp.__version__)"',
            desc: 'Sprawdź wersję MCP SDK',
            detail: {
              what: 'Wyświetla zainstalowaną wersję pakietu mcp. Ważne — API zmienia się między wersjami.',
              how: 'pip show mcp — więcej informacji (lokalizacja, zależności).',
              tips: ['pip install --upgrade mcp — zaktualizuj do najnowszej', 'Sprawdź changelog na github.com/modelcontextprotocol/python-sdk']
            }
          },
        ]
      },
      {
        category: 'Środowisko i konfiguracja',
        icon: '⚙️',
        items: [
          {
            cmd: 'export ANTHROPIC_API_KEY="sk-ant-..."',
            desc: 'Ustaw API key dla serwera korzystającego z Claude',
            detail: {
              what: 'Zmienna środowiskowa dostępna dla serwera MCP. Claude Code przekazuje env vars zdefiniowane przy claude mcp add -e.',
              how: 'Windows: set ANTHROPIC_API_KEY=sk-ant-... Lub użyj .env + python-dotenv w serwerze.',
              tips: ['Nie hardkoduj kluczy w kodzie serwera — ładuj z os.environ', 'from dotenv import load_dotenv; load_dotenv() — wczytaj z .env', 'claude mcp add nazwa python server.py -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY']
            }
          },
          {
            cmd: 'cat ~/.claude/settings.json | python3 -m json.tool',
            desc: 'Podejrzyj konfigurację Claude Code (sformatowaną)',
            detail: {
              what: 'Pokazuje cały plik konfiguracyjny Claude Code z formatowaniem JSON. Tu są zapisane serwery MCP, permissions, hooks.',
              how: 'Lokalizacja lokalna: .claude/settings.json w bieżącym projekcie.',
              tips: ['Sprawdź sekcję "mcpServers" — tam są Twoje serwery', 'Możesz edytować ręcznie jeśli claude mcp add nie ma potrzebnych opcji', 'Backup przed ręczną edycją: cp ~/.claude/settings.json ~/.claude/settings.json.bak']
            }
          },
          {
            cmd: 'mcp dev server.py --transport sse',
            desc: 'Uruchom serwer z transportem SSE (HTTP)',
            detail: {
              what: 'SSE (Server-Sent Events) transport zamiast domyślnego stdio. Serwer nasłuchuje na HTTP — może obsługiwać wielu klientów.',
              how: 'Domyślny transport to stdio (jeden klient). SSE dla integracji webowych.',
              tips: ['stdio = jeden klient (Claude Code), SSE = wielu klientów przez HTTP', 'mcp run server.py --transport sse --port 8080', 'Użyj SSE gdy chcesz serwer dostępny przez sieć']
            }
          },
        ]
      },
    ]
  }
};
