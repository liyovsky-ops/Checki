import meta      from '../content/vitest/meta.yaml';
import podstawy  from '../content/vitest/podstawy.yaml';
import matchers  from '../content/vitest/matchers.yaml';
import mocking   from '../content/vitest/mocking.yaml';
import async     from '../content/vitest/async.yaml';
import advanced  from '../content/vitest/advanced.yaml';
import rivals    from '../content/vitest/rivals.yaml';
import plugins   from '../content/vitest/plugins.yaml';
import cli       from '../content/vitest/cli.yaml';

export const FW_VITEST_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: matchers,
    hooki:      mocking,
    routing:    async,
    state:      advanced,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
