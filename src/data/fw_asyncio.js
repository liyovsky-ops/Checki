import meta           from '../content/asyncio/meta.yaml';
import podstawy       from '../content/asyncio/podstawy.yaml';
import korutyny       from '../content/asyncio/korutyny.yaml';
import tasks          from '../content/asyncio/tasks.yaml';
import synchronizacja from '../content/asyncio/synchronizacja.yaml';
import zaawansowane   from '../content/asyncio/zaawansowane.yaml';
import rivals         from '../content/asyncio/rivals.yaml';
import plugins        from '../content/asyncio/plugins.yaml';
import cli            from '../content/asyncio/cli.yaml';

export const FW_ASYNCIO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: korutyny,
    hooki:      tasks,
    routing:    synchronizacja,
    state:      zaawansowane,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
