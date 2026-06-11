import meta        from '../content/docker/meta.yaml';
import podstawy    from '../content/docker/podstawy.yaml';
import dockerfile  from '../content/docker/dockerfile.yaml';
import compose     from '../content/docker/compose.yaml';
import siec        from '../content/docker/siec.yaml';
import produkcja   from '../content/docker/produkcja.yaml';
import rivals      from '../content/docker/rivals.yaml';
import plugins     from '../content/docker/plugins.yaml';
import cli         from '../content/docker/cli.yaml';

export const FW_DOCKER_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: dockerfile,
    hooki:      compose,
    routing:    siec,
    state:      produkcja,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
