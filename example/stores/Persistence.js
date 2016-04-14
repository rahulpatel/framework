'use strict';

export default class Persistence {

  constructor() {
    this._id = 'todos';
    this._state = [ ];
  }

  get() {
    const state = window.localStorage.getItem(this._id);
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

  set(state) {
    console.log('[PERSISTENCE] Updated');
    this._state = state;
    this._sync();
  }

  _sync() {
    window.localStorage.setItem(this._id, JSON.stringify(this._state));
  }
};
