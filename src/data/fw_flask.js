import meta     from '../content/flask/meta.yaml';
import podstawy from '../content/flask/podstawy.yaml';
import routing  from '../content/flask/routing.yaml';
import szablony from '../content/flask/szablony.yaml';
import api      from '../content/flask/api.yaml';
import baza     from '../content/flask/baza.yaml';
import rivals   from '../content/flask/rivals.yaml';
import plugins  from '../content/flask/plugins.yaml';
import cli      from '../content/flask/cli.yaml';

export const FW_FLASK_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: routing,
    hooki:      szablony,
    routing:    api,
    state:      baza,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
