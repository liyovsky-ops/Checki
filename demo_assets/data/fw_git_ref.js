// Ecosystem: rywale + pluginy
FW_GIT_DATA.content.rywale  = [
      {
        name: 'Mercurial (hg)',
        icon: '🪐',
        color: '#999999',
        tagline: 'Rozproszony VCS — prostszy niż Git',
        pros: ['Prostsze komendy', 'Lepsza obsługa binarnych plików', 'Wbudowany web interface', 'Spójne zachowanie na wszystkich platformach'],
        cons: ['Mniejsza społeczność', 'Mniej platform hostingowych', 'Mniej narzędzi i integracji', 'Praktycznie wyparty przez Git'],
        vsReact: 'Mercurial był używany przez Facebook i Mozilla ale praktycznie zniknął z rynku. Git wygrał — 90%+ projektów open source używa Gita.',
        bestFor: 'Legacy projekty które już go używają'
      },
      {
        name: 'SVN (Subversion)',
        icon: '🗄️',
        color: '#809CC8',
        tagline: 'Centralny VCS — poprzednik Git',
        pros: ['Prosty model (centralny serwer)', 'Dobra obsługa dużych plików binarnych', 'Fine-grained access control', 'Dobrze znany w korporacjach'],
        cons: ['Centralny — potrzebujesz połączenia', 'Wolniejszy', 'Brak lokalnych branchy', 'Coraz rzadziej używany'],
        vsReact: 'SVN wymaga centralnego serwera — commit bez internetu niemożliwy. Git działa offline. W nowych projektach praktycznie nie ma powodu wybierać SVN.',
        bestFor: 'Duże pliki binarne (grafika, video), korporacje z legacy systemami'
      },
      {
        name: 'Perforce (Helix Core)',
        icon: '⚙️',
        color: '#00AEEF',
        tagline: 'Komercyjny VCS dla dużych projektów',
        pros: ['Obsługuje repozytoria TB-skali', 'Używany przez AAA gamedev (EA, Activision)', 'Zaawansowane lockowanie plików', 'Wydajność przy binarnych zasobach'],
        cons: ['Płatny', 'Skomplikowany setup', 'Centralny model', 'Małe projekty bez sensu'],
        vsReact: 'Perforce dla gamedev i filmów gdzie assets = setki GB. Git nie radzi sobie z wielkimi binarnymi plikami. Dla kodu — zawsze Git.',
        bestFor: 'AAA gamedev, VFX, projekty z ogromnymi binarnymi zasobami'
      },
    ];
FW_GIT_DATA.content.pluginy = [
      {
        name: 'GitHub CLI (gh)',
        icon: '🐙',
        color: '#333333',
        tagline: 'GitHub w terminalu — PR, issues, releases',
        install: 'winget install GitHub.cli  /  brew install gh  /  apt install gh',
        use: 'Tworzenie PR, przeglądanie issues, merge, checkout PR — bez otwierania przeglądarki. Integracja z GitHub Actions. Niezbędny przy codziennej pracy z GitHub.',
        example: `gh pr create --title "feat: login" --body "Dodaje logowanie"
gh pr list                      # lista otwartych PR
gh pr checkout 123              # checkout PR lokalnie
gh pr merge 123 --squash        # merge PR
gh issue list --assignee @me    # twoje issues
gh repo clone user/repo         # klonuj repo`
      },
      {
        name: 'git-flow',
        icon: '🌊',
        color: '#F05032',
        tagline: 'Branching model dla release-based projektów',
        install: 'apt install git-flow  /  brew install git-flow',
        use: 'Narzuca strukturę branchy: main, develop, feature/*, release/*, hotfix/*. Automatyzuje tworzenie, merge i tagowanie. Dobry dla projektów z regularnymi releasami.',
        example: `git flow init              # skonfiguruj
git flow feature start login  # nowy feature branch
git flow feature finish login # merge do develop
git flow release start 1.0.0  # branch release
git flow release finish 1.0.0 # merge do main + tag`
      },
      {
        name: 'lazygit',
        icon: '😎',
        color: '#00ADEF',
        tagline: 'Terminal UI dla Git — bez zapamiętywania komend',
        install: 'winget install JesseDuffield.lazygit  /  brew install lazygit',
        use: 'Interaktywny TUI (terminal user interface) dla Gita. Przeglądaj diff, staging, branche, history — klawiatura zamiast komend. Idealny na początek lub szybki przegląd.',
        example: `lazygit   # uruchom w folderze repo

# Nawigacja klawiaturą:
# s — stage/unstage plik
# c — commit
# p — push
# P — pull
# b — branche
# l — log/history`
      },
      {
        name: 'delta',
        icon: '🔍',
        color: '#F9826C',
        tagline: 'Piękniejszy git diff z syntax highlighting',
        install: 'winget install dandavison.delta  /  brew install git-delta',
        use: 'Zamienia wyjście git diff, git log, git show na kolorowy output z syntax highlighting, numery linii i side-by-side view. Konfiguracja w ~/.gitconfig.',
        example: `# ~/.gitconfig
[core]
    pager = delta

[delta]
    navigate = true
    side-by-side = true
    line-numbers = true

# Teraz git diff wygląda znacznie lepiej`
      },
      {
        name: 'pre-commit',
        icon: '🪝',
        color: '#FAB040',
        tagline: 'Git hooks — automatyczne sprawdzanie przed commitem',
        install: 'pip install pre-commit',
        use: 'Uruchamia linters, formattery, testy przed każdym commitem. Konfiguracja w .pre-commit-config.yaml. Blokuje commit gdy coś nie przejdzie. Standard w profesjonalnych projektach.',
        example: `# .pre-commit-config.yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.0.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8

# Zainstaluj hooki:
pre-commit install
# Teraz każdy git commit uruchamia sprawdzenia`
      },
      {
        name: 'gitui',
        icon: '🖥️',
        color: '#FF6B6B',
        tagline: 'Szybki terminal UI — alternatywa dla lazygit',
        install: 'winget install extrawurst.gitui  /  cargo install gitui',
        use: 'Szybszy niż lazygit (napisany w Rust). TUI dla Gita — staging, commit, push, branche bez komend. Dla tych którzy wolą GUI w terminalu.',
        example: `gitui   # uruchom w folderze repo

# Podobna nawigacja do lazygit
# Szybszy cold start dzięki Rust`
      },
      {
        name: 'git-lfs',
        icon: '📦',
        color: '#F69A2E',
        tagline: 'Large File Storage — duże pliki poza repo',
        install: 'git lfs install  (po pobraniu git-lfs)',
        use: 'Przechowuje duże pliki (modele ML, video, obrazy) poza repozytorium Git — tylko wskaźnik trafia do repo. Niezbędne gdy projekt ma zasoby binarne >50MB.',
        example: `git lfs install
git lfs track "*.psd"
git lfs track "models/*.bin"
git add .gitattributes
git add model.bin
git commit -m "add: model file via LFS"
git push origin main`
      },
    ];
