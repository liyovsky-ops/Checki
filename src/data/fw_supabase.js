import meta      from '../content/supabase/meta.yaml';
import podstawy  from '../content/supabase/podstawy.yaml';
import database  from '../content/supabase/database.yaml';
import auth      from '../content/supabase/auth.yaml';
import storage   from '../content/supabase/storage.yaml';
import realtime  from '../content/supabase/realtime.yaml';
import rivals    from '../content/supabase/rivals.yaml';
import plugins   from '../content/supabase/plugins.yaml';
import cli       from '../content/supabase/cli.yaml';

export const FW_SUPABASE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: database,
    hooki:      auth,
    routing:    storage,
    state:      realtime,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
