import meta    from '../content/mysql/meta.yaml';
import podstawy from '../content/mysql/podstawy.yaml';
import ddl      from '../content/mysql/ddl.yaml';
import queries  from '../content/mysql/queries.yaml';
import joins    from '../content/mysql/joins.yaml';
import indexes  from '../content/mysql/indexes.yaml';
import rivals   from '../content/mysql/rivals.yaml';
import plugins  from '../content/mysql/plugins.yaml';
import cli      from '../content/mysql/cli.yaml';

export const FW_MYSQL_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: ddl,
    hooki:      queries,
    routing:    joins,
    state:      indexes,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
