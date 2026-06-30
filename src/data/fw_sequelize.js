import meta         from '../content/sequelize/meta.yaml';
import podstawy     from '../content/sequelize/podstawy.yaml';
import models       from '../content/sequelize/models.yaml';
import associations from '../content/sequelize/associations.yaml';
import migrations   from '../content/sequelize/migrations.yaml';
import queries      from '../content/sequelize/queries.yaml';
import rivals       from '../content/sequelize/rivals.yaml';
import plugins      from '../content/sequelize/plugins.yaml';
import cli          from '../content/sequelize/cli.yaml';

export const FW_SEQUELIZE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty:  models,
    hooki:       associations,
    routing:     migrations,
    state:       queries,
    rywale:      rivals,
    pluginy:     plugins,
    komendy:     cli,
  }
};
