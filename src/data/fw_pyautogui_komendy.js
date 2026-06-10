// Command reference
export default [
      {
        category: 'Instalacja i setup',
        icon: '📦',
        items: [
          {
            cmd: 'pip install pyautogui',
            desc: 'Zainstaluj PyAutoGUI',
            detail: {
              what: 'Instaluje PyAutoGUI i jego zależności (Pillow, pymsgbox, pytweening, mouseinfo). Na Linux wymaga dodatkowo: sudo apt-get install scrot python3-tk python3-dev.',
              how: 'pip pobiera pakiet z PyPI i instaluje go w aktywnym środowisku.',
              tips: ['pip install pyautogui pyperclip opencv-python — pełny zestaw', 'Na Linux: sudo apt-get install scrot python3-xlib', 'Na Mac: pip install pyobjc-framework-Quartz pyobjc-core pyobjc']
            }
          },
          {
            cmd: 'pip install pyautogui pyperclip opencv-python pytesseract',
            desc: 'Zainstaluj pełny zestaw automatyzacji GUI',
            detail: {
              what: 'Pełny stack: pyautogui (mysz/klawiatura), pyperclip (schowek), opencv (szukanie z confidence), pytesseract (OCR).',
              how: 'Instaluje wszystkie paczki jednocześnie.',
              tips: ['pytesseract wymaga też Tesseract OCR w systemie', 'Windows: pobierz Tesseract z github.com/UB-Mannheim/tesseract', 'Ustaw: pytesseract.pytesseract.tesseract_cmd = r"C:\\Tesseract-OCR\\tesseract.exe"']
            }
          },
          {
            cmd: 'python -c "import pyautogui; print(pyautogui.size())"',
            desc: 'Sprawdź czy PyAutoGUI działa poprawnie',
            detail: {
              what: 'Szybki test importu. Zwraca rozdzielczość ekranu — jeśli działa, biblioteka jest zainstalowana poprawnie.',
              how: 'pyautogui.size() wywołuje funkcję systemową pobierającą rozdzielczość.',
              tips: ['Powinno wyświetlić np. Size(width=1920, height=1080)', 'Jeśli błąd na Linux: zainstaluj python3-xlib', 'Na Mac może wymagać uprawnień dostępności (System Preferences)']
            }
          },
        ]
      },
      {
        category: 'Diagnostyka i pozycja myszy',
        icon: '🖱️',
        items: [
          {
            cmd: 'python -c "import pyautogui, time; [print(pyautogui.position()) or time.sleep(1) for _ in range(10)]"',
            desc: 'Śledź pozycję myszy co 1 sekundę (10 razy)',
            detail: {
              what: 'Wyświetla aktualne współrzędne myszy 10 razy co sekundę. Użyj żeby poznać współrzędne elementów na ekranie.',
              how: 'pyautogui.position() zwraca Point(x, y) — aktualną pozycję kursora.',
              tips: ['Uruchom, przesuń mysz na element, zapisz współrzędne', 'mouseinfo — dedykowane narzędzie: pip install mouseinfo, python -m mouseinfo', 'Zapisuj współrzędne jako stałe na górze skryptu']
            }
          },
          {
            cmd: 'python -m mouseinfo',
            desc: 'Interaktywny debugger pozycji myszy',
            detail: {
              what: 'Otwiera okno które na bieżąco pokazuje pozycję myszy, kolor piksela i wartości RGB. Kliknij "Copy All Info to Clipboard" żeby skopiować dane.',
              how: 'mouseinfo to osobna paczka od autora PyAutoGUI. Wymaga: pip install mouseinfo.',
              tips: ['Najwygodniejszy sposób na znalezienie współrzędnych', 'Przesuń mysz na przycisk → Click "Copy" → wklej do kodu', 'Pokaż też kolor piksela — przydatne do pixelMatchesColor']
            }
          },
        ]
      },
      {
        category: 'Screenshoty i obrazki',
        icon: '📸',
        items: [
          {
            cmd: 'python -c "import pyautogui; pyautogui.screenshot(\'screen.png\')"',
            desc: 'Zrób screenshot i zapisz do pliku',
            detail: {
              what: 'Screenshot całego ekranu zapisany jako PNG. Punkt wyjścia do tworzenia obrazków referencyjnych dla locateOnScreen.',
              how: 'screenshot() używa scrot (Linux), MSS (Windows) lub screencapture (Mac).',
              tips: ['Zrób screenshot, przytnij potrzebny fragment w Paint/GIMP', 'Zapisz jako button.png i użyj z locateOnScreen', 'Mniejszy obrazek = szybsze szukanie']
            }
          },
          {
            cmd: 'python -c "import pyautogui; print(pyautogui.locateOnScreen(\'button.png\', confidence=0.9))"',
            desc: 'Sprawdź czy obrazek jest na ekranie',
            detail: {
              what: 'Szuka obrazka button.png na ekranie. Zwraca Box(left, top, width, height) lub None. Wymaga opencv-python dla parametru confidence.',
              how: 'locateOnScreen porównuje obrazek piksel po pikselu (lub z tolerancją gdy confidence < 1.0).',
              tips: ['Zrób screenshot przycisku → zapisz → użyj w locateOnScreen', 'confidence=0.9 = 90% podobieństwa — odporne na drobne zmiany', 'Ogranicz region= dla szybszego szukania']
            }
          },
        ]
      },
      {
        category: 'Szybkie akcje (one-liners)',
        icon: '⚡',
        items: [
          {
            cmd: 'python -c "import pyautogui; pyautogui.hotkey(\'win\', \'d\')"',
            desc: 'Pokaż pulpit (Win+D)',
            detail: {
              what: 'Minimalizuje wszystkie okna i pokazuje pulpit. Szybki test czy PyAutoGUI działa.',
              how: 'hotkey() wysyła kombinację klawiszy przez systemowe API klawiatury.',
              tips: ['Uruchom z terminala żeby sprawdzić czy klawisze działają', 'Jeśli nic się nie dzieje — sprawdź uprawnienia (szczególnie Mac)']
            }
          },
          {
            cmd: 'python -c "import pyautogui; pyautogui.typewrite(\'hello\', interval=0.05)"',
            desc: 'Wpisz tekst w aktywnym oknie',
            detail: {
              what: 'Wpisuje "hello" w aktywnym polu tekstowym. Interval=0.05 = 50ms między znakami.',
              how: 'typewrite() symuluje wciśnięcie każdego klawisza osobno.',
              tips: ['Kliknij w pole tekstowe przed uruchomieniem', 'Tylko ASCII — polskie znaki przez pyperclip + ctrl+v', 'interval=0 = max szybkość, może gubić znaki']
            }
          },
        ]
      },
    ];
