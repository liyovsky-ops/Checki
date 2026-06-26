import meta          from '../content/zod/meta.yaml';
import podstawy      from '../content/zod/podstawy.yaml';
import schematy      from '../content/zod/schematy.yaml';
import transformacje from '../content/zod/transformacje.yaml';
import reactTab      from '../content/zod/react.yaml';
import integracje    from '../content/zod/integracje.yaml';
import rivals        from '../content/zod/rivals.yaml';
import plugins       from '../content/zod/plugins.yaml';
import cli           from '../content/zod/cli.yaml';

export const FW_ZOD_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: schematy,
    hooki:      transformacje,
    routing:    reactTab,
    state:      integracje,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
