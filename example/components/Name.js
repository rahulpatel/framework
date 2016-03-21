'use strict';

import React from 'react';
import framework from '../../src';

class Name extends React.Component {

  componentWillMount() {
    this.setState({
      count: 10
    });
    this.store = framework.store('counter');
  }

  componentDidMount() {
    this.store.subscribe((data) => {
      this.setState({
        count: data.counter
      });
    });
  }

  handleButtonClick() {
    const counter = this.store.get();
    counter.counter += 1;
    this.store.publish(counter);
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <p>The count is {this.state.count}.</p>
        <button onClick={() => this.handleButtonClick()}>Add to counter</button>
      </div>
    );
  }

}
export default Name;
