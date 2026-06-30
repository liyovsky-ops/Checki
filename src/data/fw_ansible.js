import meta      from '../content/ansible/meta.yaml';
import podstawy  from '../content/ansible/podstawy.yaml';
import playbooks from '../content/ansible/playbooks.yaml';
import roles     from '../content/ansible/roles.yaml';
import inventory from '../content/ansible/inventory.yaml';
import vault     from '../content/ansible/vault.yaml';
import rivals    from '../content/ansible/rivals.yaml';
import plugins   from '../content/ansible/plugins.yaml';
import cli       from '../content/ansible/cli.yaml';

export const FW_ANSIBLE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: playbooks,
    hooki:      roles,
    routing:    inventory,
    state:      vault,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
