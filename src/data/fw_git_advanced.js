// Advanced patterns: routing + state
export default {
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
    ]
};
