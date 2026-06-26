import meta       from '../content/trpc/meta.yaml';
import podstawy   from '../content/trpc/podstawy.yaml';
import router     from '../content/trpc/router.yaml';
import klient     from '../content/trpc/klient.yaml';
import middleware from '../content/trpc/middleware.yaml';
import nextjs     from '../content/trpc/nextjs.yaml';
import rivals     from '../content/trpc/rivals.yaml';
import plugins    from '../content/trpc/plugins.yaml';
import cli        from '../content/trpc/cli.yaml';

export const FW_TRPC_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: router,
    hooki:      klient,
    routing:    middleware,
    state:      nextjs,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
