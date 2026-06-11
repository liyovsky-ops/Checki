import meta       from '../content/mcp/meta.yaml';
import podstawy   from '../content/mcp/podstawy.yaml';
import serwery    from '../content/mcp/serwery.yaml';
import narzedzia  from '../content/mcp/narzedzia.yaml';
import zasoby     from '../content/mcp/zasoby.yaml';
import klienci    from '../content/mcp/klienci.yaml';
import rivals     from '../content/mcp/rivals.yaml';
import plugins    from '../content/mcp/plugins.yaml';
import cli        from '../content/mcp/cli.yaml';

export const FW_MCP_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: serwery,
    hooki:      narzedzia,
    routing:    zasoby,
    state:      klienci,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
