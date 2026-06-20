import meta        from '../content/huggingface/meta.yaml';
import podstawy    from '../content/huggingface/podstawy.yaml';
import transformers from '../content/huggingface/transformers.yaml';
import datasets    from '../content/huggingface/datasets.yaml';
import trening     from '../content/huggingface/trening.yaml';
import deployment  from '../content/huggingface/deployment.yaml';
import rivals      from '../content/huggingface/rywale.yaml';
import pluginy     from '../content/huggingface/pluginy.yaml';
import komendy     from '../content/huggingface/komendy.yaml';

export const FW_HUGGINGFACE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: transformers,
    hooki:      datasets,
    routing:    trening,
    state:      deployment,
    rywale:     rivals,
    pluginy,
    komendy,
  }
};
