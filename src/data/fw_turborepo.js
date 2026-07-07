import meta      from '../content/turborepo/meta.yaml';
import podstawy  from '../content/turborepo/podstawy.yaml';
import pipeline  from '../content/turborepo/pipeline.yaml';
import workspace from '../content/turborepo/workspace.yaml';
import rivals    from '../content/turborepo/rivals.yaml';
import plugins   from '../content/turborepo/plugins.yaml';
import cli       from '../content/turborepo/cli.yaml';

export const FW_TURBOREPO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: pipeline,
    hooki:      workspace,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
