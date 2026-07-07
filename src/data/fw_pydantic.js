import meta        from '../content/pydantic/meta.yaml';
import podstawy    from '../content/pydantic/podstawy.yaml';
import models      from '../content/pydantic/models.yaml';
import validators  from '../content/pydantic/validators.yaml';
import serializacja from '../content/pydantic/serializacja.yaml';
import rivals      from '../content/pydantic/rivals.yaml';
import plugins     from '../content/pydantic/plugins.yaml';
import cli         from '../content/pydantic/cli.yaml';

export const FW_PYDANTIC_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: models,
    hooki:      validators,
    routing:    serializacja,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
