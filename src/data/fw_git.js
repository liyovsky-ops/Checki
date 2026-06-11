import meta         from '../content/git/meta.yaml';
import podstawy     from '../content/git/podstawy.yaml';
import branche      from '../content/git/branche.yaml';
import historia     from '../content/git/historia.yaml';
import zdalne       from '../content/git/zdalne.yaml';
import zaawansowane from '../content/git/zaawansowane.yaml';
import rivals       from '../content/git/rivals.yaml';
import plugins      from '../content/git/plugins.yaml';
import cli          from '../content/git/cli.yaml';

export const FW_GIT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: branche,
    hooki:      historia,
    routing:    zdalne,
    state:      zaawansowane,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
