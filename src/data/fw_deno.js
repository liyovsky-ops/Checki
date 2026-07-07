import meta        from '../content/deno/meta.yaml';
import podstawy    from '../content/deno/podstawy.yaml';
import runtime     from '../content/deno/runtime.yaml';
import permissions from '../content/deno/permissions.yaml';
import rivals      from '../content/deno/rivals.yaml';
import plugins     from '../content/deno/plugins.yaml';
import cli         from '../content/deno/cli.yaml';

export const FW_DENO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: runtime,
    hooki:      permissions,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
