import meta          from '../content/tailwind/meta.yaml';
import podstawy      from '../content/tailwind/podstawy.yaml';
import utilities     from '../content/tailwind/utilities.yaml';
import responsive    from '../content/tailwind/responsive.yaml';
import customization from '../content/tailwind/customization.yaml';
import animations    from '../content/tailwind/animations.yaml';
import rivals        from '../content/tailwind/rivals.yaml';
import ekosystem     from '../content/tailwind/ekosystem.yaml';
import cli           from '../content/tailwind/cli.yaml';

export const FW_TAILWIND_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: utilities,
    hooki:      responsive,
    routing:    customization,
    state:      animations,
    rywale:     rivals,
    pluginy:    ekosystem,
    komendy:    cli,
  }
};
