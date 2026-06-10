// Command reference
export default [
      {
        category: 'Uruchamianie testów',
        icon: '▶️',
        items: [
          { cmd: 'pytest', desc: 'Uruchom wszystkie testy w projekcie',
            detail: { what: 'Znajduje i uruchamia wszystkie pliki test_*.py i *_test.py w bieżącym folderze i podfolderach. Wyświetla podsumowanie passed/failed/error.', how: 'pytest skanuje drzewo katalogów szukając plików testów. Automatycznie dodaje bieżący folder do sys.path.', tips: ['pytest -v — verbose, widać każdy test osobno', 'pytest -q — quiet, tylko podsumowanie', 'Uruchom w folderze projektu (gdzie pyproject.toml)'] }
          },
          { cmd: 'pytest -v', desc: 'Verbose — wyświetl każdy test osobno',
            detail: { what: 'Pokazuje nazwę każdego testu i jego wynik (PASSED/FAILED/SKIPPED). Bez -v widać tylko kropki i F.', how: 'Każda linia to jeden test: tests/test_scraper.py::test_fetch_returns_html PASSED', tips: ['-v = verbose, -vv = bardzo verbose (pokazuje diff asercji)', 'Combine z -s: pytest -vs — verbose + print output'] }
          },
          { cmd: 'pytest tests/test_scraper.py', desc: 'Uruchom tylko jeden plik testów',
            detail: { what: 'Uruchamia testy tylko z podanego pliku. Szybsze przy developmencie gdy pracujesz nad konkretnym modułem.', how: 'Podaj ścieżkę względną lub absolutną do pliku testów.', tips: ['pytest tests/test_scraper.py::test_fetch_url — jeden konkretny test', 'pytest tests/test_scraper.py -v — plik + verbose', 'Tab completion działa dla ścieżek'] }
          },
          { cmd: 'pytest -k "scraper"', desc: 'Uruchom testy zawierające słowo w nazwie',
            detail: { what: 'Filtruje testy po nazwie funkcji lub pliku. -k przyjmuje wyrażenie — możesz łączyć przez and, or, not.', how: 'pytest porównuje -k z nazwami plików, klas i funkcji testowych.', flags: [{flag: '-k "scraper"', desc: 'Zawierające "scraper" w nazwie'}, {flag: '-k "not slow"', desc: 'Wszystko oprócz "slow"'}, {flag: '-k "fetch or parse"', desc: 'fetch LUB parse'}], tips: ['Wygodne przy pracy nad konkretną funkcją', 'Case-insensitive'] }
          },
          { cmd: 'pytest -m smoke', desc: 'Uruchom testy z konkretnym markerem',
            detail: { what: 'Uruchamia tylko testy oznaczone @pytest.mark.smoke. Markery musisz zdefiniować w pytest.ini/pyproject.toml.', how: 'pytest filtruje po markerach przed uruchomieniem.', flags: [{flag: '-m smoke', desc: 'Tylko smoke testy'}, {flag: '-m "not slow"', desc: 'Pomiń wolne testy'}, {flag: '-m "smoke or integration"', desc: 'smoke lub integration'}], tips: ['Zdefiniuj markery w pyproject.toml żeby uniknąć ostrzeżeń', 'pytest --markers — pokaż wszystkie dostępne markery'] }
          },
          { cmd: 'pytest -x', desc: 'Zatrzymaj przy pierwszym błędzie',
            detail: { what: 'Przerywa wykonywanie testów przy pierwszym FAILED. Przydatne gdy debug ujesz konkretny problem.', how: 'Normalne pytest uruchamia wszystkie testy i zbiera błędy. -x zatrzymuje się natychmiast.', flags: [{flag: '-x', desc: 'Zatrzymaj przy 1. błędzie'}, {flag: '--maxfail=3', desc: 'Zatrzymaj po 3 błędach'}], tips: ['Łącz z -v: pytest -xvs — zatrzymaj + verbose + stdout', 'Świetne gdy naprawiasz testy jeden po drugim'] }
          },
          { cmd: 'pytest --lf', desc: 'Uruchom tylko ostatnio popsute testy',
            detail: { what: '--lf = --last-failed. Uruchamia tylko testy które padły w poprzednim uruchomieniu. Oszczędza czas przy naprawianiu błędów.', how: 'pytest zapamiętuje wyniki w pliku .pytest_cache/. --lf czyta ten cache.', tips: ['--lf — tylko failed', '--ff — failed first, potem reszta', 'Świetne workflow: pytest → napraw błędy → pytest --lf'] }
          },
          { cmd: 'pytest --tb=short', desc: 'Skróć traceback przy błędach',
            detail: { what: 'Kontroluje format traceback przy błędach. short = skrócony, long = pełny (domyślny), no = bez traceback, line = jedna linia.', how: 'Domyślny traceback może być bardzo długi. short pokazuje najważniejsze — gdzie błąd i jakie wartości.', flags: [{flag: '--tb=short', desc: 'Skrócony traceback'}, {flag: '--tb=long', desc: 'Pełny traceback (domyślny)'}, {flag: '--tb=no', desc: 'Bez traceback'}, {flag: '--tb=line', desc: 'Jedna linia na błąd'}], tips: ['Dodaj do pytest.ini: addopts = --tb=short', 'short jest czytelniejszy dla większości przypadków'] }
          },
        ]
      },
      {
        category: 'Coverage i raporty',
        icon: '📊',
        items: [
          { cmd: 'pytest --cov=src', desc: 'Uruchom testy z pomiarem pokrycia kodu',
            detail: { what: 'Mierzy które linie kodu są uruchamiane podczas testów. Wymaga: pip install pytest-cov.', how: 'coverage.py instrumentuje kod — śledzi każdą wykonaną linię. Wynik: % linii objętych testami.', tips: ['--cov=src — mierz tylko folder src/ (nie biblioteki)', 'pytest --cov=. — mierz cały projekt', 'Pierwszy krok: uruchom i sprawdź raport'] }
          },
          { cmd: 'pytest --cov=src --cov-report=html', desc: 'Coverage z raportem HTML',
            detail: { what: 'Generuje interaktywny raport HTML w folderze htmlcov/. Kliknij plik i zobaczysz które linie są czerwone (nieobjęte).', how: 'coverage.py generuje HTML ze wszystkimi plikami źródłowymi. Czerwone linie = brak testu, zielone = objęte.', tips: ['Otwórz htmlcov/index.html w przeglądarce', 'Szukaj funkcji z niskim % — to kandydaci do testów', 'Dodaj htmlcov/ do .gitignore'] }
          },
          { cmd: 'pytest --cov=src --cov-fail-under=80', desc: 'Fail gdy coverage < 80%',
            detail: { what: 'Zwraca exit code 1 (błąd) gdy pokrycie kodu spada poniżej 80%. Idealne do CI/CD — blokuje merge gdy testy nie pokrywają wystarczająco dużo.', how: 'Po uruchomieniu testów coverage sprawdza % i zwraca odpowiedni exit code.', tips: ['Zacznij od niższego progu (np. 60%) i podnoś stopniowo', 'Ustaw w pyproject.toml: [tool.coverage.report] fail_under = 80', '80% to dobry cel — 100% często nie jest praktyczne'] }
          },
          { cmd: 'pytest --cov=src --cov-report=term-missing', desc: 'Pokaż brakujące linie w terminalu',
            detail: { what: 'Wyświetla raport coverage bezpośrednio w terminalu z numerami linii które nie są objęte testami.', how: 'Każdy plik: nazwa, % coverage, numery brakujących linii. Szybsze niż otwieranie HTML.', tips: ['Kolumna "Missing" pokazuje numery linii bez testów', 'Łącz z -v: pytest -v --cov=src --cov-report=term-missing'] }
          },
        ]
      },
      {
        category: 'Instalacja pluginów',
        icon: '🔌',
        items: [
          { cmd: 'pip install pytest-asyncio', desc: 'Plugin dla async testów',
            detail: { what: 'Pozwala pisać async def test_ funkcje. Wymagane do testowania asyncio, FastAPI async endpoints, aiohttp.', how: 'pytest-asyncio uruchamia async testy przez asyncio event loop.', tips: ['Dodaj do pyproject.toml: asyncio_mode = "auto"', 'Bez asyncio_mode = "auto" musisz dekorować: @pytest.mark.asyncio', 'Wersja 0.21+ wymaga explicit konfiguracji mode'] }
          },
          { cmd: 'pip install pytest-mock', desc: 'Mockowanie z mocker fixture',
            detail: { what: 'Dodaje fixture mocker — wrapper na unittest.mock. Prostsze API niż bezpośredni mock.patch.', how: 'mocker.patch() = context manager mock który automatycznie czyści po teście. Nie musisz pamiętać o stop().', tips: ['mocker.patch("module.function") — podmień funkcję', 'mocker.spy(obj, "method") — obserwuj wywołania bez podmiany', 'mocker.MagicMock() — twórz mock obiekty'] }
          },
          { cmd: 'pip install pytest-cov', desc: 'Pomiar pokrycia kodu',
            detail: { what: 'Integracja coverage.py z pytest. Dodaje flagę --cov do pytest.', how: 'coverage.py mierzy które linie kodu są wykonywane podczas testów.', tips: ['Zawsze instaluj razem: pip install pytest pytest-cov', 'Konfiguracja w pyproject.toml: [tool.coverage.run]'] }
          },
          { cmd: 'pip install pytest-xdist', desc: 'Równoległe wykonywanie testów',
            detail: { what: 'Uruchamia testy na wielu CPU równolegle. Drastycznie przyspiesza duże zestawy testów.', how: 'Dzieli testy między wątki/procesy. Każdy worker dostaje podzbiór testów.', flags: [{flag: '-n auto', desc: 'Tyle workerów ile CPU'}, {flag: '-n 4', desc: '4 równoległe workery'}, {flag: '-n 0', desc: 'Wyłącz (serial)'}], tips: ['pytest -n auto — automatyczna liczba workerów', 'Fixtures z scope=session mogą mieć problemy z xdist', 'Nie używaj gdy testy mają shared state'] }
          },
          { cmd: 'pip install freezegun', desc: 'Mockowanie daty i czasu',
            detail: { what: 'Podmienia datetime.now(), date.today(), time.time() na kontrolowaną wartość. Testuj kod zależny od czasu bez czekania.', how: '@freeze_time("2024-01-15") dekorator lub context manager. Podmienia we wszystkich modułach jednocześnie.', tips: ['@freeze_time("2024-01-15 12:00:00") — konkretna data i czas', 'with freeze_time("2024-01-01"): — context manager', 'Działa też na asyncio i threading'] }
          },
          { cmd: 'pip install responses', desc: 'Mockowanie HTTP requests',
            detail: { what: 'Przechwytuje wywołania requests.get/post itp. i zwraca zdefiniowane odpowiedzi. Testy bez prawdziwego HTTP.', how: '@responses.activate dekorator + responses.add() definiuje mock response. Wszystkie niezdefinowane requesty rzucają ConnectionError.', tips: ['Lepsze niż monkeypatch dla requests', 'responses.calls — sprawdź ile razy wywołano endpoint', 'Dla httpx: pip install respx (analogiczne API)'] }
          },
        ]
      },
      {
        category: 'Debugowanie testów',
        icon: '🐛',
        items: [
          { cmd: 'pytest -s', desc: 'Pokaż print() output podczas testów',
            detail: { what: 'pytest domyślnie przechwytuje stdout (ukrywa print()). -s = --capture=no, wyłącza przechwytywanie.', how: 'Bez -s: print() w testach jest ukryte (tylko przy błędzie). Z -s: widzisz wszystkie print() na bieżąco.', tips: ['pytest -vs — verbose + stdout (najczęstsze combo przy debugowaniu)', 'Alternatywa: użyj capfd fixture zamiast print()'] }
          },
          { cmd: 'pytest --pdb', desc: 'Wejdź w debugger przy pierwszym błędzie',
            detail: { what: 'Przy padnięciu testu automatycznie otwiera Python debugger (pdb). Możesz interaktywnie sprawdzić zmienne, wywołać funkcje.', how: 'pdb uruchamia się w miejscu gdzie test padł. Masz dostęp do wszystkich lokalnych zmiennych.', tips: ['n = next line, s = step into, c = continue, q = quit', 'p zmienna — wypisz wartość', '--pdb --pdbcls=IPython.core.debugger:Pdb — IPython debugger (ładniejszy)'] }
          },
          { cmd: 'pytest -v --tb=long 2>&1 | head -100', desc: 'Ogranicz output do pierwszych 100 linii',
            detail: { what: 'Przy wielu błędach output może być ogromny. Pipe do head ogranicza wyświetlane linie.', how: '2>&1 = przekieruj stderr do stdout. head -100 = pokaż pierwsze 100 linii.', tips: ['Przydatne gdy masz setki testów i wiele błędów', 'Alternatywa: pytest -x — zatrzymaj przy pierwszym błędzie'] }
          },
          { cmd: 'pytest --co', desc: 'Pokaż jakie testy zostaną uruchomione (bez uruchamiania)',
            detail: { what: '--co = --collect-only. Wyświetla listę wszystkich testów które zostaną znalezione i uruchomione. Bez faktycznego uruchamiania.', how: 'pytest zbiera testy, wypisuje ich nazwy i kończy. Zero wykonania.', tips: ['Sprawdź przed uruchomieniem czy -k filtruje właściwie', 'pytest --co -q — lista bez verbose', 'Zobaczysz hierarchię: plik → klasa → funkcja'] }
          },
        ]
      }
    ];
