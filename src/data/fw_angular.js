import meta       from '../content/angular/meta.yaml';
import podstawy   from '../content/angular/podstawy.yaml';
import komponenty from '../content/angular/komponenty.yaml';
import hooki      from '../content/angular/hooki.yaml';
import routing    from '../content/angular/routing.yaml';
import state      from '../content/angular/state.yaml';
import rivals     from '../content/angular/rivals.yaml';
import plugins    from '../content/angular/ekosystem.yaml';
import cli        from '../content/angular/cli.yaml';

export const FW_ANGULAR_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki,
    routing,
    state,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
