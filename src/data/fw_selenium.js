import meta         from '../content/selenium/meta.yaml';
import podstawy     from '../content/selenium/podstawy.yaml';
import selektory    from '../content/selenium/selektory.yaml';
import akcje        from '../content/selenium/akcje.yaml';
import pageobjects  from '../content/selenium/pageobjects.yaml';
import zaawansowane from '../content/selenium/zaawansowane.yaml';
import rivals       from '../content/selenium/rivals.yaml';
import plugins      from '../content/selenium/plugins.yaml';
import cli          from '../content/selenium/cli.yaml';

export const FW_SELENIUM_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: selektory,
    hooki:      akcje,
    routing:    pageobjects,
    state:      zaawansowane,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
