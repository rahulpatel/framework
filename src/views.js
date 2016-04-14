'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default {

  _viewRenderers: [],

  _viewsHandler(config, context) {
    if (!(config instanceof Array)) {
      config = [ config ];
    }

    config.forEach((view) => {
      this._viewRenderers.push(() => {
        const props = view.props ? view.props(context) : { };
        this.renderView(view.component, props, view.container);
      });
    });

    this._viewRenderers.forEach((view) => view());
  },

  renderView(Component, props, container) {

    if (__DEBUG__) {
      console.log('[VIEW] Rendering');
    }

    ReactDOM.render(<Component {...props} />, container);
  }

};
