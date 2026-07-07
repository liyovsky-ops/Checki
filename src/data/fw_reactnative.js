import meta       from '../content/reactnative/meta.yaml';
import podstawy   from '../content/reactnative/podstawy.yaml';
import komponenty from '../content/reactnative/komponenty.yaml';
import navigation from '../content/reactnative/navigation.yaml';
import style      from '../content/reactnative/style.yaml';
import native     from '../content/reactnative/native.yaml';
import rivals     from '../content/reactnative/rivals.yaml';
import plugins    from '../content/reactnative/plugins.yaml';
import cli        from '../content/reactnative/cli.yaml';

export const FW_REACTNATIVE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty,
    hooki:   navigation,
    routing: style,
    state:   native,
    rywale:  rivals,
    pluginy: plugins,
    komendy: cli,
  }
};
