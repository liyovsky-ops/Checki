import meta        from '../content/langgraph/meta.yaml';
import podstawy    from '../content/langgraph/podstawy.yaml';
import graf        from '../content/langgraph/graf.yaml';
import agenci      from '../content/langgraph/agenci.yaml';
import pamiec      from '../content/langgraph/pamiec.yaml';
import multiagent  from '../content/langgraph/multiagent.yaml';
import rivals      from '../content/langgraph/rivals.yaml';
import plugins     from '../content/langgraph/plugins.yaml';
import cli         from '../content/langgraph/cli.yaml';

export const FW_LANGGRAPH_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  graf,
    hooki:       agenci,
    routing:     pamiec,
    state:       multiagent,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
