import meta        from '../content/beautifulsoup/meta.yaml';
import podstawy    from '../content/beautifulsoup/podstawy.yaml';
import selektory   from '../content/beautifulsoup/selektory.yaml';
import nawigacja   from '../content/beautifulsoup/nawigacja.yaml';
import modyfikacja from '../content/beautifulsoup/modyfikacja.yaml';
import zaawansowane from '../content/beautifulsoup/zaawansowane.yaml';
import rivals      from '../content/beautifulsoup/rivals.yaml';
import plugins     from '../content/beautifulsoup/plugins.yaml';
import cli         from '../content/beautifulsoup/cli.yaml';

export const FW_BS4_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: selektory,
    hooki:      nawigacja,
    routing:    modyfikacja,
    state:      zaawansowane,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
