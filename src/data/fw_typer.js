import meta       from '../content/typer/meta.yaml';
import podstawy   from '../content/typer/podstawy.yaml';
import komendy_t  from '../content/typer/komendy.yaml';
import opcje      from '../content/typer/opcje.yaml';
import subkomendy from '../content/typer/subkomendy.yaml';
import output     from '../content/typer/output.yaml';
import rivals     from '../content/typer/rivals.yaml';
import plugins    from '../content/typer/pluginy.yaml';
import cli        from '../content/typer/cli.yaml';

export const FW_TYPER_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: komendy_t,
    hooki:      opcje,
    routing:    subkomendy,
    state:      output,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  },
};
