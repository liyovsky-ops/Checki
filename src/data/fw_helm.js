import meta        from '../content/helm/meta.yaml';
import podstawy    from '../content/helm/podstawy.yaml';
import charts      from '../content/helm/charts.yaml';
import templating  from '../content/helm/templating.yaml';
import repo        from '../content/helm/repo.yaml';
import zarzadzanie from '../content/helm/zarządzanie.yaml';
import rivals      from '../content/helm/rivals.yaml';
import plugins     from '../content/helm/plugins.yaml';
import cli         from '../content/helm/cli.yaml';

export const FW_HELM_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: charts,
    hooki:      templating,
    routing:    repo,
    state:      zarzadzanie,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
