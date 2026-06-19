import meta        from '../content/pandas/meta.yaml';
import podstawy    from '../content/pandas/podstawy.yaml';
import dataframe   from '../content/pandas/dataframe.yaml';
import czyszczenie from '../content/pandas/czyszczenie.yaml';
import analiza     from '../content/pandas/analiza.yaml';
import io          from '../content/pandas/io.yaml';
import rivals      from '../content/pandas/rivals.yaml';
import pluginy     from '../content/pandas/pluginy.yaml';
import komendy     from '../content/pandas/komendy.yaml';

export const FW_PANDAS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: dataframe,
    hooki:      czyszczenie,
    routing:    analiza,
    state:      io,
    rywale:     rivals,
    pluginy,
    komendy,
  }
};
