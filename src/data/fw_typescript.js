import meta       from '../content/typescript/meta.yaml';
import podstawy   from '../content/typescript/podstawy.yaml';
import types      from '../content/typescript/types.yaml';
import generyki   from '../content/typescript/generyki.yaml';
import config     from '../content/typescript/config.yaml';
import toolchain  from '../content/typescript/toolchain.yaml';
import rivals     from '../content/typescript/rivals.yaml';
import plugins    from '../content/typescript/plugins.yaml';
import cli        from '../content/typescript/cli.yaml';

export const FW_TYPESCRIPT_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: types,
    hooki:      generyki,
    routing:    config,
    state:      toolchain,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
