import meta        from '../content/openai/meta.yaml';
import podstawy    from '../content/openai/podstawy.yaml';
import komponenty  from '../content/openai/komponenty.yaml';
import hooki        from '../content/openai/hooki.yaml';
import routing      from '../content/openai/routing.yaml';
import state        from '../content/openai/state.yaml';
import rivals      from '../content/openai/rivals.yaml';
import plugins     from '../content/openai/plugins.yaml';
import cli         from '../content/openai/cli.yaml';

export const FW_OPENAI_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki,
    routing,
    state,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
