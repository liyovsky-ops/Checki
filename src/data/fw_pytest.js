import meta         from '../content/pytest/meta.yaml';
import podstawy     from '../content/pytest/podstawy.yaml';
import asercje      from '../content/pytest/asercje.yaml';
import fixtury      from '../content/pytest/fixtury.yaml';
import markery      from '../content/pytest/markery.yaml';
import zaawansowane from '../content/pytest/zaawansowane.yaml';
import rivals       from '../content/pytest/rivals.yaml';
import plugins      from '../content/pytest/plugins.yaml';
import cli          from '../content/pytest/cli.yaml';

export const FW_PYTEST_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: asercje,
    hooki:      fixtury,
    routing:    markery,
    state:      zaawansowane,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
