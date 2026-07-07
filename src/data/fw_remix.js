import meta       from '../content/remix/meta.yaml';
import podstawy   from '../content/remix/podstawy.yaml';
import komponenty from '../content/remix/komponenty.yaml';
import loaders    from '../content/remix/loaders.yaml';
import routing    from '../content/remix/routing.yaml';
import errors     from '../content/remix/errors.yaml';
import rivals     from '../content/remix/rivals.yaml';
import plugins    from '../content/remix/plugins.yaml';
import cli        from '../content/remix/cli.yaml';

export const FW_REMIX_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki:   loaders,
    routing,
    state:   errors,
    rywale:  rivals,
    pluginy: plugins,
    komendy: cli,
  }
};
