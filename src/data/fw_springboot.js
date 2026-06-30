import meta      from '../content/springboot/meta.yaml';
import podstawy  from '../content/springboot/podstawy.yaml';
import rest      from '../content/springboot/rest.yaml';
import jpa       from '../content/springboot/jpa.yaml';
import security  from '../content/springboot/security.yaml';
import config    from '../content/springboot/config.yaml';
import rivals    from '../content/springboot/rivals.yaml';
import plugins   from '../content/springboot/plugins.yaml';
import cli       from '../content/springboot/cli.yaml';

export const FW_SPRINGBOOT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: rest,
    hooki:      jpa,
    routing:    security,
    state:      config,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
