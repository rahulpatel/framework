'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import page from 'page';

const views = {

  _viewsHandler(config, context) {
    if (!(config instanceof Array)) {
      config = [ config ];
    }

    config.forEach((view) => {
      const props = view.props ? view.props(context) : { };
      this.renderView(view.component, props, view.container);
    });
  },

  renderView(Component, props, container) {

    if (__DEBUG__) {
      console.log('[VIEW] Rendering');
    }

    this._renderedView = ReactDOM.render(<Component {...props} />, container);
  }

};

export default views;
