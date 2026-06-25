import meta         from '../content/nestjs/meta.yaml';
import podstawy     from '../content/nestjs/podstawy.yaml';
import kontrolery   from '../content/nestjs/kontrolery.yaml';
import providers    from '../content/nestjs/providers.yaml';
import guards       from '../content/nestjs/guards.yaml';
import microservices from '../content/nestjs/microservices.yaml';
import rivals       from '../content/nestjs/rivals.yaml';
import plugins      from '../content/nestjs/plugins.yaml';
import cli          from '../content/nestjs/cli.yaml';

export const FW_NESTJS_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: kontrolery,
    hooki:      providers,
    routing:    guards,
    state:      microservices,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
