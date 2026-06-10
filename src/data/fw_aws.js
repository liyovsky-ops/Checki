import meta       from '../content/aws/meta.yaml';
import podstawy   from '../content/aws/podstawy.yaml';
import compute    from '../content/aws/compute.yaml';
import storage    from '../content/aws/storage.yaml';
import networking from '../content/aws/networking.yaml';
import security   from '../content/aws/security.yaml';
import rivals     from '../content/aws/rivals.yaml';
import plugins    from '../content/aws/plugins.yaml';
import cli        from '../content/aws/cli.yaml';

export const FW_AWS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: compute,
    hooki:      storage,
    routing:    networking,
    state:      security,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
