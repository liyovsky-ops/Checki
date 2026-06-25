import meta       from '../content/svelte/meta.yaml';
import podstawy   from '../content/svelte/podstawy.yaml';
import komponenty from '../content/svelte/komponenty.yaml';
import hooki      from '../content/svelte/hooki.yaml';
import routing    from '../content/svelte/routing.yaml';
import state      from '../content/svelte/state.yaml';
import rivals     from '../content/svelte/rivals.yaml';
import plugins    from '../content/svelte/ekosystem.yaml';
import cli        from '../content/svelte/cli.yaml';

export const FW_SVELTE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki,
    routing,
    state,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
