import meta       from '../content/kafka/meta.yaml';
import podstawy   from '../content/kafka/podstawy.yaml';
import producent  from '../content/kafka/producent.yaml';
import konsument  from '../content/kafka/konsument.yaml';
import topics     from '../content/kafka/topics.yaml';
import streams    from '../content/kafka/streams.yaml';
import rivals     from '../content/kafka/rivals.yaml';
import plugins    from '../content/kafka/plugins.yaml';
import cli        from '../content/kafka/cli.yaml';

export const FW_KAFKA_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: producent,
    hooki:      konsument,
    routing:    topics,
    state:      streams,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
