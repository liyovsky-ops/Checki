import meta       from '../content/vue/meta.yaml';
import podstawy   from '../content/vue/podstawy.yaml';
import komponenty from '../content/vue/komponenty.yaml';
import hooki      from '../content/vue/hooki.yaml';
import routing    from '../content/vue/routing.yaml';
import state      from '../content/vue/state.yaml';
import rivals     from '../content/vue/rivals.yaml';
import plugins    from '../content/vue/ekosystem.yaml';
import cli        from '../content/vue/cli.yaml';

export const FW_VUE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki,
    routing,
    state,
    rywale:  rivals,
    pluginy: plugins,
    komendy: cli,
  }
};
