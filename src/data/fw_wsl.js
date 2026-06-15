import meta         from '../content/wsl/meta.yaml';
import podstawy     from '../content/wsl/podstawy.yaml';
import instalacja   from '../content/wsl/instalacja.yaml';
import srodowisko   from '../content/wsl/srodowisko.yaml';
import siec         from '../content/wsl/siec.yaml';
import skrypty      from '../content/wsl/skrypty.yaml';
import rivals       from '../content/wsl/rivals.yaml';
import plugins      from '../content/wsl/plugins.yaml';
import cli          from '../content/wsl/cli.yaml';

export const FW_WSL_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  instalacja,
    hooki:       srodowisko,
    routing:     siec,
    state:       skrypty,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
