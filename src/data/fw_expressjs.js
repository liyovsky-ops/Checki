import meta       from '../content/expressjs/meta.yaml';
import podstawy   from '../content/expressjs/podstawy.yaml';
import middleware  from '../content/expressjs/middleware.yaml';
import routing    from '../content/expressjs/routing.yaml';
import reqres     from '../content/expressjs/request-response.yaml';
import errors     from '../content/expressjs/errors.yaml';
import rivals     from '../content/expressjs/rivals.yaml';
import plugins    from '../content/expressjs/plugins.yaml';
import cli        from '../content/expressjs/cli.yaml';

export const FW_EXPRESSJS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: middleware,
    hooki:      routing,
    routing:    reqres,
    state:      errors,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
