import meta        from '../content/requests/meta.yaml';
import podstawy    from '../content/requests/podstawy.yaml';
import metody      from '../content/requests/metody_http.yaml';
import sesje       from '../content/requests/sesje.yaml';
import authHeaders from '../content/requests/auth_headers.yaml';
import zaaw        from '../content/requests/zaawansowane.yaml';
import rivals      from '../content/requests/rivals.yaml';
import plugins     from '../content/requests/plugins.yaml';
import cli         from '../content/requests/cli.yaml';

export const FW_REQUESTS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: metody,
    hooki:      sesje,
    routing:    authHeaders,
    state:      zaaw,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
