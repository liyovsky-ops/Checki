import meta       from '../content/react/meta.yaml';
import podstawy   from '../content/react/podstawy.yaml';
import komponenty from '../content/react/komponenty.yaml';
import hooki      from '../content/react/hooki.yaml';
import routing    from '../content/react/routing.yaml';
import state      from '../content/react/state.yaml';
import rivals     from '../content/react/rivals.yaml';
import ekosystem  from '../content/react/ekosystem.yaml';
import cli        from '../content/react/cli.yaml';

export const FW_REACT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki,
    routing,
    state,
    rywale:  rivals,
    pluginy: ekosystem,
    komendy: cli,
  }
};
