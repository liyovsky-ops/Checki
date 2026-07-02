import meta         from '../content/ruff/meta.yaml';
import podstawy     from '../content/ruff/podstawy.yaml';
import reguly       from '../content/ruff/reguly.yaml';
import formatter    from '../content/ruff/formatter.yaml';
import konfiguracja from '../content/ruff/konfiguracja.yaml';
import ciCd         from '../content/ruff/ci_cd.yaml';
import rivals       from '../content/ruff/rivals.yaml';
import plugins      from '../content/ruff/plugins.yaml';
import komendy      from '../content/ruff/cli.yaml';

export const FW_RUFF_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: reguly,
    hooki:      formatter,
    routing:    konfiguracja,
    state:      ciCd,
    rywale:     rivals,
    pluginy:    plugins,
    komendy,
  },
};
