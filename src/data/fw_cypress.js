import meta      from '../content/cypress/meta.yaml';
import podstawy  from '../content/cypress/podstawy.yaml';
import selectors from '../content/cypress/selectors.yaml';
import assertions from '../content/cypress/assertions.yaml';
import network   from '../content/cypress/network.yaml';
import fixtures  from '../content/cypress/fixtures.yaml';
import rivals    from '../content/cypress/rivals.yaml';
import plugins   from '../content/cypress/plugins.yaml';
import cli       from '../content/cypress/cli.yaml';

export const FW_CYPRESS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: selectors,
    hooki:      assertions,
    routing:    network,
    state:      fixtures,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
