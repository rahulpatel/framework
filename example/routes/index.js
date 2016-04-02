'use strict';

const appContainer = document.createElement('div');
appContainer.classList.add('app-container');
document.body.appendChild(appContainer);

import framework from '../../src';
import App from '../components/App';

framework.route({
  path: '/',

  view: {
    container: appContainer,
    props: (context) => {
      return {
        filter: 'SHOW_ALL'
      };
    },
    component: App
  }
});

framework.route({
  path: '/active',

  view: {
    container: appContainer,
    props: (context) => {
      return {
        filter: 'SHOW_ACTIVE'
      };
    },
    component: App
  }
});

framework.route({
  path: '/completed',

  view: {
    container: appContainer,
    props: (context) => {
      return {
        filter: 'SHOW_COMPLETED'
      };
    },
    component: App
  }
});
