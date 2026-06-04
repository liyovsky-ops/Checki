# Handover — Checki (2026-06-04)

## Zanim zaczniesz

1. Przeczytaj `CLAUDE.md` — zasady projektu, git standards, kolejne kroki
2. Sprawdź tryb (OAuth vs API) zgodnie z regułą w `~/.claude/CLAUDE.md`
3. Jesteś na gałęzi `feature/programming-mode` — nie merguj jej jeszcze

---

## Co zostało zrobione w ostatniej sesji

### Backend
- `POST /programming-mode/rewrite` — przepisuje kod w 5 trybach (eco/comfort/sport/enterprise/security)
- Każdy tryb ma osobny prompt Gemini w `backend/features/programming_mode/service.py`
- CORS otwarty na `*` żeby demo z `file://` działało

### Demo (demo_v2.html)
- **Tryb programowania** w sidebarze — 5 trybów, zmiana kolorów całej strony (CSS klasy na body), split edytora na 2 zakładki (Oryginalny / Przepisany), przycisk "Analizuj" woła backend
- **Checki.framework** — kliknięcie "framework" w logo otwiera osobną stronę z kafelkami
  - 5 sekcji: Frontend / Backend / Database / DevOps / AI / każda 6 kafelków
  - Scroll snap — strona przeskakuje między sekcjami, nie scrolujesz płynnie
  - Każda sekcja ma inny klimat: Backend = retro terminal zielony, Database = matrix purple itd.
  - Kafelki świecą własnym kolorem na hover
  - Wyszukiwarka ukryta POWYŻEJ sekcji Frontend (scroll w górę odkrywa) — 120+ frameworków, autocomplete, wynik = full-screen kafelek

### Struktura plików demo
```
demo_v2.html
demo_assets/
  styles.css                      ← bazowe style
  programming-mode-themes.css     ← motywy 5 trybów
  data/
    biblioteki.js                 ← 108 bibliotek Python
    slownik.js                    ← słownik Python (dymki)
    frameworks.js                 ← ALL_FRAMEWORKS (120+) + FRAMEWORKS (kafelki)
  js/
    editor.js                     ← renderowanie edytora
    historia.js                   ← historia plików
    archiwum.js                   ← archiwum bibliotek
    tabs.js                       ← zakładki topbaru
    tooltips.js                   ← dymki .kw .fn
    programming-mode.js           ← logika trybów programowania
    framework.js                  ← logika Checki.framework
```

---

## Co robimy teraz (priorytet)

### 1. feature/translator-demo
Kliknięcie "Tłumacz kod" w sidebarze wysuwa **drawer z dołu ekranu**.

Widok wewnątrz drawera:
- Kod wyświetlony normalnie
- Pod każdą linią kodu — tłumaczenie mniejszą czcionką, inna krój (jak przypisy w książce)
- Ikona 🪄 różdżki w nagłówku drawera — kliknięcie usuwa kod i scala wszystkie tłumaczenia w jeden ciągły płynny tekst od początku do końca

Backend już ma endpoint `POST /translator/explain` — ale on tłumaczy cały kod naraz.
Trzeba będzie albo użyć go per-linia albo zrobić nowy endpoint który zwraca mapę linia→tłumaczenie.

### 2. feature/agents-demo (po translatorze)
5 agentów specjalistów w sidebarze, każdy analizuje kod ze swojej perspektywy:
- 🏗️ Architektury — struktura, wzorce, podział odpowiedzialności
- 🛡️ Security — luki, złe praktyki, podatności
- ⚡ Performance — wąskie gardła, złożoność, optymalizacje
- ✨ Clean Code — czytelność, nazewnictwo, SOLID
- 🧪 Testing — pokrycie testami, edge cases, testowalność

Wynik każdego agenta pojawia się w prawym panelu.

---

## Uruchomienie

```bash
# Backend
cd /home/liyo/Checki/backend && source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000

# Po każdej zmianie demo — skopiuj na pulpit Windows
cp /home/liyo/Checki/demo_v2.html /mnt/c/Users/Admin/Desktop/Checki_demo_v2.html
cp -r /home/liyo/Checki/demo_assets /mnt/c/Users/Admin/Desktop/
```

---

## Git

- Gałąź aktywna: `feature/programming-mode`
- Konwencja commitów: `feat:` `fix:` `style:` `refactor:` `docs:` — opisowe, po angielsku
- Projekt rekrutacyjny — git musi wyglądać profesjonalnie, bez commitów "update" czy "poprawki"
- Nie używaj `git rebase -i` (interaktywny) — zamiast tego `git reset --soft` + ręczne commity
