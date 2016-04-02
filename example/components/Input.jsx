'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import framework from '../../src';

const ENTER_KEY = 13;

class Input extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._store = framework.store('todos');
    this._actions = this._store.actions();
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.newTodo);
    node.focus();
  }

  handleToggle(event) {
    this._store.publish(this._actions.TOGGLE_ALL_COMPLETE, {
      completed: event.target.checked
    });
  }

  handleNewTodo(event) {
    let title = event.target.value.trim();
    if (title === '') return;

    if (event.which === ENTER_KEY) {
      this._store.publish(this._actions.ADD, { title });
      event.target.value = '';
    }
  }

  render() {
    const todos = this._store.get();

    let allCompleted = false;
    if (todos.length) allCompleted = todos.every((todo) => todo.completed);

    return (
      <div>
        {todos.length ? (<input ref="markAllCompleted" type="checkbox" checked={allCompleted} onChange={this.handleToggle.bind(this)} />) : ''}

        <input ref="newTodo" type="text" onKeyDown={this.handleNewTodo.bind(this)} />
      </div>
    );
  }

}
export default Input;
