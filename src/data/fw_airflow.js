import meta        from '../content/airflow/meta.yaml';
import podstawy    from '../content/airflow/podstawy.yaml';
import dag         from '../content/airflow/dag.yaml';
import operatory   from '../content/airflow/operatory.yaml';
import connections from '../content/airflow/connections.yaml';
import xcom        from '../content/airflow/xcom.yaml';
import rivals      from '../content/airflow/rivals.yaml';
import plugins     from '../content/airflow/plugins.yaml';
import cli         from '../content/airflow/cli.yaml';

export const FW_AIRFLOW_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: dag,
    hooki:      operatory,
    routing:    connections,
    state:      xcom,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
