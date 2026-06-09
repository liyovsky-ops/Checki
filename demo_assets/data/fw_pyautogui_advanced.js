// Advanced patterns: routing + state
FW_PYAUTOGUI_DATA.content.routing  = {
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
    };
FW_PYAUTOGUI_DATA.content.state    = {
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
    };
