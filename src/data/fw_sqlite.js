import meta        from '../content/sqlite/meta.yaml';
import podstawy    from '../content/sqlite/podstawy.yaml';
import queries     from '../content/sqlite/queries.yaml';
import python      from '../content/sqlite/python.yaml';
import nodejs      from '../content/sqlite/nodejs.yaml';
import performance from '../content/sqlite/performance.yaml';
import rivals      from '../content/sqlite/rivals.yaml';
import plugins     from '../content/sqlite/plugins.yaml';
import cli         from '../content/sqlite/cli.yaml';

export const FW_SQLITE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  queries,
    hooki:       python,
    routing:     nodejs,
    state:       performance,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
