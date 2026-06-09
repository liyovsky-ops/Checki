// Advanced patterns: routing + state
FW_MCP_DATA.content.routing  = {
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
    };
FW_MCP_DATA.content.state    = {
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
    };
