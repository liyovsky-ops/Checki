import meta       from '../content/hono/meta.yaml';
import podstawy   from '../content/hono/podstawy.yaml';
import routing    from '../content/hono/routing.yaml';
import middleware from '../content/hono/middleware.yaml';
import walidacja  from '../content/hono/walidacja.yaml';
import adaptery   from '../content/hono/adaptery.yaml';
import rivals     from '../content/hono/rivals.yaml';
import plugins    from '../content/hono/plugins.yaml';
import cli        from '../content/hono/cli.yaml';

export const FW_HONO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: routing,
    hooki:      middleware,
    routing:    walidacja,
    state:      adaptery,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
