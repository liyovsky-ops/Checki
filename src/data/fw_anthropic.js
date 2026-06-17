import meta        from '../content/anthropic/meta.yaml';
import podstawy    from '../content/anthropic/podstawy.yaml';
import komponenty  from '../content/anthropic/komponenty.yaml';
import hooki       from '../content/anthropic/hooki.yaml';
import routing     from '../content/anthropic/routing.yaml';
import state       from '../content/anthropic/state.yaml';
import rivals      from '../content/anthropic/rivals.yaml';
import plugins     from '../content/anthropic/pluginy.yaml';
import cli         from '../content/anthropic/cli.yaml';

export const FW_ANTHROPIC_DATA = {
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
