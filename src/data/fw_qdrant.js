import meta         from '../content/qdrant/meta.yaml';
import podstawy     from '../content/qdrant/podstawy.yaml';
import kolekcje     from '../content/qdrant/kolekcje.yaml';
import wektory      from '../content/qdrant/wektory.yaml';
import wyszukiwanie from '../content/qdrant/wyszukiwanie.yaml';
import filtry       from '../content/qdrant/filtry.yaml';
import rivals       from '../content/qdrant/rivals.yaml';
import plugins      from '../content/qdrant/pluginy.yaml';
import komendy      from '../content/qdrant/komendy.yaml';

export const FW_QDRANT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: kolekcje,
    hooki:      wektory,
    routing:    wyszukiwanie,
    state:      filtry,
    rywale:     rivals,
    pluginy:    plugins,
    komendy,
  },
};
