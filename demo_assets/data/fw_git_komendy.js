// Command reference
FW_GIT_DATA.content.komendy = [
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
          { cmd: 'git diff', desc: 'Pokaż niezacommitowane zmiany (unstaged)',
            detail: { what: 'Pokazuje co zmieniłeś w plikach, które nie są jeszcze w staging. Linia z + = dodana, - = usunięta.', how: 'git diff plik.py — zmiany w konkretnym pliku.', flags: [{flag: '(bez argumentów)', desc: 'Różnica: working dir vs staging'}, {flag: '--staged', desc: 'Różnica: staging vs ostatni commit'}, {flag: 'HEAD', desc: 'Różnica: working dir vs ostatni commit'}, {flag: 'branch1 branch2', desc: 'Różnica między branchami'}], tips: ['git diff --stat — tylko podsumowanie zmienionych plików', 'git diff > patch.diff — zapisz do pliku'] }
          },
          { cmd: 'git diff --staged', desc: 'Pokaż co trafi do następnego commita',
            detail: { what: 'Porównuje staging z ostatnim commitem. Dokładnie to co commitniesz.', how: 'Uruchom po git add, przed git commit — sprawdź co commitujesz.', tips: ['Dobry nawyk: git diff --staged przed każdym commitem', 'Alias: git diff --cached (starsza nazwa)'] }
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
          { cmd: 'git stash pop', desc: 'Przywróć ostatni stash i usuń go',
            detail: { what: 'Aplikuje ostatni stash na working directory i usuwa go ze stosu. Jeśli są konflikty — rozwiąż jak merge.', how: 'git stash apply stash@{2} — zastosuj konkretny stash bez usuwania.', tips: ['git stash pop = git stash apply + git stash drop', 'Jeśli konflikt: git checkout -- . i git stash drop by odrzucić'] }
          },
          { cmd: 'git stash list', desc: 'Lista wszystkich odłożonych zmian',
            detail: { what: 'Pokazuje stos stashy z indeksami: stash@{0} = najnowszy.', how: 'git stash show stash@{1} — podgląd konkretnego stasha. git stash drop stash@{1} — usuń.', tips: ['git stash show -p stash@{0} — pełny diff stasha', 'Nie zostawiaj stashy na długo — trudno pamiętać co w nich jest'] }
          },
          { cmd: 'git cherry-pick <hash>', desc: 'Przenieś konkretny commit na aktualny branch',
            detail: { what: 'Kopiuje zmiany z jednego commita na aktualny branch. Hash z git log --oneline.', how: 'Przydatne: naprawiłeś bug na dev, chcesz ten fix też na main bez całego merge.', tips: ['git cherry-pick hash1 hash2 — wiele commitów', 'git cherry-pick --no-commit — zastosuj zmiany bez commita', 'Może być konflikt jeśli kod się różni — jak przy merge'] }
          },
          { cmd: 'git branch -d feature/nazwa', desc: 'Usuń zmergowany branch',
            detail: { what: '-d usuwa tylko jeśli branch jest zmergowany. -D force-delete nawet niezmergowany.', how: 'git push origin --delete feature/nazwa — usuń też na remote.', tips: ['git branch — lista lokalnych branchy', 'git branch -r — lista zdalnych branchy', 'git remote prune origin — posprzątaj lokalne ślady usuniętych remote branchy'] }
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
          { cmd: 'git remote -v', desc: 'Pokaż skonfigurowane zdalne repozytoria',
            detail: { what: 'Listuje zdalne URL-e dla fetch i push. Sprawdź kiedy nie wiesz do jakiego repo pushuje projekt.', how: 'origin = domyślna nazwa remote. Może być upstream (fork), deploy, heroku itp.', tips: ['git remote add origin <url> — dodaj zdalne repo', 'git remote set-url origin <nowy-url> — zmień URL', 'git remote rename origin upstream — zmień nazwę'] }
          },
          { cmd: 'git push --force-with-lease', desc: 'Bezpieczny force push',
            detail: { what: 'Force push który sprawdza czy remote nie zmienił się od ostatniego fetch. Bezpieczniejszy niż git push -f.', how: 'Używaj po git rebase lub git commit --amend gdy chcesz nadpisać historię na branchu.', tips: ['Nigdy force push na main/master', 'git push -f to nożyczki — --force-with-lease to nożyczki z osłonką', 'Bezpieczne tylko na feature branchach gdzie jesteś jedynym autorem'] }
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
      {
        category: 'Inspekcja i historia',
        icon: '🔍',
        items: [
          { cmd: 'git blame plik.py', desc: 'Kto i kiedy zmienił każdą linię',
            detail: { what: 'Dla każdej linii pliku pokazuje: hash commita, autora, datę, treść linii. Znajdź kto wprowadził bug.', how: 'git blame -L 10,20 plik.py — tylko linie 10-20.', tips: ['git log -p plik.py — historia wszystkich zmian w pliku', 'git blame -w — ignoruj zmiany whitespace', 'W VS Code: GitLens robi blame na każdej linii inline'] }
          },
          { cmd: 'git show <hash>', desc: 'Pokaż zmiany z konkretnego commita',
            detail: { what: 'Wyświetla metadane commita (autor, data, message) oraz pełny diff. Hash z git log --oneline.', how: 'git show HEAD — ostatni commit. git show HEAD~2 — dwa commity wstecz.', tips: ['git show hash:plik.py — pokaż wersję pliku z tego commita', 'git show --stat hash — tylko lista zmienionych plików (bez diff)'] }
          },
          { cmd: 'git log --oneline --author="Jan"', desc: 'Filtruj historię po autorze',
            detail: { what: 'Pokazuje commity tylko danego autora. Przydatne w większych projektach.', how: 'git log --author działa z częściowym dopasowaniem — nie musisz podawać pełnego imienia.', flags: [{flag: '--author="Jan"', desc: 'Filtruj po autorze'}, {flag: '--since="2024-01-01"', desc: 'Od daty'}, {flag: '--until="2024-12-31"', desc: 'Do daty'}, {flag: '--grep="fix"', desc: 'Szukaj w commit message'}, {flag: '-S "string"', desc: 'Szukaj commitów które dodały/usunęły string'}], tips: ['git log --oneline --since="1 week ago" — z ostatniego tygodnia', 'git shortlog -sn — ranking autorów po liczbie commitów'] }
          },
          { cmd: 'git tag v1.0.0', desc: 'Oznacz commit tagiem wersji',
            detail: { what: 'Tag to trwała etykieta na commit. Używany do oznaczania wersji (releases).', how: 'git tag v1.0.0 = lekki tag na HEAD. git tag -a v1.0.0 -m "Opis" = annotated tag (lepszy).', tips: ['git tag — lista wszystkich tagów', 'git push origin v1.0.0 — wyślij konkretny tag', 'git push origin --tags — wyślij wszystkie tagi', 'git tag -d v1.0.0 — usuń tag lokalnie'] }
          },
          { cmd: 'git bisect start', desc: 'Binarne szukanie commita który wprowadził bug',
            detail: { what: 'Bisect dzieli historię na pół i pyta czy dany commit ma bug. O(log n) znajdź winny commit.', how: 'git bisect start → git bisect bad (aktualny zepsuty) → git bisect good v1.0 → testuj → good/bad → Git pokaże winny commit.', tips: ['git bisect reset — zakończ bisect', 'git bisect run pytest tests/ — automatyczne bisect z testami', 'Przy 1000 commitach: 10 kroków żeby znaleźć bug'] }
          },
        ]
      },
      {
        category: 'Konfiguracja',
        icon: '⚙️',
        items: [
          { cmd: 'git config --global user.name "Imię Nazwisko"', desc: 'Ustaw imię autora commitów',
            detail: { what: 'Ustawia imię które pojawia się w git log. --global = dla wszystkich repozytoriów użytkownika.', how: 'git config --global user.email "email@example.com" — ustaw też email.', flags: [{flag: '--global', desc: '~/.gitconfig — dla wszystkich repo'}, {flag: '--local', desc: '.git/config — tylko to repo'}, {flag: '--list', desc: 'Pokaż całą konfigurację'}], tips: ['git config --list — wszystkie ustawienia', 'git config --global core.editor "code --wait" — VS Code jako edytor', 'git config --global pull.rebase true — domyślnie rebase przy pull'] }
          },
          { cmd: 'git config --global alias.lg "log --oneline --graph --all"', desc: 'Utwórz alias do komendy',
            detail: { what: 'Aliases skracają długie komendy do krótkich. git lg zamiast git log --oneline --graph --all.', how: 'Po konfiguracji: git lg działa jak pełna komenda.', tips: ['git config --global alias.st status', 'git config --global alias.co checkout', 'git config --global alias.br "branch -v"', 'Sprawdź aliases: git config --global --list | grep alias'] }
          },
          { cmd: 'cat .gitignore', desc: 'Sprawdź jakie pliki są ignorowane',
            detail: { what: '.gitignore definiuje pliki których Git nie śledzi. Typowo: node_modules/, __pycache__/, .env, *.pyc, dist/.', how: 'git check-ignore -v plik.py — sprawdź czy i dlaczego plik jest ignorowany.', tips: ['github.com/github/gitignore — gotowe templates per język', 'git rm --cached plik.env — usuń z trackowania (bez usuwania pliku)', '.gitignore nie retroaktywny — git rm --cached usuwa już śledzone pliki'] }
          },
        ]
      },
    ];
