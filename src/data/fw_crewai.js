import meta      from '../content/crewai/meta.yaml';
import podstawy  from '../content/crewai/podstawy.yaml';
import agenci    from '../content/crewai/agenci.yaml';
import workflow  from '../content/crewai/workflow.yaml';
import narzedzia from '../content/crewai/narzedzia.yaml';
import memory    from '../content/crewai/memory.yaml';
import rivals    from '../content/crewai/rivals.yaml';
import plugins   from '../content/crewai/plugins.yaml';
import cli       from '../content/crewai/cli.yaml';

export const FW_CREWAI_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: agenci,
    hooki:      workflow,
    routing:    narzedzia,
    state:      memory,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
