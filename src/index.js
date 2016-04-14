'use strict';

import router from './router';
import stores from './stores';
import views from './views';

const framework = Object.assign({

  setup({ defaultRoute = '/', PersistenceClass }) {
    if (__DEBUG__) {
      console.log('[FRAMEWORK] Setting up');
    }

    this._defaultRoute = defaultRoute;
    this._persistence = PersistenceClass ? new PersistenceClass() : null;
  },

  start() {
    if (__DEBUG__) {
      console.log('[FRAMEWORK] Started');
    }

    this._router.run(this._defaultRoute);
  }

}, router, views, stores);

framework._setupRouter();

export default framework;
