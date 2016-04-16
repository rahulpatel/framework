'use strict';

import Store from './Store';

export default {

  _stores: { },

  store(name, initialState = { }) {
    if (this._stores[name]) {
      return this._stores[name];
    }

    if (this._persistence) {
      initialState = this._persistence.get(name);
    }

    const store = new Store(name, initialState);

    store.subscribe((state) => {
      this._viewRenderers.forEach((view) => view());
      if (this._persistence) {
        if (this._persistenceTimeout) {
          clearTimeout(this._persistenceTimeout);
        }

        this._persistenceTimeout = setTimeout(() => {
          this._persistence.set(name, state);
        }, 100);
      }
    });

    this._stores[name] = store;
    return store;
  },

  publish(name, action, data = { }) {
    if (!this._stores[name]) {
      return null;
    }

    this._stores[name].publish(action, data);
  },

  subscribe(name, callback) {
    if (!this._stores[name]) {
      return null;
    }

    this._stores[name].subscribe(callback);
  }

};
