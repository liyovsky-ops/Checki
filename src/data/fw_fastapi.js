import meta       from '../content/fastapi/meta.yaml';
import podstawy   from '../content/fastapi/podstawy.yaml';
import endpointy  from '../content/fastapi/endpointy.yaml';
import zaleznosci from '../content/fastapi/zaleznosci.yaml';
import walidacja  from '../content/fastapi/walidacja.yaml';
import asyncData  from '../content/fastapi/async.yaml';
import rivals     from '../content/fastapi/rivals.yaml';
import plugins    from '../content/fastapi/plugins.yaml';
import cli        from '../content/fastapi/cli.yaml';

export const FW_FASTAPI_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: endpointy,
    hooki:      zaleznosci,
    routing:    walidacja,
    state:      asyncData,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
