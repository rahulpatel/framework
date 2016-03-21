'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'querystring';
import page from 'page';

const framework = {

  _stores: { },

  setup() {
    this._setupRouter();

    if (__DEBUG__) {
      console.log('[FRAMEWORK] Setting up');
    }
  },

  _setupRouter() {
    page('*', (context, next) => {
      context.query = qs.parse(context.querystring);
      next();
    });
  },

  start() {
    page.base('/#');
    page.start();

    if (__DEBUG__) {
      console.log('[FRAMEWORK] Started');
    }
  },


  route(config) {
    if (__DEBUG__) {
      console.log(`[ROUTE][${config.path}] Added`);
    }

    page(config.path, (context, next) => {

      if (__DEBUG__) {
        console.log(`[ROUTE][${config.path}] Matched`);
      }

      this._viewsHandler(config.views || config.view, context);
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
      console.log('[VIEW] Rendering');
    }

    ReactDOM.render(<Component {...props} />, container);
  },


  store(name, data) {
    if (this._stores[name]) {
      return this._stores[name];
    }

    const store = {
      _data: data,
      _subscribers: [ ]
    };

    store.get = () => {
      return store._data;
    };
    store.set = (data) => {
      store._data = Object.assign(store._data, data);
    };
    store.publish = (data) => {
      store.set(data);

      if (__DEBUG__) {
        console.log(`[STORE][${name}] Published`);
      }

      store._subscribers.forEach((subscriber) => {
        subscriber(data);
      });
    };
    store.subscribe = (callback) => {

      if (__DEBUG__) {
        console.log(`[STORE][${name}] Added subscriber`);
      }

      store._subscribers.push(callback);
    };

    if (__DEBUG__) {
      console.log(`[STORE][${name}] Created`);
    }

    this._stores[name] = store;
    return store;
  },

  publish(name, data) {
    if (!this._stores[name]) {
      return null;
    }

    this._stores[name].publish(data);
  },

  subscribe(name, callback) {
    if (!this._stores[name]) {
      return null;
    }

    this._stores[name].subscribe(callback);
  }

};
export default framework;
