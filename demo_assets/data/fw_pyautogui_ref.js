// Ecosystem: rywale + pluginy
FW_PYAUTOGUI_DATA.content.rywale  = [
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
    ];
FW_PYAUTOGUI_DATA.content.pluginy = [
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
    ];
