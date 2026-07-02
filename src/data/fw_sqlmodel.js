import meta     from '../content/sqlmodel/meta.yaml';
import podstawy from '../content/sqlmodel/podstawy.yaml';
import modele   from '../content/sqlmodel/modele.yaml';
import relacje  from '../content/sqlmodel/relacje.yaml';
import queries  from '../content/sqlmodel/queries.yaml';
import fastapi  from '../content/sqlmodel/fastapi.yaml';
import rivals   from '../content/sqlmodel/rivals.yaml';
import plugins  from '../content/sqlmodel/pluginy.yaml';
import snippety from '../content/sqlmodel/snippety.yaml';

export const FW_SQLMODEL_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: modele,
    hooki:      relacje,
    routing:    queries,
    state:      fastapi,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    snippety,
  },
};
