import meta      from '../content/fastify/meta.yaml';
import podstawy  from '../content/fastify/podstawy.yaml';
import routes    from '../content/fastify/routes.yaml';
import hooks     from '../content/fastify/hooks.yaml';
import pluginsys from '../content/fastify/plugins.yaml';
import walidacja from '../content/fastify/walidacja.yaml';
import rivals    from '../content/fastify/rivals.yaml';
import eco       from '../content/fastify/plugins-eco.yaml';
import cli       from '../content/fastify/cli.yaml';

export const FW_FASTIFY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: routes,
    hooki:      hooks,
    routing:    pluginsys,
    state:      walidacja,
    rywale:     rivals,
    pluginy:    eco,
    komendy:    cli,
  }
};
