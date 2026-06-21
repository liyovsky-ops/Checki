import meta       from '../content/numpy/meta.yaml';
import podstawy   from '../content/numpy/podstawy.yaml';
import tensory    from '../content/numpy/tensory.yaml';
import modele     from '../content/numpy/modele.yaml';
import trening    from '../content/numpy/trening.yaml';
import deployment from '../content/numpy/deployment.yaml';
import rivals     from '../content/numpy/rywale.yaml';
import pluginy    from '../content/numpy/pluginy.yaml';
import komendy    from '../content/numpy/komendy.yaml';

export const FW_NUMPY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: tensory,
    hooki:      modele,
    routing:    trening,
    state:      deployment,
    rywale:     rivals,
    pluginy,
    komendy,
  }
};
