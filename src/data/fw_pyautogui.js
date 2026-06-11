import meta         from '../content/pyautogui/meta.yaml';
import podstawy     from '../content/pyautogui/podstawy.yaml';
import mysz         from '../content/pyautogui/mysz.yaml';
import klawiatura   from '../content/pyautogui/klawiatura.yaml';
import screenshoty  from '../content/pyautogui/screenshoty.yaml';
import zaawansowane from '../content/pyautogui/zaawansowane.yaml';
import rivals       from '../content/pyautogui/rivals.yaml';
import plugins      from '../content/pyautogui/plugins.yaml';
import cli          from '../content/pyautogui/cli.yaml';

export const FW_PYAUTOGUI_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: mysz,
    hooki:      klawiatura,
    routing:    screenshoty,
    state:      zaawansowane,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
