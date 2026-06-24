import meta       from '../content/tensorflow/meta.yaml';
import podstawy   from '../content/tensorflow/podstawy.yaml';
import modele     from '../content/tensorflow/modele.yaml';
import trening    from '../content/tensorflow/trening.yaml';
import dane       from '../content/tensorflow/dane.yaml';
import deployment from '../content/tensorflow/deployment.yaml';
import rivals     from '../content/tensorflow/rivals.yaml';
import plugins    from '../content/tensorflow/plugins.yaml';
import cli        from '../content/tensorflow/cli.yaml';

export const FW_TENSORFLOW_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: modele,
    hooki:      trening,
    routing:    dane,
    state:      deployment,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
