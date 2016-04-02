'use strict';

import React from 'react';
import framework from '../../src';

import Input from './Input';
import TodosList from './TodosList';
import Footer from './Footer';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._store = framework.store('todos');
  }

  render() {
    const todos = this._store.get().length;

    return (
      <div>
        <Input />

        {todos ? (<TodosList filterType={this.props.filter} />) : ''}

        {todos ? (<Footer />) : ''}
      </div>
    );
  }

}
export default App;
