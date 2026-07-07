import meta       from '../content/shadcnui/meta.yaml';
import podstawy   from '../content/shadcnui/podstawy.yaml';
import komponenty from '../content/shadcnui/komponenty.yaml';
import forms      from '../content/shadcnui/forms.yaml';
import tables     from '../content/shadcnui/tables.yaml';
import theming    from '../content/shadcnui/theming.yaml';
import rivals     from '../content/shadcnui/rivals.yaml';
import plugins    from '../content/shadcnui/plugins.yaml';
import cli        from '../content/shadcnui/cli.yaml';

export const FW_SHADCNUI_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki:   forms,
    routing: tables,
    state:   theming,
    rywale:  rivals,
    pluginy: plugins,
    komendy: cli,
  }
};
