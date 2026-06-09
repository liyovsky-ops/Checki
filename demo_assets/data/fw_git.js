const FW_GIT_DATA = {
  meta: {
    id: 'git', name: 'Git', icon: '🌿', color: '#F05032', color2: '#FF8C69',
    tagline: 'Rozproszony system kontroli wersji — standard branży',
    year: 2005, author: 'Linus Torvalds', lang: 'C',
    github: 'git/git', stars: '54k+', codeLang: 'bash'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Branche' },
    { id: 'hooki',      label: 'Historia' },
    { id: 'routing',    label: 'Zdalne' },
    { id: 'state',      label: 'Zaawansowane' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Narzędzia' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać Git?',
        firstComponent: 'Pierwsze repozytorium',
        firstComponentLang: 'bash'
      },
      intro: {
        title: 'Czym jest Git?',
        desc: 'Git to rozproszony system kontroli wersji stworzony przez Linusa Torvaldsa w 2005 roku do zarządzania kodem jądra Linux. Każdy developer ma pełną kopię historii projektu. Git śledzi zmiany, umożliwia pracę równoległą przez branche i pozwala cofać się do dowolnego momentu historii.',
      },
      concepts: [
        {
          title: 'Commit',
          desc: 'Snapshot stanu projektu w danym momencie. Każdy commit ma unikalny hash SHA-1, autora, datę i wiadomość. Commity tworzą łańcuch historii — każdy wskazuje na poprzedni.',
          icon: '📸'
        },
        {
          title: 'Branch',
          desc: 'Lekki wskaźnik na commit. Tworzenie brancha to jedna operacja — nie kopiuje plików. HEAD to wskaźnik na aktualny branch. main/master to domyślny branch.',
          icon: '🌿'
        },
        {
          title: 'Staging Area',
          desc: 'Obszar pomiędzy working directory a commitem. git add dodaje zmiany do staging. git commit zapisuje tylko to co jest w staging. Pozwala commitować wybrane zmiany.',
          icon: '📋'
        },
        {
          title: 'Merge vs Rebase',
          desc: 'Merge łączy branche tworząc merge commit — zachowuje historię. Rebase przepisuje historię przyklejając commity na wierzch innego brancha — czysta linia historii.',
          icon: '🔀'
        }
      ],
      whenToUse: [
        'Każdy projekt z kodem — od skryptu po aplikację enterprise',
        'Praca zespołowa — każdy na swoim branchu, merge do main',
        'Eksperymenty — branch na eksperyment, usuń gdy nie wyszło',
        'Backup — zdalne repo (GitHub/GitLab) = kopia zapasowa',
        'Code review — Pull Request przed mergem do main',
        'Rollback — coś poszło źle? git revert lub git reset'
      ],
      firstComponent: `# Nowe repozytorium
git init
git add .
git commit -m "feat: initial commit"

# Lub sklonuj istniejące
git clone https://github.com/user/repo.git
cd repo

# Podstawowy workflow
git status                    # co jest zmienione?
git add plik.py               # dodaj do staging
git add .                     # dodaj wszystko
git commit -m "fix: opis"     # zapisz snapshot
git log --oneline             # historia commitów`
    },

    komponenty: [
      {
        title: 'Tworzenie i przełączanie branchy',
        desc: 'Branch to izolowane środowisko pracy. Twórz branch na każdą funkcję/bugfix. Przełączaj się między branchami — Git podmienia pliki.',
        code: `# Utwórz i przejdź na nowy branch (nowy sposób)
git switch -c feature/login

# Stary sposób (też działa)
git checkout -b feature/login

# Lista branchy
git branch           # lokalne
git branch -r        # zdalne
git branch -a        # wszystkie

# Przejdź na istniejący branch
git switch main
git checkout main    # stary sposób

# Usuń branch
git branch -d feature/login   # po merge
git branch -D feature/login   # force (bez merge)`
      },
      {
        title: 'Merge — łączenie branchy',
        desc: 'Merge integruje zmiany z jednego brancha do drugiego. Fast-forward gdy historia jest linearna. Merge commit gdy historia się rozeszła.',
        code: `# Będąc na main — merge feature brancha
git switch main
git merge feature/login

# Fast-forward merge (historia linearna — brak merge commit)
git merge --ff-only feature/login

# Wymuś merge commit nawet przy fast-forward
git merge --no-ff feature/login -m "feat: merge login feature"

# Przerwij merge przy konflikcie
git merge --abort

# Po rozwiązaniu konfliktu
git add .
git commit  # lub git merge --continue`
      },
      {
        title: 'Rebase — czysta historia',
        desc: 'Rebase przepisuje historię — przenosi commity feature brancha na czubek main. Daje czystą, linearną historię. Złota zasada: nie rób rebase publicznych branchy.',
        code: `# Będąc na feature branchu — rebase na main
git switch feature/login
git rebase main

# Interaktywny rebase — edytuj historię
git rebase -i HEAD~3   # ostatnie 3 commity

# W edytorze możesz:
# pick   — zostaw commit
# reword — zmień wiadomość
# squash — połącz z poprzednim
# fixup  — połącz, porzuć wiadomość
# drop   — usuń commit

# Przerwij rebase
git rebase --abort

# Kontynuuj po rozwiązaniu konfliktu
git add .
git rebase --continue`
      },
      {
        title: 'Cherry-pick — wybierz konkretny commit',
        desc: 'Cherry-pick kopiuje wybrany commit na aktualny branch. Przydatne gdy chcesz przenieść tylko jeden fix bez całego brancha.',
        code: `# Skopiuj commit (hash) na aktualny branch
git cherry-pick a1b2c3d

# Kilka commitów
git cherry-pick a1b2c3d e4f5g6h

# Zakres commitów
git cherry-pick a1b2c3d..e4f5g6h

# Cherry-pick bez automatycznego commita
git cherry-pick -n a1b2c3d
# ... możesz edytować zmiany ...
git commit -m "cherry: fix z brancha hotfix"

# Przerwij
git cherry-pick --abort`
      },
    ],

    hooki: [
      {
        title: 'git log — przeglądanie historii',
        desc: 'log pokazuje historię commitów. Wiele opcji formatowania i filtrowania — od prostego --oneline po graficzne --graph.',
        code: `# Podstawowe
git log                          # pełna historia
git log --oneline                # jedna linia per commit
git log --oneline --graph        # drzewo branchy w ASCII
git log --oneline --graph --all  # wszystkie branche

# Filtrowanie
git log --author="Łukasz"        # commity autora
git log --since="2024-01-01"     # od daty
git log --until="2024-12-31"     # do daty
git log -- plik.py               # commity dotyczące pliku
git log -S "nazwa_funkcji"       # commity zawierające tekst

# Formatowanie
git log --format="%h %an %s"     # hash autor temat
git log --format="%ad %s" --date=short  # data temat`
      },
      {
        title: 'git diff — co się zmieniło',
        desc: 'diff pokazuje różnice między wersjami plików. Różne tryby: working directory vs staging, staging vs ostatni commit, między commitami.',
        code: `# Working directory vs staging
git diff

# Staging vs ostatni commit
git diff --staged
git diff --cached  # to samo

# Między commitami
git diff HEAD~2 HEAD
git diff a1b2c3d e4f5g6h

# Konkretny plik
git diff HEAD -- plik.py

# Tylko lista zmienionych plików
git diff --name-only
git diff --stat

# Między branchami
git diff main..feature/login
git diff main...feature/login  # od rozejścia się branchy`
      },
      {
        title: 'git blame — kto to napisał',
        desc: 'blame pokazuje kto i kiedy napisał każdą linię pliku. Nieoceniony przy debugowaniu — kto dodał tę linię i w którym commicie.',
        code: `# Pokaż autora każdej linii
git blame plik.py

# Z numerami linii i datą
git blame -l plik.py

# Konkretny zakres linii
git blame -L 10,25 plik.py

# Ignoruj whitespace
git blame -w plik.py

# Wynik:
# a1b2c3d (Łukasz 2024-01-15 14:30:00 +0100 10) def funkcja():
# ^oznacza commit, autor, data, numer linii, treść`
      },
      {
        title: 'git stash — odkładanie zmian na bok',
        desc: 'stash odkłada niezacommitowane zmiany do stosu. Przydatne gdy musisz szybko przełączyć branch bez commitowania niedokończonej pracy.',
        code: `# Odłóż zmiany
git stash
git stash push -m "wip: nowa funkcja login"

# Lista stashy
git stash list
# stash@{0}: wip: nowa funkcja login
# stash@{1}: On main: poprawki CSS

# Przywróć ostatni stash (zostaje na liście)
git stash apply

# Przywróć i usuń z listy
git stash pop

# Konkretny stash
git stash apply stash@{1}

# Usuń stash
git stash drop stash@{0}
git stash clear  # usuń wszystkie

# Stash z untracked plikami
git stash -u`
      },
    ],

    routing: [
      {
        title: 'Zdalne repozytoria — remote',
        desc: 'Remote to zdalna kopia repozytorium (GitHub, GitLab, Bitbucket). origin to domyślna nazwa zdalnego repo. Możesz mieć wiele remote.',
        code: `# Pokaż zdalne repozytoria
git remote -v

# Dodaj remote
git remote add origin https://github.com/user/repo.git

# Zmień URL remote
git remote set-url origin https://github.com/user/new-repo.git

# Usuń remote
git remote remove origin

# Pobierz zmiany (nie merguje)
git fetch origin
git fetch --all

# Pobierz i merguj
git pull origin main
git pull --rebase origin main  # pull z rebase`
      },
      {
        title: 'push — wysyłanie zmian',
        desc: 'push wysyła lokalne commity do zdalnego repo. Pierwszy push brancha wymaga --set-upstream (lub -u) żeby powiązać lokalny branch ze zdalnym.',
        code: `# Wyślij aktualny branch
git push origin main

# Pierwszy push nowego brancha
git push -u origin feature/login
# Po -u możesz po prostu: git push

# Wyślij wszystkie branche
git push --all origin

# Wyślij tagi
git push --tags

# Usuń zdalny branch
git push origin --delete feature/stary-branch

# Force push (OSTROŻNIE — nadpisuje historię)
git push --force-with-lease  # bezpieczniejszy force
git push -f                   # niebezpieczny — nie używaj na shared branchach`
      },
      {
        title: 'Tracking branchy i pull',
        desc: 'Tracking branch łączy lokalny branch ze zdalnym. git pull wie skąd pobierać. git status pokazuje ile commitów jesteś do przodu/tyłu.',
        code: `# Ustaw tracking
git branch --set-upstream-to=origin/main main
git push -u origin feature/login  # -u przy push = set upstream

# Sprawdź tracking
git branch -vv

# Pull z rebase (czysta historia, zalecane)
git pull --rebase origin main

# Ustaw rebase jako domyślny przy pull
git config --global pull.rebase true

# Pobierz wszystkie zdalne branche lokalnie
git fetch --all
git switch zdalny-branch  # automatycznie ustawi tracking`
      },
      {
        title: 'Rozwiązywanie konfliktów merge',
        desc: 'Konflikt powstaje gdy dwie osoby edytowały tę samą linię. Git oznacza konflikty w pliku — musisz zdecydować co zostaje.',
        code: `# Po git merge lub git pull z konfliktem:
# Git oznacza plik:
# <<<<<<< HEAD
# twoja wersja
# =======
# ich wersja
# >>>>>>> branch-name

# 1. Otwórz plik, znajdź markery
# 2. Zostaw właściwą wersję, usuń markery
# 3. Dodaj do staging
git add plik_z_konfliktem.py

# 4. Dokończ merge
git commit

# Sprawdź konflikty
git status         # "both modified"
git diff           # pokaż konflikty

# Przyjmij całkowicie naszą/ich wersję
git checkout --ours   plik.py  # nasza wersja
git checkout --theirs plik.py  # ich wersja`
      },
    ],

    state: [
      {
        title: 'git reset — cofanie zmian',
        desc: 'reset cofa HEAD do wskazanego commita. Trzy tryby: --soft (zachowaj w staging), --mixed (zachowaj w working dir), --hard (usuń wszystko).',
        code: `# --soft: cofnij commit, zmiany wróć do staging
git reset --soft HEAD~1   # cofnij 1 commit
git reset --soft HEAD~3   # cofnij 3 commity

# --mixed (domyślny): cofnij commit + unstage, pliki zostają
git reset HEAD~1
git reset HEAD~1 --mixed  # to samo

# --hard: cofnij commit + usuń zmiany (NIEODWRACALNE)
git reset --hard HEAD~1
git reset --hard origin/main  # wróć do stanu zdalnego

# Unstage konkretnego pliku (nie dotyka working dir)
git reset HEAD plik.py
git restore --staged plik.py  # nowoczesny sposób`
      },
      {
        title: 'git revert — bezpieczne cofanie',
        desc: 'revert tworzy nowy commit który odwraca zmiany z podanego commita. Bezpieczny dla publicznych branchy — nie przepisuje historii.',
        code: `# Cofnij konkretny commit (tworzy nowy commit)
git revert a1b2c3d

# Cofnij bez automatycznego commita
git revert -n a1b2c3d
# ... możesz edytować ...
git commit -m "revert: cofam zmianę X"

# Cofnij kilka commitów
git revert a1b2c3d e4f5g6h

# Cofnij merge commit
git revert -m 1 a1b2c3d  # -m 1 = zachowaj stronę mainline

# revert vs reset:
# revert = bezpieczne, dodaje commit, dla public branchy
# reset  = przepisuje historię, tylko dla lokalnych zmian`
      },
      {
        title: 'git tag — oznaczanie wersji',
        desc: 'Tagi oznaczają konkretne commity jako ważne punkty — zazwyczaj release wersje. Dwa rodzaje: lightweight (alias do commita) i annotated (pełny obiekt).',
        code: `# Utwórz tag (annotated — zalecany)
git tag -a v1.0.0 -m "Release 1.0.0"

# Tag konkretnego commita
git tag -a v1.0.0 a1b2c3d -m "Release 1.0.0"

# Lightweight tag (tylko alias)
git tag v1.0.0-beta

# Lista tagów
git tag
git tag -l "v1.*"  # filtruj wzorcem

# Szczegóły tagu
git show v1.0.0

# Wyślij tagi do remote
git push origin v1.0.0   # konkretny tag
git push origin --tags   # wszystkie tagi

# Usuń tag
git tag -d v1.0.0-beta             # lokalnie
git push origin --delete v1.0.0-beta  # zdalnie`
      },
      {
        title: '.gitignore — ignorowanie plików',
        desc: '.gitignore mówi Gitowi które pliki/foldery ignorować. Wzorce: *.log, folder/, plik.txt. Git nie śledzi zignorowanych plików.',
        code: `# .gitignore — przykładowy plik Python/Node projektu
# Środowisko wirtualne
venv/
.venv/
env/

# Python cache
__pycache__/
*.pyc
*.pyo
.pytest_cache/
.coverage
htmlcov/

# Zmienne środowiskowe (NIGDY nie commituj!)
.env
.env.local
*.key

# Node
node_modules/
.next/
dist/
build/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Sprawdź czy plik jest ignorowany
git check-ignore -v plik.py

# Usuń z trackingu (plik zostaje lokalnie)
git rm --cached plik.py`
      },
    ],

    rywale: [
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
    ],

    pluginy: [
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
    ],

    komendy: [
      {
        category: 'Podstawowe',
        icon: '📋',
        items: [
          { cmd: 'git init', desc: 'Inicjalizuj nowe repozytorium',
            detail: { what: 'Tworzy .git/ folder — Git zaczyna śledzić zmiany w bieżącym folderze.', how: 'Uruchom w głównym folderze projektu. Tworzy puste repo lokalnie.', tips: ['git init my-project — utwórz folder i init jednocześnie', 'Po init: git add . && git commit -m "initial commit"'] }
          },
          { cmd: 'git clone <url>', desc: 'Sklonuj zdalne repozytorium',
            detail: { what: 'Pobiera pełne repo (historia, branche, tagi) do lokalnego folderu.', how: 'URL z GitHub: https://github.com/user/repo.git lub SSH: git@github.com:user/repo.git', tips: ['git clone <url> moj-folder — klonuj do konkretnej nazwy', 'git clone --depth 1 <url> — tylko ostatni commit (szybciej)'] }
          },
          { cmd: 'git status', desc: 'Sprawdź stan repozytorium',
            detail: { what: 'Pokazuje: branch, niezacommitowane zmiany, pliki w staging, untracked pliki.', how: 'Uruchom często — przed add, przed commit, po pull.', tips: ['git status -s — krótki format (M=modified, A=added, ??=untracked)', 'Czytaj output — Git sugeruje komendy'] }
          },
          { cmd: 'git add .', desc: 'Dodaj wszystkie zmiany do staging',
            detail: { what: 'Dodaje wszystkie zmienione i nowe pliki do staging area.', how: '. = bieżący folder i podfoldery. Używaj z .gitignore żeby nie dodać .env itp.', tips: ['git add plik.py — konkretny plik', 'git add -p — interaktywnie wybierz które zmiany dodać (patch)'] }
          },
          { cmd: 'git commit -m "typ: opis"', desc: 'Zapisz snapshot z wiadomością',
            detail: { what: 'Tworzy commit z plikami z staging. SHA-1 hash = unikalny identyfikator.', how: 'Format Conventional Commits: feat/fix/refactor/docs/chore/test: krótki opis', tips: ['git commit --amend — zmień ostatni commit (tylko lokalny!)', 'git commit -am "msg" — add+commit wszystkich tracked plików'] }
          },
          { cmd: 'git log --oneline --graph', desc: 'Historia commitów w ASCII drzewie',
            detail: { what: 'Pokazuje historię z wizualnym drzewem branchy.', how: '--oneline = skrócony hash + temat. --graph = ASCII drzewo. --all = wszystkie branche.', tips: ['git log --oneline -10 — ostatnie 10', 'git log --format="%h %an %ar %s" — hash, autor, czas temu, temat'] }
          },
        ]
      },
      {
        category: 'Branche i merge',
        icon: '🌿',
        items: [
          { cmd: 'git switch -c feature/nazwa', desc: 'Utwórz i przejdź na nowy branch',
            detail: { what: 'switch -c = create. Tworzy branch z aktualnego HEAD i przełącza na niego.', how: 'Konwencja nazw: feature/*, fix/*, hotfix/*, release/*', tips: ['git switch main — wróć na main', 'git switch - — wróć na poprzedni branch (jak cd -)'] }
          },
          { cmd: 'git merge feature/nazwa', desc: 'Merge brancha do aktualnego',
            detail: { what: 'Łączy historię feature brancha z aktualnym. Będąc na main merguje feature do main.', how: 'Najpierw: git switch main, potem: git merge feature/nazwa', flags: [{flag: '--no-ff', desc: 'Zawsze utwórz merge commit'}, {flag: '--squash', desc: 'Połącz wszystkie commity w jeden'}], tips: ['git merge --abort — przerwij przy konflikcie', 'Po merge: git branch -d feature/nazwa'] }
          },
          { cmd: 'git rebase main', desc: 'Przepisz historię brancha na main',
            detail: { what: 'Przenosi commity aktualnego brancha na czubek main. Liniowa historia bez merge commitów.', how: 'Będąc na feature branchu: git rebase main. Rozwiąż konflikty, git rebase --continue.', tips: ['Nigdy nie rób rebase na publicznym/shared branchu', 'git rebase -i HEAD~3 — interaktywny rebase ostatnich 3 commitów'] }
          },
          { cmd: 'git stash', desc: 'Odłóż zmiany na bok',
            detail: { what: 'Zapisuje niezacommitowane zmiany do stosu. Working directory wraca do czystego stanu.', how: 'git stash pop — przywróć ostatni stash. git stash list — lista wszystkich stashy.', tips: ['git stash push -m "wip: login form" — z opisem', 'git stash -u — stash też untracked pliki'] }
          },
        ]
      },
      {
        category: 'Zdalne repo',
        icon: '☁️',
        items: [
          { cmd: 'git push -u origin feature/nazwa', desc: 'Wyślij branch i ustaw tracking',
            detail: { what: '-u = --set-upstream. Pierwszy push brancha. Następnie możesz używać git push bez argumentów.', how: 'git push origin main — dla istniejącego trackingu. git push — gdy tracking ustawiony.', tips: ['git push --force-with-lease — force push bezpieczniej', 'Nigdy git push -f na main/master'] }
          },
          { cmd: 'git pull --rebase origin main', desc: 'Pobierz zmiany z rebase',
            detail: { what: 'Pobiera zmiany z remote i robi rebase lokalnych commitów na wierzch. Czysta historia bez merge commitów.', how: 'Alternatywa: git pull (merge). --rebase daje liniową historię.', tips: ['git config --global pull.rebase true — ustaw jako domyślne', 'git fetch + git rebase = to samo co git pull --rebase'] }
          },
          { cmd: 'git fetch --all', desc: 'Pobierz info o zdalnych branchach',
            detail: { what: 'Pobiera metadane o zdalnych branchach i commitach. Nie merguje — tylko aktualizuje origin/*.', how: 'Po fetch możesz: git log origin/main — zobaczyć co jest na remote.', tips: ['git fetch --prune — usuń lokalne ślady usuniętych zdalnych branchy', 'Bezpieczniejsze niż git pull — nie zmienia working directory'] }
          },
        ]
      },
      {
        category: 'Naprawianie błędów',
        icon: '🔧',
        items: [
          { cmd: 'git reset --soft HEAD~1', desc: 'Cofnij ostatni commit, zachowaj zmiany',
            detail: { what: '--soft: commit znika, zmiany wracają do staging. Możesz poprawić i ponownie commitnąć.', how: 'HEAD~1 = jeden commit wstecz. HEAD~3 = trzy commity.', flags: [{flag: '--soft', desc: 'Cofnij commit, zostaw w staging'}, {flag: '--mixed', desc: 'Cofnij commit, zostaw w working dir'}, {flag: '--hard', desc: 'Cofnij commit i usuń zmiany (nieodwracalne)'}], tips: ['Tylko dla lokalnych commitów!', 'git reset --hard origin/main — wróć do stanu remote'] }
          },
          { cmd: 'git revert <hash>', desc: 'Bezpiecznie cofnij commit (nowy commit)',
            detail: { what: 'Tworzy nowy commit który odwraca zmiany. Historia zostaje — bezpieczne dla public branchy.', how: 'hash z git log --oneline. Może być konflikt jeśli kod był modyfikowany.', tips: ['Dla public branchy zawsze revert, nigdy reset', 'git revert HEAD — cofnij ostatni commit'] }
          },
          { cmd: 'git restore plik.py', desc: 'Przywróć plik do stanu ostatniego commita',
            detail: { what: 'Odrzuca niezacommitowane zmiany w pliku. Nieodwracalne — zmiany znikają.', how: 'git restore . — odrzuć wszystkie niezacommitowane zmiany', tips: ['git restore --staged plik.py — usuń z staging (unstage)', 'Odpowiednik starego: git checkout -- plik.py'] }
          },
        ]
      },
    ]
  }
};
