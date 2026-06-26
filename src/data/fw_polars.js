import meta      from '../content/polars/meta.yaml';
import podstawy  from '../content/polars/podstawy.yaml';
import dataframe from '../content/polars/dataframe.yaml';
import lazy      from '../content/polars/lazy.yaml';
import io        from '../content/polars/io.yaml';
import join      from '../content/polars/join.yaml';
import rivals    from '../content/polars/rivals.yaml';
import plugins   from '../content/polars/plugins.yaml';
import cli       from '../content/polars/cli.yaml';

export const FW_POLARS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: dataframe,
    hooki:      lazy,
    routing:    io,
    state:      join,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
