import meta         from '../content/kubernetes/meta.yaml';
import podstawy     from '../content/kubernetes/podstawy.yaml';
import architektura from '../content/kubernetes/architektura.yaml';
import manifesty    from '../content/kubernetes/manifesty.yaml';
import siec         from '../content/kubernetes/siec.yaml';
import skalowanie   from '../content/kubernetes/skalowanie.yaml';
import rivals       from '../content/kubernetes/rivals.yaml';
import plugins      from '../content/kubernetes/plugins.yaml';
import cli          from '../content/kubernetes/cli.yaml';

export const FW_KUBERNETES_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: architektura,
    hooki:      manifesty,
    routing:    siec,
    state:      skalowanie,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
