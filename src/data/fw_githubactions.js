import meta      from '../content/githubactions/meta.yaml';
import podstawy  from '../content/githubactions/podstawy.yaml';
import jobs      from '../content/githubactions/jobs.yaml';
import triggers  from '../content/githubactions/triggers.yaml';
import secrets   from '../content/githubactions/secrets.yaml';
import reusable  from '../content/githubactions/reusable.yaml';
import rivals    from '../content/githubactions/rivals.yaml';
import plugins   from '../content/githubactions/plugins.yaml';
import cli       from '../content/githubactions/cli.yaml';

export const FW_GITHUBACTIONS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: jobs,
    hooki:      triggers,
    routing:    secrets,
    state:      reusable,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
