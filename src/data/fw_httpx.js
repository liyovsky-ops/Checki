import meta      from '../content/httpx/meta.yaml';
import podstawy  from '../content/httpx/podstawy.yaml';
import klient    from '../content/httpx/klient.yaml';
import async_    from '../content/httpx/async.yaml';
import auth      from '../content/httpx/auth_retry.yaml';
import transport from '../content/httpx/transport.yaml';
import rivals    from '../content/httpx/rivals.yaml';
import plugins   from '../content/httpx/plugins.yaml';
import cli       from '../content/httpx/cli.yaml';

export const FW_HTTPX_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: klient,
    hooki:      async_,
    routing:    auth,
    state:      transport,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
