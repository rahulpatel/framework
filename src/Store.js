'use strict';

class Store {
  constructor(name, initialState) {
    this._name = name;
    this._previousStates = [ initialState ];
    this._state = initialState;
    this._processors = { };
    this._subscribers = [ ];

    if (__DEBUG__) {
      console.log(`[STORE][${name}] Created`);
    }
  }

  get() {
    return this._state;
  }

  actions() {
    return Object.keys(this._processors).reduce((actions, action) => {
      actions[action] = action;
      return actions;
    }, { });
  }

  processor(action, processor) {
    if (__DEBUG__) {
      console.log(`[STORE][${this._name}] Added processor for ${action} action`);
    }

    this._processors[action] = processor;
  }

  publish(action = null, data = null) {
    if (__DEBUG__) {
      console.log(`[STORE][${this._name}] Published ${action} action`);
    }

    if (this._processors[action]) {
      this._state = this._processors[action](this._state, data);
    }
    this._previousStates.push(this._state);

    this._subscribers.forEach((subscriber) => subscriber(this._state, action));
  }

  subscribe(callback) {
    if (__DEBUG__) {
      console.log(`[STORE][${this._name}] Added subscriber`);
    }

    this._subscribers.push(callback);
  }
};
export default Store;
