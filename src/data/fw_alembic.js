import meta        from '../content/alembic/meta.yaml';
import podstawy    from '../content/alembic/podstawy.yaml';
import migracje    from '../content/alembic/migracje.yaml';
import operacje    from '../content/alembic/operacje.yaml';
import branching   from '../content/alembic/branching.yaml';
import autogenerate from '../content/alembic/autogenerate.yaml';
import rivals      from '../content/alembic/rivals.yaml';
import srodowiska  from '../content/alembic/srodowiska.yaml';
import komendy     from '../content/alembic/komendy.yaml';

export const FW_ALEMBIC_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: migracje,
    hooki:      operacje,
    routing:    branching,
    state:      autogenerate,
    rywale:     rivals,
    pluginy:    srodowiska,
    komendy,
  }
};
