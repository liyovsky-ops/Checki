import meta        from '../content/pydanticai/meta.yaml';
import podstawy    from '../content/pydanticai/podstawy.yaml';
import komponenty  from '../content/pydanticai/komponenty.yaml';
import hooki       from '../content/pydanticai/hooki.yaml';
import routing     from '../content/pydanticai/routing.yaml';
import state       from '../content/pydanticai/state.yaml';
import rivals      from '../content/pydanticai/rivals.yaml';
import plugins     from '../content/pydanticai/pluginy.yaml';
import cli         from '../content/pydanticai/cli.yaml';

export const FW_PYDANTICAI_DATA = {
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
