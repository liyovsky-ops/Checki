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
    },

    routing: {
      title: 'Screenshoty i szukanie elementów',
      items: [
        {
          name: 'screenshot',
          desc: 'Robienie zrzutów ekranu.',
          code: `import pyautogui

# Screenshot całego ekranu (zwraca PIL Image)
img = pyautogui.screenshot()
img.save("screen.png")

# Screenshot fragmentu ekranu (region)
img = pyautogui.screenshot(region=(0, 0, 800, 600))
# region = (left, top, width, height)

# Kolor piksela na ekranie
color = pyautogui.pixel(100, 200)
print(color)  # (255, 128, 0) — RGB

# Sprawdź czy piksel ma dany kolor
if pyautogui.pixelMatchesColor(100, 200, (255, 128, 0)):
    print("Kolor się zgadza!")`,
        },
        {
          name: 'locateOnScreen',
          desc: 'Szukanie obrazka na ekranie — rdzeń odpornych skryptów.',
          code: `import pyautogui

# Znajdź obrazek na ekranie — zwraca Box(left, top, width, height)
location = pyautogui.locateOnScreen("button.png")
if location:
    # Kliknij środek znalezionego elementu
    pyautogui.click(pyautogui.center(location))
else:
    print("Nie znaleziono przycisku!")

# Z tolerancją (confidence) — wymaga opencv
# pip install opencv-python
location = pyautogui.locateOnScreen("button.png", confidence=0.9)

# Znajdź wszystkie wystąpienia
for loc in pyautogui.locateAllOnScreen("icon.png"):
    print(loc)

# Szukaj tylko w regionie (szybsze)
location = pyautogui.locateOnScreen(
    "button.png",
    region=(0, 0, 800, 600)
)`,
        },
        {
          name: 'Pętla czekania na element',
          desc: 'Czekaj aż element pojawi się na ekranie.',
          code: `import pyautogui
import time

def wait_for_element(image_path, timeout=10, confidence=0.9):
    """Czekaj aż obrazek pojawi się na ekranie."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            location = pyautogui.locateOnScreen(
                image_path, confidence=confidence
            )
            if location:
                return pyautogui.center(location)
        except pyautogui.ImageNotFoundException:
            pass
        time.sleep(0.5)
    raise TimeoutError(f"Nie znaleziono {image_path} po {timeout}s")

# Użycie
center = wait_for_element("ok_button.png", timeout=15)
pyautogui.click(center)`,
        },
      ]
    },

    state: {
      title: 'Zaawansowane wzorce',
      items: [
        {
          name: 'Okna dialogowe',
          desc: 'Wyświetlanie alertów i pobieranie inputu.',
          code: `import pyautogui

# Alert (OK button)
pyautogui.alert("Skrypt zakończony!")

# Potwierdzenie (OK / Cancel)
result = pyautogui.confirm("Czy kontynuować?")
print(result)  # 'OK' lub 'Cancel'

# Prompt — pobierz tekst od użytkownika
name = pyautogui.prompt("Podaj nazwę pliku:")
print(f"Nazwa: {name}")

# Hasło (ukrywa wpisywany tekst)
password = pyautogui.password("Podaj hasło:")`,
        },
        {
          name: 'Obsługa błędów i stabilność',
          desc: 'Wzorce dla niezawodnych skryptów automatyzacji.',
          code: `import pyautogui
import time
import sys

# Konfiguracja na starcie
pyautogui.FAILSAFE = True   # mysz w lewy górny = stop
pyautogui.PAUSE = 0.3       # 300ms między akcjami

def safe_click(image, retries=3, confidence=0.85):
    """Kliknij w element szukając go po obrazku."""
    for attempt in range(retries):
        try:
            loc = pyautogui.locateOnScreen(image, confidence=confidence)
            if loc:
                pyautogui.click(pyautogui.center(loc))
                return True
        except Exception as e:
            print(f"Próba {attempt+1} nieudana: {e}")
        time.sleep(1)
    return False

# Główna pętla z graceful exit
try:
    while True:
        if not safe_click("next_button.png"):
            print("Nie znaleziono przycisku — kończę")
            break
        time.sleep(2)
except pyautogui.FailSafeException:
    print("Zatrzymano przez FailSafe (lewy górny róg)")
    sys.exit(0)`,
        },
        {
          name: 'Łączenie z pyperclip i subprocess',
          desc: 'Kopiowanie tekstu i uruchamianie programów.',
          code: `import pyautogui
import pyperclip
import subprocess
import time

# Uruchom Notatnik
subprocess.Popen("notepad.exe")
time.sleep(1.5)  # Poczekaj na otwarcie

# Tekst z polskimi znakami przez schowek
pyperclip.copy("Zażółć gęślą jaźń — polskie znaki!")
pyautogui.hotkey("ctrl", "v")

# Zaznacz i skopiuj tekst z ekranu
pyautogui.hotkey("ctrl", "a")  # zaznacz wszystko
pyautogui.hotkey("ctrl", "c")  # kopiuj
text = pyperclip.paste()
print(f"Skopiowano: {text}")

# Zapisz i zamknij
pyautogui.hotkey("ctrl", "s")
time.sleep(0.5)
pyautogui.hotkey("alt", "f4")`,
        },
      ]
    },

    rywale: [
      {
        name: 'Selenium',
        icon: '🔬',
        color: '#43b02a',
        tagline: 'Automatyzacja przeglądarek webowych',
        pros: ['Dedykowany do web — stabilniejszy', 'Czeka na elementy DOM automatycznie', 'XPath i CSS selectors', 'Headless mode (bez okna)'],
        cons: ['Tylko przeglądarki — nie aplikacje desktopowe', 'Wymaga WebDriver dla każdej przeglądarki', 'Wolniejszy setup', 'Nie obsługuje GUI poza przeglądarką'],
        vsReact: 'Selenium dla stron webowych — PyAutoGUI dla aplikacji desktopowych i gdy strona blokuje WebDriver. Selenium jest stabilniejszy na webowych projektach.',
        bestFor: 'Testowanie i scraping stron webowych, formularz webowych'
      },
      {
        name: 'Playwright',
        icon: '🎭',
        color: '#2ead33',
        tagline: 'Nowoczesna automatyzacja przeglądarek',
        pros: ['Szybszy niż Selenium', 'Auto-wait na elementy', 'Wbudowane screenshoty i video', 'TypeScript + Python + Java'],
        cons: ['Tylko przeglądarki', 'Nowszy = mniej zasobów online', 'Nie dla GUI desktopowego'],
        vsReact: 'Playwright to ewolucja Selenium — szybszy, nowocześniejszy, lepsze API. Wybierz Playwright dla nowych projektów webowych. PyAutoGUI gdy musisz klikać poza przeglądarką.',
        bestFor: 'E2E testy webowe, nowe projekty automatyzacji web'
      },
      {
        name: 'pywinauto',
        icon: '🪟',
        color: '#0078d4',
        tagline: 'Automatyzacja aplikacji Windows (natywna)',
        pros: ['Dostęp do elementów Windows API', 'Nie potrzebuje obrazków', 'Stabilniejszy niż coordinate-based', 'Działa gdy okno jest za innymi'],
        cons: ['Tylko Windows', 'Trudniejsze API niż PyAutoGUI', 'Nie działa na wszystkich aplikacjach', 'Wymaga znajomości Windows accessibility'],
        vsReact: 'pywinauto jest stabilniejszy dla aplikacji Windows — działa przez accessibility API, nie pikselami. Ale PyAutoGUI jest prostszy i działa wszędzie (cross-platform).',
        bestFor: 'Automatyzacja aplikacji natywnych Windows (.exe, legacy ERP)'
      },
      {
        name: 'AutoHotkey',
        icon: '⌨️',
        color: '#334455',
        tagline: 'Skryptowy język automatyzacji Windows',
        pros: ['Bardzo szybkie skrypty', 'Hotkeys na poziomie systemu', 'Może działać w tle', 'Kompiluje do .exe'],
        cons: ['Własny język (nie Python)', 'Tylko Windows', 'Trudniejszy w projekcie Python', 'Mniejsza elastyczność'],
        vsReact: 'AHK dla zaawansowanych hotkeys i makr systemowych — jest szybszy na Windows. PyAutoGUI dla Pythona — wygodniejszy w istniejącym projekcie, działa cross-platform.',
        bestFor: 'Hotkeys systemowe, makra Windows, bez Pythona'
      },
      {
        name: 'SikuliX',
        icon: '👁️',
        color: '#FF6B35',
        tagline: 'Automatyzacja przez rozpoznawanie obrazów (Java)',
        pros: ['IDE do nagrywania skryptów', 'Wbudowany image matching', 'GUI do tworzenia skryptów', 'OCR wbudowany'],
        cons: ['Java — ciężki runtime', 'Wolniejszy', 'Mniejsza społeczność', 'IDE ograniczone'],
        vsReact: 'SikuliX i PyAutoGUI robią podobne rzeczy (image-based). PyAutoGUI ma lepszą integrację z ekosystemem Pythona. SikuliX ma wbudowane IDE do nagrywania — przydatne dla non-programistów.',
        bestFor: 'Gdy potrzebujesz nagrywać skrypty graficznie, non-programmer workflow'
      },
    ],

    pluginy: [
      {
        name: 'pyperclip',
        icon: '📋',
        color: '#607D8B',
        tagline: 'Kopiowanie i wklejanie przez schowek',
        install: 'pip install pyperclip',
        use: 'Pozwala kopiować i wklejać tekst ze schowka systemowego. Niezbędne do wpisywania polskich znaków — typewrite ich nie obsługuje. pyperclip.copy() → pyautogui.hotkey("ctrl","v").',
        example: `import pyperclip
import pyautogui

# Polskie znaki przez schowek
pyperclip.copy("Zażółć gęślą jaźń")
pyautogui.hotkey("ctrl", "v")

# Pobierz zawartość schowka
text = pyperclip.paste()
print(text)`
      },
      {
        name: 'opencv-python',
        icon: '👁️',
        color: '#5C3EE8',
        tagline: 'Szukanie obrazków z tolerancją (confidence)',
        install: 'pip install opencv-python',
        use: 'PyAutoGUI używa OpenCV do locateOnScreen z parametrem confidence. Bez OpenCV szukanie musi być 100% dopasowaniem — z OpenCV możesz szukać z tolerancją (0.8-0.95).',
        example: `import pyautogui

# Wymaga opencv-python
location = pyautogui.locateOnScreen(
    "button.png",
    confidence=0.9  # 90% podobieństwa
)
if location:
    pyautogui.click(pyautogui.center(location))`
      },
      {
        name: 'Pillow (PIL)',
        icon: '🖼️',
        color: '#FF4081',
        tagline: 'Przetwarzanie screenshotów',
        install: 'pip install Pillow',
        use: 'PyAutoGUI zwraca screenshoty jako obiekty PIL Image. Pillow pozwala je przetwarzać — przycinać, analizować kolory, zapisywać. Automatycznie instaluje się z PyAutoGUI.',
        example: `import pyautogui
from PIL import ImageGrab

# Screenshot i analiza
img = pyautogui.screenshot()

# Przytnij do regionu
cropped = img.crop((100, 100, 400, 300))
cropped.save("region.png")

# Sprawdź kolor piksela
pixel = img.getpixel((500, 300))
print(pixel)  # (R, G, B)`
      },
      {
        name: 'pytesseract',
        icon: '📝',
        color: '#4CAF50',
        tagline: 'OCR — czytanie tekstu ze screenshotów',
        install: 'pip install pytesseract',
        use: 'Pozwala czytać tekst ze screenshotów przez Tesseract OCR. Przydatne gdy chcesz pobrać wartości z aplikacji bez dostępu do API — np. odczytaj saldo z okna programu bankowego.',
        example: `import pyautogui
import pytesseract
from PIL import Image

# Screenshot fragmentu z tekstem
img = pyautogui.screenshot(region=(100, 200, 300, 50))

# Odczytaj tekst (wymaga Tesseract zainstalowanego w systemie)
text = pytesseract.image_to_string(img, lang='pol')
print(f"Odczytano: {text}")

# Dla liczb
config = "--psm 8 -c tessedit_char_whitelist=0123456789."
number = pytesseract.image_to_string(img, config=config)`
      },
      {
        name: 'schedule',
        icon: '⏰',
        color: '#FF9800',
        tagline: 'Planowanie cyklicznych automatyzacji',
        install: 'pip install schedule',
        use: 'Uruchamia funkcje automatyzacji w zadanych porach. Prosta alternatywa dla cron — działa w Pythonie, nie wymaga konfiguracji systemu. Idealne dla skryptów które muszą działać codziennie o określonej godzinie.',
        example: `import schedule
import time
import pyautogui

def daily_report():
    """Codzienne wygenerowanie raportu."""
    pyautogui.hotkey("win", "d")     # Pokaż pulpit
    time.sleep(1)
    pyautogui.doubleClick(500, 300)  # Otwórz aplikację
    # ... reszta automatyzacji

# Uruchom codziennie o 9:00
schedule.every().day.at("09:00").do(daily_report)

while True:
    schedule.run_pending()
    time.sleep(60)`
      },
      {
        name: 'pynput',
        icon: '🎮',
        color: '#9C27B0',
        tagline: 'Zaawansowana kontrola + nasłuchiwanie inputu',
        install: 'pip install pynput',
        use: 'Bardziej zaawansowana alternatywa dla PyAutoGUI w kwestii klawiatury i myszy. Dodatkowo umożliwia nasłuchiwanie eventów — możesz przechwycić każde wciśnięcie klawisza lub klik myszy.',
        example: `from pynput import keyboard, mouse
from pynput.keyboard import Key, Controller

kb = Controller()

# Wpisz tekst (obsługuje unicode)
kb.type("Zażółć gęślą jaźń 🐍")

# Nasłuchuj klawiatury
def on_press(key):
    print(f"Wciśnięto: {key}")
    if key == Key.esc:
        return False  # Zatrzymaj listener

with keyboard.Listener(on_press=on_press) as listener:
    listener.join()`
      },
    ],

    komendy: [
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
    ]
  }
};
