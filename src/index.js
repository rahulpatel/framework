'use strict';

import router from './router';
import stores from './stores';
import views from './views';

const framework = Object.assign({

  setup() {
    this._setupRouter();

    if (__DEBUG__) {
      console.log('[FRAMEWORK] Setting up');
    }
  },

  start() {
    this._router.run('#/');

    if (__DEBUG__) {
      console.log('[FRAMEWORK] Started');
    }
  }

}, router, views, stores);

framework.setup();

export default framework;
