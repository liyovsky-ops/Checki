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
    ]

  }
};
