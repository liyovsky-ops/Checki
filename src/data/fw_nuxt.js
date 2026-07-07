import meta        from '../content/nuxt/meta.yaml';
import podstawy    from '../content/nuxt/podstawy.yaml';
import komponenty  from '../content/nuxt/komponenty.yaml';
import composables from '../content/nuxt/composables.yaml';
import routing     from '../content/nuxt/routing.yaml';
import state       from '../content/nuxt/state.yaml';
import rivals      from '../content/nuxt/rivals.yaml';
import plugins     from '../content/nuxt/plugins.yaml';
import cli         from '../content/nuxt/cli.yaml';

export const FW_NUXT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki:   composables,
    routing,
    state,
    rywale:  rivals,
    pluginy: plugins,
    komendy: cli,
  }
};
