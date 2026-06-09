// Ecosystem: rywale + pluginy
FW_MCP_DATA.content.rywale  = [
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
    ];
FW_MCP_DATA.content.pluginy = [
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
    ];
