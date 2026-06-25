import meta             from '../content/nextjs/meta.yaml';
import podstawy         from '../content/nextjs/podstawy.yaml';
import approuter        from '../content/nextjs/approuter.yaml';
import servercomponents from '../content/nextjs/servercomponents.yaml';
import datafetching     from '../content/nextjs/datafetching.yaml';
import middleware       from '../content/nextjs/middleware.yaml';
import rivals           from '../content/nextjs/rivals.yaml';
import ekosystem        from '../content/nextjs/ekosystem.yaml';
import cli              from '../content/nextjs/cli.yaml';

export const FW_NEXTJS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: approuter,
    hooki:      servercomponents,
    routing:    datafetching,
    state:      middleware,
    rywale:     rivals,
    pluginy:    ekosystem,
    komendy:    cli,
  }
};
