import meta        from '../content/poetry/meta.yaml';
import podstawy    from '../content/poetry/podstawy.yaml';
import zaleznosci  from '../content/poetry/zaleznosci.yaml';
import srodowisko  from '../content/poetry/srodowisko.yaml';
import budowanie   from '../content/poetry/budowanie.yaml';
import konfiguracja from '../content/poetry/konfiguracja.yaml';
import rivals      from '../content/poetry/rivals.yaml';
import pluginy     from '../content/poetry/pluginy.yaml';
import komendy     from '../content/poetry/komendy.yaml';

export const FW_POETRY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: zaleznosci,
    hooki:      srodowisko,
    routing:    budowanie,
    state:      konfiguracja,
    rywale:     rivals,
    pluginy,
    komendy,
  }
};
