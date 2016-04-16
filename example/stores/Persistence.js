'use strict';

export default class Persistence {

  constructor() {
    this._prefix = 'todos';
    this._state = [ ];
  }

  get(storeName) {
    const state = window.localStorage.getItem(`${this._prefix}-${storeName}`);
    if (state) {
      console.log('[PERSISTENCE] Found state');

      try {
        this._state = JSON.parse(state);
      } catch (e) {
        console.log('[PERSISTENCE] Failed to parse resource', e);
      }
    }
    return this._state;
  }

  set(storeName, state) {
    console.log('[PERSISTENCE] Updated');
    this._state = state;
    this._sync();
  }

  _sync() {
    window.localStorage.setItem(`${this._prefix}-${storeName}`, JSON.stringify(this._state));
  }
};
