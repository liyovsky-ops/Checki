import meta         from '../content/astro/meta.yaml';
import podstawy     from '../content/astro/podstawy.yaml';
import components   from '../content/astro/components.yaml';
import routing      from '../content/astro/routing.yaml';
import content      from '../content/astro/content.yaml';
import integrations from '../content/astro/integrations.yaml';
import rivals       from '../content/astro/rivals.yaml';
import plugins      from '../content/astro/plugins.yaml';
import cli          from '../content/astro/cli.yaml';

export const FW_ASTRO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: components,
    hooki:      routing,
    routing:    content,
    state:      integrations,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
