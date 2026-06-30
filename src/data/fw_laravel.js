import meta       from '../content/laravel/meta.yaml';
import podstawy   from '../content/laravel/podstawy.yaml';
import eloquent   from '../content/laravel/eloquent.yaml';
import blade      from '../content/laravel/blade.yaml';
import routing    from '../content/laravel/routing.yaml';
import middleware from '../content/laravel/middleware.yaml';
import rivals     from '../content/laravel/rivals.yaml';
import plugins    from '../content/laravel/plugins.yaml';
import cli        from '../content/laravel/cli.yaml';

export const FW_LARAVEL_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: eloquent,
    hooki:      blade,
    routing,
    state:      middleware,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
