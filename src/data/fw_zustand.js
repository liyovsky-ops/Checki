import meta      from '../content/zustand/meta.yaml';
import podstawy  from '../content/zustand/podstawy.yaml';
import store     from '../content/zustand/store.yaml';
import selektory from '../content/zustand/selektory.yaml';
import middleware from '../content/zustand/middleware.yaml';
import persist   from '../content/zustand/persist.yaml';
import rivals    from '../content/zustand/rivals.yaml';
import plugins   from '../content/zustand/plugins.yaml';
import cli       from '../content/zustand/cli.yaml';

export const FW_ZUSTAND_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: store,
    hooki:      selektory,
    routing:    middleware,
    state:      persist,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
