import meta       from '../content/pytorch/meta.yaml';
import podstawy   from '../content/pytorch/podstawy.yaml';
import tensory    from '../content/pytorch/tensory.yaml';
import modele     from '../content/pytorch/modele.yaml';
import trening    from '../content/pytorch/trening.yaml';
import deployment from '../content/pytorch/deployment.yaml';
import rivals     from '../content/pytorch/rywale.yaml';
import pluginy    from '../content/pytorch/pluginy.yaml';
import komendy    from '../content/pytorch/komendy.yaml';

export const FW_PYTORCH_DATA = {
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
