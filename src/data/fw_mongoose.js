import meta       from '../content/mongoose/meta.yaml';
import podstawy   from '../content/mongoose/podstawy.yaml';
import schemas    from '../content/mongoose/schemas.yaml';
import queries    from '../content/mongoose/queries.yaml';
import population from '../content/mongoose/population.yaml';
import middleware from '../content/mongoose/middleware.yaml';
import rivals     from '../content/mongoose/rivals.yaml';
import plugins    from '../content/mongoose/plugins.yaml';
import cli        from '../content/mongoose/cli.yaml';

export const FW_MONGOOSE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: schemas,
    hooki:      queries,
    routing:    population,
    state:      middleware,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
