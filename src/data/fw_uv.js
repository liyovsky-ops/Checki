import meta      from '../content/uv/meta.yaml';
import podstawy  from '../content/uv/podstawy.yaml';
import pakiety   from '../content/uv/pakiety.yaml';
import projekty  from '../content/uv/projekty.yaml';
import python    from '../content/uv/python.yaml';
import skrypty   from '../content/uv/skrypty.yaml';
import rivals    from '../content/uv/rivals.yaml';
import plugins   from '../content/uv/plugins.yaml';
import komendy   from '../content/uv/cli.yaml';

export const FW_UV_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: pakiety,
    hooki:      projekty,
    routing:    python,
    state:      skrypty,
    rywale:     rivals,
    pluginy:    plugins,
    komendy,
  },
};
