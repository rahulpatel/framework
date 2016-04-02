'use strict';

const stores = {

  _stores: { },

  store(name, initialState) {
    if (this._stores[name]) {
      return this._stores[name];
    }

    const store = {
      _previousStates: [ initialState ],
      _state: initialState,
      _processors: { },
      _subscribers: [ ]
    };

    store.get = () => {
      return store._state;
    };
    store.actions = () => {
      return Object.keys(store._processors).reduce((actions, currentAction) => {
        actions[currentAction] = currentAction;
        return actions;
      }, { });
    };
    store.processor = (action, processor) => {

      if (__DEBUG__) {
        console.log(`[STORE][${name}] Added processor for ${action} action`);
      }

      store._processors[action] = processor;
    };
    store.publish = (action = null, data = null) => {

      if (action === null) {
        throw new Error(`No action provided for store ${name}`);
      }

      if (__DEBUG__) {
        console.log(`[STORE][${name}] Published ${action} action`);
      }

      store._state = store._processors[action](store._state, data);
      store._previousStates.push(store._state);

      store._subscribers.forEach((subscriber) => {
        subscriber(store._state, action);
      });

      this._renderedView.forceUpdate();
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

export default stores;
