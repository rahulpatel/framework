'use strict';

import Router from 'routerjs';

export default {

  _setupRouter() {
    this._router = new Router();
  },

  route(config) {
    if (__DEBUG__) {
      console.log(`[ROUTER][#${config.path}] Added`);
    }

    this._router.addRoute(`#${config.path}`, (req, next) => {
      console.log(req);
      if (__DEBUG__) {
        console.log(`[ROUTER][#${config.path}] Matched`);
      }

      if (config.handler) {
        config.handler(req);
      }

      this._viewsHandler(config.views || config.view, req);

      if (req.hasNext) next();
    });
  }

};
