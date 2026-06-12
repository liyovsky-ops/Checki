import meta          from '../content/terraform/meta.yaml';
import podstawy      from '../content/terraform/podstawy.yaml';
import zasoby        from '../content/terraform/zasoby.yaml';
import zmienne       from '../content/terraform/zmienne.yaml';
import moduly        from '../content/terraform/moduly.yaml';
import zaawansowane  from '../content/terraform/zaawansowane.yaml';
import rivals        from '../content/terraform/rivals.yaml';
import plugins       from '../content/terraform/plugins.yaml';
import cli           from '../content/terraform/cli.yaml';

export const FW_TERRAFORM_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  zasoby,
    hooki:       zmienne,
    routing:     moduly,
    state:       zaawansowane,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
