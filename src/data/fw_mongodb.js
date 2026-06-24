import meta       from '../content/mongodb/meta.yaml';
import podstawy   from '../content/mongodb/podstawy.yaml';
import crud       from '../content/mongodb/crud.yaml';
import agregacje  from '../content/mongodb/agregacje.yaml';
import indeksy    from '../content/mongodb/indeksy.yaml';
import replikacja from '../content/mongodb/replikacja.yaml';
import rivals     from '../content/mongodb/rivals.yaml';
import plugins    from '../content/mongodb/plugins.yaml';
import cli        from '../content/mongodb/cli.yaml';

export const FW_MONGODB_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: crud,
    hooki:      agregacje,
    routing:    indeksy,
    state:      replikacja,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
