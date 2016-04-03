'use strict';

import Router from 'routerjs';

const router = {

  _setupRouter() {
    this._router = new Router();
  },

  route(config) {
    if (__DEBUG__) {
      console.log(`[ROUTER][#${config.path}] Added`);
    }

    this._router.addRoute(`#${config.path}`, (req, next) => {

      if (__DEBUG__) {
        console.log(`[ROUTER][#${config.path}] Matched`);
      }

      this._viewsHandler(config.views || config.view, req);

      if (req.hasNext) next();
    });
  }

};

export default router;
