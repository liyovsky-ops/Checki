import meta        from '../content/sqlalchemy/meta.yaml';
import podstawy    from '../content/sqlalchemy/podstawy.yaml';
import komponenty  from '../content/sqlalchemy/komponenty.yaml';
import hooki       from '../content/sqlalchemy/hooki.yaml';
import routing     from '../content/sqlalchemy/routing.yaml';
import state       from '../content/sqlalchemy/state.yaml';
import rivals      from '../content/sqlalchemy/rivals.yaml';
import plugins     from '../content/sqlalchemy/pluginy.yaml';
import cli         from '../content/sqlalchemy/cli.yaml';

export const FW_SQLALCHEMY_DATA = {
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
