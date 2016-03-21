'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'querystring';
import page from 'page';

const framework = {

  setup() {
    this._setupRouter();

    if (__DEBUG__) {
      console.log('Framework setup');
    }
  },

  _setupRouter() {
    page('*', (context, next) => {
      context.query = qs.parse(context.querystring);

      if (__DEBUG__) {
        console.log('Ran pre-route ' + context.path);
      }

      next();
    });
  },

  start() {
    page.base('/#');
    page.start();

    if (__DEBUG__) {
      console.log('Framework started');
    }
  },


  route(config) {
    if (__DEBUG__) {
      console.log('Route ' + config.path + ' added');
    }

    page(config.path, (context, next) => {

      this._viewsHandler(config.views || config.view, context);

      if (__DEBUG__) {
        console.log('Ran route ' + context.path);
      }

      next();
    });
  },

  _viewsHandler(config, context) {
    if (!(config instanceof Array)) {
      config = [ config ];
    }

    config.forEach((view) => {
      const props = view.props ? view.props(context) : { };
      this.renderView(view.component, props, view.container);
    });
  },

  renderView(Component, props, container) {

    if (__DEBUG__) {
      console.log('Rendering view');
    }

    ReactDOM.render(<Component {...props} />, container);
  },

};
export default framework;
