import meta     from '../content/django/meta.yaml';
import podstawy from '../content/django/podstawy.yaml';
import orm      from '../content/django/orm.yaml';
import views    from '../content/django/views.yaml';
import forms    from '../content/django/forms.yaml';
import admin    from '../content/django/admin.yaml';
import rivals   from '../content/django/rivals.yaml';
import pluginy  from '../content/django/pluginy.yaml';
import komendy  from '../content/django/komendy.yaml';

export const FW_DJANGO_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: orm,
    hooki:      views,
    routing:    forms,
    state:      admin,
    rywale:     rivals,
    pluginy,
    komendy,
  }
};
