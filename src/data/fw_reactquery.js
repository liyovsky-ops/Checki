import meta          from '../content/reactquery/meta.yaml';
import podstawy      from '../content/reactquery/podstawy.yaml';
import usequery      from '../content/reactquery/usequery.yaml';
import usemutation   from '../content/reactquery/usemutation.yaml';
import zaawansowane  from '../content/reactquery/zaawansowane.yaml';
import optymistyczne from '../content/reactquery/optymistyczne.yaml';
import rivals        from '../content/reactquery/rivals.yaml';
import plugins       from '../content/reactquery/plugins.yaml';
import cli           from '../content/reactquery/cli.yaml';

export const FW_REACTQUERY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: usequery,
    hooki:      usemutation,
    routing:    zaawansowane,
    state:      optymistyczne,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
