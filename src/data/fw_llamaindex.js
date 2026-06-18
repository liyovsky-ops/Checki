import meta        from '../content/llamaindex/meta.yaml';
import podstawy    from '../content/llamaindex/podstawy.yaml';
import komponenty  from '../content/llamaindex/komponenty.yaml';
import hooki       from '../content/llamaindex/hooki.yaml';
import routing     from '../content/llamaindex/routing.yaml';
import state       from '../content/llamaindex/state.yaml';
import rivals      from '../content/llamaindex/rivals.yaml';
import plugins     from '../content/llamaindex/pluginy.yaml';
import cli         from '../content/llamaindex/cli.yaml';

export const FW_LLAMAINDEX_DATA = {
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
