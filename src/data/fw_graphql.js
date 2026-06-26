import meta          from '../content/graphql/meta.yaml';
import podstawy      from '../content/graphql/podstawy.yaml';
import schema        from '../content/graphql/schema.yaml';
import resolvery     from '../content/graphql/resolvery.yaml';
import queries       from '../content/graphql/queries.yaml';
import subscriptions from '../content/graphql/subscriptions.yaml';
import rivals        from '../content/graphql/rivals.yaml';
import plugins       from '../content/graphql/plugins.yaml';
import cli           from '../content/graphql/cli.yaml';

export const FW_GRAPHQL_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: schema,
    hooki:      resolvery,
    routing:    queries,
    state:      subscriptions,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
