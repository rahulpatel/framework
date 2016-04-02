'use strict';

import React from 'react';
import framework from '../../src';

class Footer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._store = framework.store('todos');
    this._actions = this._store.actions();
  }

  handleClearCompleted(event) {
    this._store.publish(this._actions.CLEAR_COMPLETED);
  }

  render() {
    const todos = this._store.get();

    const activeCount = todos.reduce((count, todo) => todo.completed ? count : count + 1, 0);
    const completedCount = todos.length - activeCount;

    return (
      <div id="footer">
        <span><strong>{activeCount}</strong> item{activeCount !== 1 ? 's' : ''} left</span>

        <ul>
          <li><a className="" href="#/">All</a></li>
          <li><a className="" href="#/active">Active</a></li>
          <li><a className="" href="#/completed">Completed</a></li>
        </ul>

        {completedCount ? (<button onClick={this.handleClearCompleted.bind(this)}>Clear Completed</button>) : ''}
      </div>
    );
  }

}
export default Footer;
