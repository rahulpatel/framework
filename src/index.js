'use strict';

import page from 'page';

import router from './router';
import stores from './stores';
import views from './views';

const framework = Object.assign({

  // setup() {
  //   if (__DEBUG__) {
  //     console.log('[FRAMEWORK] Setting up');
  //   }
  // },

  start() {
    page();

    if (__DEBUG__) {
      console.log('[FRAMEWORK] Started');
    }
  }

}, router, views, stores);

// framework.setup();

export default framework;
