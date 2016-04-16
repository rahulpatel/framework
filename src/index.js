'use strict';

import router from './router';
import stores from './stores';
import views from './views';

const framework = Object.assign({

  setup({ PersistenceClass }) {
    if (__DEBUG__) {
      console.log('[FRAMEWORK] Setting up');
    }

    this._persistence = PersistenceClass ? new PersistenceClass() : null;
  },

  start() {
    if (__DEBUG__) {
      console.log('[FRAMEWORK] Started');
    }

    this._router.run();
  }

}, router, views, stores);

framework._setupRouter();

module.exports = framework;
