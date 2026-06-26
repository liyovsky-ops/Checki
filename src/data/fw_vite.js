import meta         from '../content/vite/meta.yaml';
import podstawy     from '../content/vite/podstawy.yaml';
import konfiguracja from '../content/vite/konfiguracja.yaml';
import assets       from '../content/vite/assets.yaml';
import pluginyTab   from '../content/vite/pluginy.yaml';
import build        from '../content/vite/build.yaml';
import rivals       from '../content/vite/rivals.yaml';
import plugins      from '../content/vite/plugins.yaml';
import cli          from '../content/vite/cli.yaml';

export const FW_VITE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: konfiguracja,
    hooki:      assets,
    routing:    pluginyTab,
    state:      build,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
