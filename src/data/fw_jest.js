import meta      from '../content/jest/meta.yaml';
import podstawy  from '../content/jest/podstawy.yaml';
import matchers  from '../content/jest/matchers.yaml';
import mocking   from '../content/jest/mocking.yaml';
import async     from '../content/jest/async.yaml';
import snapshots from '../content/jest/snapshots.yaml';
import rivals    from '../content/jest/rivals.yaml';
import plugins   from '../content/jest/plugins.yaml';
import cli       from '../content/jest/cli.yaml';

export const FW_JEST_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: matchers,
    hooki:      mocking,
    routing:    async,
    state:      snapshots,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
