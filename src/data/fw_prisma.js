import meta     from '../content/prisma/meta.yaml';
import podstawy from '../content/prisma/podstawy.yaml';
import schema   from '../content/prisma/schema.yaml';
import queries  from '../content/prisma/queries.yaml';
import relacje  from '../content/prisma/relacje.yaml';
import migracje from '../content/prisma/migracje.yaml';
import rivals   from '../content/prisma/rivals.yaml';
import plugins  from '../content/prisma/plugins.yaml';
import cli      from '../content/prisma/cli.yaml';

export const FW_PRISMA_DATA = {
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
