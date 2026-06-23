import meta          from '../content/playwright/meta.yaml';
import podstawy      from '../content/playwright/podstawy.yaml';
import selektory     from '../content/playwright/selektory.yaml';
import akcje         from '../content/playwright/akcje.yaml';
import pageobjects   from '../content/playwright/pageobjects.yaml';
import zaawansowane  from '../content/playwright/zaawansowane.yaml';
import rivals        from '../content/playwright/rivals.yaml';
import plugins       from '../content/playwright/plugins.yaml';
import cli           from '../content/playwright/cli.yaml';

export const FW_PLAYWRIGHT_DATA = {
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
