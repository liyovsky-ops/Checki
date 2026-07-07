import meta      from '../content/threejs/meta.yaml';
import podstawy  from '../content/threejs/podstawy.yaml';
import scene     from '../content/threejs/scene.yaml';
import materials from '../content/threejs/materials.yaml';
import rivals    from '../content/threejs/rivals.yaml';
import plugins   from '../content/threejs/plugins.yaml';
import cli       from '../content/threejs/cli.yaml';

export const FW_THREEJS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: scene,
    hooki:      materials,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
