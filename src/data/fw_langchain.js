import meta    from '../content/langchain/meta.yaml';
import podstawy from '../content/langchain/podstawy.yaml';
import lcel     from '../content/langchain/lcel.yaml';
import agenty   from '../content/langchain/agenty.yaml';
import rag      from '../content/langchain/rag.yaml';
import pamiec   from '../content/langchain/pamiec.yaml';
import rivals   from '../content/langchain/rivals.yaml';
import plugins  from '../content/langchain/plugins.yaml';
import cli      from '../content/langchain/cli.yaml';

export const FW_LANGCHAIN_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: lcel,
    hooki:      agenty,
    routing:    rag,
    state:      pamiec,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
