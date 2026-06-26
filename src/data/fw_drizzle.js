import meta     from '../content/drizzle/meta.yaml';
import podstawy from '../content/drizzle/podstawy.yaml';
import schema   from '../content/drizzle/schema.yaml';
import queries  from '../content/drizzle/queries.yaml';
import relacje  from '../content/drizzle/relacje.yaml';
import migracje from '../content/drizzle/migracje.yaml';
import rivals   from '../content/drizzle/rivals.yaml';
import plugins  from '../content/drizzle/plugins.yaml';
import cli      from '../content/drizzle/cli.yaml';

export const FW_DRIZZLE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: schema,
    hooki:      queries,
    routing:    relacje,
    state:      migracje,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
