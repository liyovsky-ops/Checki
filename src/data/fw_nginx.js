import meta        from '../content/nginx/meta.yaml';
import podstawy    from '../content/nginx/podstawy.yaml';
import serwer      from '../content/nginx/serwer.yaml';
import proxy       from '../content/nginx/proxy.yaml';
import ssl         from '../content/nginx/ssl.yaml';
import performance from '../content/nginx/performance.yaml';
import rivals      from '../content/nginx/rivals.yaml';
import plugins     from '../content/nginx/plugins.yaml';
import cli         from '../content/nginx/cli.yaml';

export const FW_NGINX_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: serwer,
    hooki:      proxy,
    routing:    ssl,
    state:      performance,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
