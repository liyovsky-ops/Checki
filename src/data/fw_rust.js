import meta      from '../content/rust/meta.yaml';
import podstawy  from '../content/rust/podstawy.yaml';
import ownership from '../content/rust/ownership.yaml';
import traits    from '../content/rust/traits.yaml';
import bledy     from '../content/rust/bledy.yaml';
import async_    from '../content/rust/async.yaml';
import rivals    from '../content/rust/rivals.yaml';
import plugins   from '../content/rust/plugins.yaml';
import cli       from '../content/rust/cli.yaml';

export const FW_RUST_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: ownership,
    hooki:      traits,
    routing:    bledy,
    state:      async_,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
