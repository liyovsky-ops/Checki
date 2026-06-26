import meta      from '../content/storybook/meta.yaml';
import podstawy  from '../content/storybook/podstawy.yaml';
import stories   from '../content/storybook/stories.yaml';
import addony    from '../content/storybook/addony.yaml';
import testowanie from '../content/storybook/testowanie.yaml';
import docs      from '../content/storybook/docs.yaml';
import rivals    from '../content/storybook/rivals.yaml';
import plugins   from '../content/storybook/plugins.yaml';
import cli       from '../content/storybook/cli.yaml';

export const FW_STORYBOOK_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: stories,
    hooki:      addony,
    routing:    testowanie,
    state:      docs,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
