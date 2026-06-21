import meta       from '../content/scikitlearn/meta.yaml';
import podstawy   from '../content/scikitlearn/podstawy.yaml';
import tensory    from '../content/scikitlearn/tensory.yaml';
import modele     from '../content/scikitlearn/modele.yaml';
import trening    from '../content/scikitlearn/trening.yaml';
import deployment from '../content/scikitlearn/deployment.yaml';
import rivals     from '../content/scikitlearn/rywale.yaml';
import pluginy    from '../content/scikitlearn/pluginy.yaml';
import komendy    from '../content/scikitlearn/komendy.yaml';

export const FW_SCIKITLEARN_DATA = {
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
