import meta        from '../content/postgresql/meta.yaml';
import podstawy    from '../content/postgresql/podstawy.yaml';
import zapytania   from '../content/postgresql/zapytania.yaml';
import relacje     from '../content/postgresql/relacje.yaml';
import typy        from '../content/postgresql/typy_indeksy.yaml';
import zaawansowane from '../content/postgresql/zaawansowane.yaml';
import rivals      from '../content/postgresql/rivals.yaml';
import plugins     from '../content/postgresql/plugins.yaml';
import cli         from '../content/postgresql/cli.yaml';

export const FW_POSTGRESQL_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  zapytania,
    hooki:       relacje,
    routing:     typy,
    state:       zaawansowane,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
