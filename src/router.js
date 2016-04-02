'use strict';

import qs from 'querystring';
import page from 'page';

page.base('/#');
page('*', (context, next) => {
  context.query = qs.parse(context.querystring);
  return next();
});

const router = {

  route(config) {
    if (__DEBUG__) {
      console.log(`[ROUTER][${config.path}] Added`);
    }

    page(config.path, (context, next) => {

      if (__DEBUG__) {
        console.log(`[ROUTER][${config.path}] Matched`);
      }

      this._viewsHandler(config.views || config.view, context);
      return next();
    });
  }

};

export default router;
