# Plan działania — Checki

Dokument dla Claude. Czytaj przed każdą sesją żeby wiedzieć gdzie jesteśmy i co dalej.

---

## Zasady których pilnuję
- Każdy krok = osobna gałąź `feature/`
- Commit po każdym ukończonym kroku
- Nie skaczemy do następnego kroku dopóki poprzedni nie jest skończony i zacommitowany
- Jeśli Łukasz chce iść na skróty — przypominam mu po co to robimy

---

## FAZA 1 — Setup (robimy teraz)

- [x] Git init, gałęzie main + dev
- [x] Struktura folderów feature-based
- [x] CLAUDE.md, README, .gitignore, ZALOZENIA.md
- [x] Demo wizualne (demo.html)
- [ ] **Setup Next.js** → `feature/frontend-setup`
- [ ] **Setup FastAPI** → `feature/backend-setup`
- [ ] **Połączenie frontend ↔ backend** (CORS, test ping) → `feature/connection-test`

---

## FAZA 2 — Szkielet UI

- [ ] **Layout główny** — topbar, sidebar, panel prawy, edytor → `feature/ui-layout`
- [ ] **Edytor kodu** — numery linii, kolorowanie składni → `feature/code-editor`
- [ ] **Wgrywanie pliku** — drag & drop lub przycisk → `feature/file-upload`

---

## FAZA 3 — Funkcje AI (po jednej na raz)

Każda funkcja = osobna gałąź. Nie zaczynamy następnej dopóki poprzednia nie działa.

- [ ] **Inline tooltip** (pytajnik przy linii) → `feature/line-tooltip`
  - frontend: pytajnik + dymek przy każdej linii
  - backend: endpoint `/explain-line` → Claude API
- [ ] **Tłumaczenie kodu na tekst** → `feature/translator`
  - frontend: przycisk "Tłumacz", wyświetlenie opisu
  - backend: endpoint `/translate` → Claude API
- [ ] **Martwy kod** → `feature/dead-code`
  - frontend: podświetlenie martwych linii na czerwono
  - backend: endpoint `/dead-code` → Claude API
- [ ] **Błędne wzorce** → `feature/bad-patterns`
  - frontend: podświetlenie + opis w prawym panelu
  - backend: endpoint `/bad-patterns` → Claude API
- [ ] **Tryb nauki** → `feature/learn-mode`
  - frontend: przełącznik trybu, zmiana stylu odpowiedzi
  - backend: osobny prompt do Claude API (prostszy kod)
- [ ] **Text to Code** → `feature/text-to-code`
  - frontend: pole tekstowe + wyświetlenie wygenerowanego kodu
  - backend: endpoint `/text-to-code` → Claude API
- [ ] **Agenci-specjaliści** → `feature/agents`
  - frontend: wybór agenta (backend/frontend/security)
  - backend: osobne prompty dla każdego agenta
- [ ] **Archiwum bibliotek i komend** → `feature/archive`
  - frontend: wyszukiwarka, karty z opisami
  - backend: baza danych lub statyczny JSON z bibliotekami

---

## FAZA 4 — Historia

- [ ] **Historia analizowanych plików** → `feature/history`
  - frontend: lista plików, kliknięcie → szczegóły
  - backend: zapis do bazy danych po każdej analizie

---

## FAZA 5 — Dopracowanie

- [ ] Responsywność UI
- [ ] Obsługa błędów (co gdy AI nie odpowie)
- [ ] Loading states (spinner gdy AI myśli)
- [ ] Testy

---

## Aktualny stan gałęzi

```
main  ← stabilna wersja
 └── dev  ← bieżąca praca
      └── feature/...  ← aktywna funkcja
```

## Gdzie jesteśmy teraz
**Faza 1** — Setup. Następny krok: `feature/frontend-setup`
