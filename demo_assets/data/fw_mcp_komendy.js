// Command reference
FW_MCP_DATA.content.komendy = [
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
    ];
