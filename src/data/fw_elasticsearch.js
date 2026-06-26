import meta          from '../content/elasticsearch/meta.yaml';
import podstawy      from '../content/elasticsearch/podstawy.yaml';
import indeksy       from '../content/elasticsearch/indeksy.yaml';
import wyszukiwanie  from '../content/elasticsearch/wyszukiwanie.yaml';
import agregacje     from '../content/elasticsearch/agregacje.yaml';
import elk           from '../content/elasticsearch/elk.yaml';
import rivals        from '../content/elasticsearch/rivals.yaml';
import plugins       from '../content/elasticsearch/plugins.yaml';
import cli           from '../content/elasticsearch/cli.yaml';

export const FW_ELASTICSEARCH_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: indeksy,
    hooki:      wyszukiwanie,
    routing:    agregacje,
    state:      elk,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
