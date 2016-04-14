'use strict';

import framework from '../../src';

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const EDIT = 'EDIT';
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
const TOGGLE_ALL_COMPLETE = 'TOGGLE_ALL_COMPLETE';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
const CLEAR_ALL = 'CLEAR_ALL';

export const actions = {
  ADD,
  REMOVE,
  EDIT,
  TOGGLE_COMPLETE,
  TOGGLE_ALL_COMPLETE,
  CLEAR_COMPLETED,
  CLEAR_ALL
};

const store = framework.store('todos');

let nextAvailId = 0;
store.processor(ADD, (state, action) => {
  nextAvailId++;
  return [
    {
      id: nextAvailId + 1,
      title: action.title,
      completed: false
    },
    ...state
  ];
});

store.processor(REMOVE, (state, action) => {
  return state.filter((todo) => todo.id !== action.id);
});

store.processor(EDIT, (state, action) => {
  return state.map((todo) => {
    if (todo.id === action.id) return Object.assign({ }, todo, { title: action.title });
    return todo;
  });
});

store.processor(TOGGLE_COMPLETE, (state, action) => {
  return state.map((todo) => {
    if (todo.id === action.id) return Object.assign({ }, todo, { completed: action.completed });
    return todo;
  });
});

store.processor(TOGGLE_ALL_COMPLETE, (state, action) => {
  return state.map((todo) => {
    todo.completed = action.completed;
    return todo;
  });
});

store.processor(CLEAR_COMPLETED, (state, action) => {
  return state.filter((todo) => todo.completed === false);
});

store.processor(CLEAR_ALL, (state, action) => {
  return [ ];
});

export default store;
