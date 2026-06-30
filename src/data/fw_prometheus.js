import meta      from '../content/prometheus/meta.yaml';
import podstawy  from '../content/prometheus/podstawy.yaml';
import promql    from '../content/prometheus/promql.yaml';
import alerting  from '../content/prometheus/alerting.yaml';
import exporters from '../content/prometheus/exporters.yaml';
import storage   from '../content/prometheus/storage.yaml';
import rivals    from '../content/prometheus/rivals.yaml';
import plugins   from '../content/prometheus/plugins.yaml';
import cli       from '../content/prometheus/cli.yaml';

export const FW_PROMETHEUS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: promql,
    hooki:      alerting,
    routing:    exporters,
    state:      storage,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
