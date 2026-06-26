import meta          from '../content/bun/meta.yaml';
import podstawy      from '../content/bun/podstawy.yaml';
import bunapis       from '../content/bun/bunapis.yaml';
import httpserver    from '../content/bun/httpserver.yaml';
import packagemanager from '../content/bun/packagemanager.yaml';
import testing       from '../content/bun/testing.yaml';
import rivals        from '../content/bun/rivals.yaml';
import plugins       from '../content/bun/plugins.yaml';
import cli           from '../content/bun/cli.yaml';

export const FW_BUN_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: bunapis,
    hooki:      httpserver,
    routing:    packagemanager,
    state:      testing,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
