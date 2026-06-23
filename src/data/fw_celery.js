import meta       from '../content/celery/meta.yaml';
import podstawy   from '../content/celery/podstawy.yaml';
import taski      from '../content/celery/taski.yaml';
import workflow   from '../content/celery/workflow.yaml';
import scheduling from '../content/celery/scheduling.yaml';
import monitoring from '../content/celery/monitoring.yaml';
import rivals     from '../content/celery/rivals.yaml';
import plugins    from '../content/celery/plugins.yaml';
import cli        from '../content/celery/cli.yaml';

export const FW_CELERY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: taski,
    hooki:      workflow,
    routing:    scheduling,
    state:      monitoring,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
