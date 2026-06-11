import meta         from '../content/redis/meta.yaml';
import podstawy     from '../content/redis/podstawy.yaml';
import struktury    from '../content/redis/struktury.yaml';
import zaawansowane from '../content/redis/zaawansowane.yaml';
import persistencja from '../content/redis/persistencja.yaml';
import produkcja    from '../content/redis/produkcja.yaml';
import rivals       from '../content/redis/rivals.yaml';
import plugins      from '../content/redis/plugins.yaml';
import cli          from '../content/redis/cli.yaml';

export const FW_REDIS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  struktury,
    hooki:       zaawansowane,
    routing:     persistencja,
    state:       produkcja,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
