# Plan — Checki

## Zrobione ✅

- Tłumacz kodu — drawer z dołu, przypisy per-linia, różdżka scala w tekst
- Vivisekcja kodu — panel z góry, analiza krok po kroku z tabelami i mental model
- Opis linii — `?` przy każdej linii, jeden call AI analizuje cały plik
- Tryb programowania — 5 stylów (Eco/Comfort/Sport/Enterprise/Security), split edytor
- Wbudowane funkcje — 194 tokeny Pythona, dymki hover
- Archiwum bibliotek — 108 bibliotek, wyszukiwarka, modal
- Checki.framework — 120+ frameworków, kafelki, scroll snap, wyszukiwarka
- Wgrywanie pliku — syntax highlighting, auto-tooltip, auto-tłumaczenie

---

## Do zrobienia (kolejność)

- [ ] `feature/dead-code` — wykrywanie martwego kodu
- [ ] `feature/bad-patterns` — wykrywanie złych wzorców
- [ ] `feature/agents` — 5 agentów: Architektura, Security, Performance, Clean Code, Testing
- [ ] `feature/text-to-code` — opisz po polsku → dostań kod
- [ ] `feature/programming-mode-extended` — standardy (SOLID, DDD, TDD) doklejane do promptu

---

## Akademia (pomysł do zrealizowania)

Miejsce gdzie zbierasz komendy Pythona jak pokemony i oznaczasz swoją znajomość.

**3 stany każdej komendy:**
- 🟢 Zielony — rozumiem i używam swobodnie
- 🟡 Żółty — rozumiem co znaczy, nie wiem jak produktywnie użyć
- 🔴 Czerwony — nieznana, do nauki

**Do ustalenia przed implementacją:**
- Skąd trafiają komendy? (ręcznie / klik w edytorze / ze słownika builtins)
- Co widać po kliknięciu? (opis, przykład, mini-ćwiczenie?)
- Gdzie zapisuje stan? (localStorage na start, potem serwer z kontem?)
