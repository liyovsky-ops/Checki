import meta      from '../content/sveltekit/meta.yaml';
import podstawy  from '../content/sveltekit/podstawy.yaml';
import routing   from '../content/sveltekit/routing.yaml';
import forms     from '../content/sveltekit/forms.yaml';
import rivals    from '../content/sveltekit/rivals.yaml';
import plugins   from '../content/sveltekit/plugins.yaml';
import cli       from '../content/sveltekit/cli.yaml';

export const FW_SVELTEKIT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: routing,
    routing:    forms,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
