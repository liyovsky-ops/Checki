import meta        from '../content/socketio/meta.yaml';
import podstawy    from '../content/socketio/podstawy.yaml';
import eventy      from '../content/socketio/eventy.yaml';
import rooms       from '../content/socketio/rooms.yaml';
import reacthook   from '../content/socketio/reacthook.yaml';
import autoryzacja from '../content/socketio/autoryzacja.yaml';
import rivals      from '../content/socketio/rivals.yaml';
import plugins     from '../content/socketio/plugins.yaml';
import cli         from '../content/socketio/cli.yaml';

export const FW_SOCKETIO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: eventy,
    hooki:      rooms,
    routing:    reacthook,
    state:      autoryzacja,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
