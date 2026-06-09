const FW_PYAUTOGUI_DATA = {
  meta: {
    id: 'pyautogui', name: 'PyAutoGUI', icon: '🖱️', color: '#FF6B6B', color2: '#FF8E53',
    tagline: 'Automatyzacja myszy i klawiatury — kontroluj GUI z Pythona',
    year: 2014, author: 'Al Sweigart', lang: 'Python 3.8+',
    github: 'asweigart/pyautogui', stars: '10k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Mysz' },
    { id: 'hooki',      label: 'Klawiatura' },
    { id: 'routing',    label: 'Screenshoty' },
    { id: 'state',      label: 'Zaawansowane' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Ekosystem' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać PyAutoGUI?',
        firstComponent: 'Pierwsze kroki',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest PyAutoGUI?',
        desc: 'PyAutoGUI to biblioteka do automatyzacji GUI — kontroluje mysz i klawiaturę tak jak człowiek. Klikasz przyciski, wpisujesz tekst, robisz screenshoty i szukasz elementów na ekranie. Działa na Windows, Mac i Linux. Idealna gdy aplikacja nie ma API i jedyna opcja to sterowanie interfejsem graficznym.',
      },
      concepts: [
        {
          title: 'FAILSAFE',
          desc: 'Wbudowane zabezpieczenie — przesuń mysz w górny lewy róg ekranu żeby zatrzymać skrypt. pyautogui.FAILSAFE = True (domyślnie). Ratuje gdy skrypt wymknął się spod kontroli.',
          icon: '🛡️'
        },
        {
          title: 'PAUSE',
          desc: 'pyautogui.PAUSE = 0.5 dodaje 0.5s pauzy po każdej akcji. Spowalnia skrypt żeby GUI nadążało. Niezbędne dla stabilnych automatyzacji — bez tego klikasz zanim okno się otworzy.',
          icon: '⏱️'
        },
        {
          title: 'Współrzędne ekranu',
          desc: 'Mysz działa na pikselach (x, y). Punkt (0, 0) to górny lewy róg. Użyj pyautogui.position() żeby poznać aktualne współrzędne. pyautogui.size() zwraca rozdzielczość ekranu.',
          icon: '📍'
        },
        {
          title: 'Locate na ekranie',
          desc: 'pyautogui.locateOnScreen("button.png") szuka obrazka na ekranie i zwraca jego pozycję. Nie musisz hardkodować współrzędnych — szukasz po wyglądzie elementu. Podstawa odpornych skryptów.',
          icon: '🔍'
        }
      ],
      whenToUse: [
        'Automatyzacja powtarzalnych zadań w programach bez API (Excel, legacy apps)',
        'Testowanie GUI aplikacji desktopowych',
        'Web scraping gdy Selenium nie działa (np. aplikacje Flash/Java)',
        'Automatyczne wypełnianie formularzy w programach biurowych',
        'Skrypty do gier (farming, botowanie — jeśli pozwala ToS)',
        'Integracja dwóch programów które nie mają API',
      ],
      firstComponent: `import pyautogui
import time

# Bezpiecznik — przesuń mysz w lewy górny róg żeby zatrzymać
pyautogui.FAILSAFE = True
# Pauza 0.5s po każdej akcji — GUI nadąża
pyautogui.PAUSE = 0.5

# Gdzie jest mysz?
x, y = pyautogui.position()
print(f"Mysz: {x}, {y}")

# Rozdzielczość ekranu
w, h = pyautogui.size()
print(f"Ekran: {w}x{h}")

# Kliknij w środek ekranu
pyautogui.click(w // 2, h // 2)

# Wpisz tekst
pyautogui.typewrite("Hello World", interval=0.05)

# Skrót klawiszowy
pyautogui.hotkey("ctrl", "s")

print("Gotowe!")`,
    },

    komponenty: {
      title: 'Kontrola myszy',
      items: [
        {
          name: 'moveTo / moveRel',
          desc: 'Przesuń mysz do pozycji absolutnej lub relatywnej.',
          code: `import pyautogui

# Przesuń do pozycji (500, 300) w 1 sekundę
pyautogui.moveTo(500, 300, duration=1.0)

# Przesuń o 100px w prawo i 50px w dół (relatywnie)
pyautogui.moveRel(100, 50, duration=0.5)

# Sprawdź aktualną pozycję
print(pyautogui.position())  # Point(x=600, y=350)

# Ruch bez animacji (natychmiastowy)
pyautogui.moveTo(0, 0)  # Lewy górny róg`,
        },
        {
          name: 'click / doubleClick / rightClick',
          desc: 'Klikanie — lewy, prawy, podwójny klik.',
          code: `import pyautogui

# Lewy klik w pozycji
pyautogui.click(500, 300)

# Klik na aktualnej pozycji myszy
pyautogui.click()

# Podwójny klik
pyautogui.doubleClick(500, 300)

# Prawy klik (menu kontekstowe)
pyautogui.rightClick(500, 300)

# Środkowy klik
pyautogui.middleClick(500, 300)

# Klik z opóźnieniem (poczekaj 0.5s po kliknięciu)
pyautogui.click(500, 300, interval=0.5)`,
        },
        {
          name: 'drag / dragTo',
          desc: 'Przeciąganie elementów (drag and drop).',
          code: `import pyautogui

# Przeciągnij Z pozycji (100, 200) DO (400, 200) w 1 sekundę
pyautogui.dragTo(400, 200, duration=1.0, button='left')

# Przeciągnij relatywnie — 300px w prawo
pyautogui.dragRel(300, 0, duration=1.0)

# Drag & Drop — krok po kroku
pyautogui.moveTo(100, 200, duration=0.5)   # Jedź do elementu
pyautogui.mouseDown()                       # Wciśnij mysz
pyautogui.moveTo(400, 200, duration=1.0)   # Przeciągnij
pyautogui.mouseUp()                         # Puść`,
        },
        {
          name: 'scroll',
          desc: 'Scrollowanie kółkiem myszy.',
          code: `import pyautogui

# Scroll w górę (wartość dodatnia)
pyautogui.scroll(3)          # 3 kliknięcia w górę

# Scroll w dół (wartość ujemna)
pyautogui.scroll(-5)         # 5 kliknięć w dół

# Scroll w konkretnej pozycji
pyautogui.scroll(3, x=500, y=300)

# Horizontal scroll (tylko Mac)
pyautogui.hscroll(3)   # w prawo
pyautogui.hscroll(-3)  # w lewo`,
        },
      ]
    },

    hooki: {
      title: 'Kontrola klawiatury',
      items: [
        {
          name: 'typewrite',
          desc: 'Pisanie tekstu znak po znaku — jak człowiek.',
          code: `import pyautogui

# Wpisz tekst (z opóźnieniem między znakami)
pyautogui.typewrite("Hello World", interval=0.05)

# Bez opóźnienia (szybsze, mniej ludzkie)
pyautogui.typewrite("Quick text")

# UWAGA: typewrite nie obsługuje polskich znaków!
# Dla polskich znaków używaj pyperclip + paste:
import pyperclip
pyperclip.copy("Zażółć gęślą jaźń")
pyautogui.hotkey("ctrl", "v")`,
        },
        {
          name: 'hotkey',
          desc: 'Skróty klawiszowe — kombinacje klawiszy.',
          code: `import pyautogui

# Ctrl+S (zapisz)
pyautogui.hotkey("ctrl", "s")

# Ctrl+Shift+N (nowe okno incognito w Chrome)
pyautogui.hotkey("ctrl", "shift", "n")

# Alt+F4 (zamknij okno)
pyautogui.hotkey("alt", "f4")

# Win+D (pokaż pulpit)
pyautogui.hotkey("win", "d")

# Ctrl+A → Ctrl+C (zaznacz wszystko i kopiuj)
pyautogui.hotkey("ctrl", "a")
pyautogui.hotkey("ctrl", "c")`,
        },
        {
          name: 'press / keyDown / keyUp',
          desc: 'Pojedyncze klawisze i precyzyjna kontrola.',
          code: `import pyautogui

# Wciśnij i puść Enter
pyautogui.press("enter")

# Wciśnij wielokrotnie
pyautogui.press("right", presses=5)        # 5x strzałka w prawo
pyautogui.press("backspace", presses=10)   # Usuń 10 znaków

# Precyzyjne wciśnięcie (trzymaj wciśnięte)
pyautogui.keyDown("shift")
pyautogui.press("home")    # Shift+Home — zaznacz do początku linii
pyautogui.keyUp("shift")

# Dostępne klawisze specjalne:
# 'enter', 'tab', 'space', 'backspace', 'delete', 'escape'
# 'up', 'down', 'left', 'right'
# 'home', 'end', 'pageup', 'pagedown'
# 'f1'-'f12', 'numpad0'-'numpad9'
print(pyautogui.KEYBOARD_KEYS)  # Pełna lista`,
        },
      ]
    }

  }
};
