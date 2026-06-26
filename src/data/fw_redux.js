import meta       from '../content/redux/meta.yaml';
import podstawy   from '../content/redux/podstawy.yaml';
import slice      from '../content/redux/slice.yaml';
import hooki      from '../content/redux/hooki.yaml';
import rtkquery   from '../content/redux/rtkquery.yaml';
import middleware from '../content/redux/middleware.yaml';
import rivals     from '../content/redux/rivals.yaml';
import plugins    from '../content/redux/plugins.yaml';
import cli        from '../content/redux/cli.yaml';

export const FW_REDUX_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: slice,
    hooki:      hooki,
    routing:    rtkquery,
    state:      middleware,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
