import meta      from '../content/firebase/meta.yaml';
import podstawy  from '../content/firebase/podstawy.yaml';
import firestore from '../content/firebase/firestore.yaml';
import auth      from '../content/firebase/auth.yaml';
import storage   from '../content/firebase/storage.yaml';
import functions from '../content/firebase/functions.yaml';
import rivals    from '../content/firebase/rivals.yaml';
import plugins   from '../content/firebase/plugins.yaml';
import cli       from '../content/firebase/cli.yaml';

export const FW_FIREBASE_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: firestore,
    hooki:      auth,
    routing:    storage,
    state:      functions,
    rywale:     rivals,
    pluginy:    plugins,
    komendy:    cli,
  }
};
