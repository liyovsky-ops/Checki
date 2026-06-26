import meta       from '../content/golang/meta.yaml';
import podstawy   from '../content/golang/podstawy.yaml';
import typy       from '../content/golang/typy.yaml';
import goroutines from '../content/golang/goroutines.yaml';
import http       from '../content/golang/http.yaml';
import bledy      from '../content/golang/bledy.yaml';
import rivals     from '../content/golang/rivals.yaml';
import plugins    from '../content/golang/plugins.yaml';
import cli        from '../content/golang/cli.yaml';

export const FW_GOLANG_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: typy,
    hooki:      goroutines,
    routing:    http,
    state:      bledy,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
