import meta          from '../content/cicd/meta.yaml';
import podstawy      from '../content/cicd/podstawy.yaml';
import githubActions from '../content/cicd/github_actions.yaml';
import gitlabCi      from '../content/cicd/gitlab_ci.yaml';
import dockerCi      from '../content/cicd/docker_ci.yaml';
import deployment    from '../content/cicd/deployment.yaml';
import rivals        from '../content/cicd/rivals.yaml';
import plugins       from '../content/cicd/plugins.yaml';
import cli           from '../content/cicd/cli.yaml';

export const FW_CICD_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  githubActions,
    hooki:       gitlabCi,
    routing:     dockerCi,
    state:       deployment,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
