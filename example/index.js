'use strict';

const header = document.createElement('div');
header.classList.add('header');
document.body.appendChild(header);

const appContainer = document.createElement('div');
appContainer.classList.add('app-container');
document.body.appendChild(appContainer);

const footer = document.createElement('div');
footer.classList.add('footer');
document.body.appendChild(footer);



import framework from '../src';

import Header from './components/Header';
import Footer from './components/Footer';
import Name from './components/Name';

framework.setup();

framework.route({
  path: '*',

  views: [
    {
      container: header,
      component: Header
    },
    {
      container: footer,
      component: Footer
    }
  ]
});

framework.route({
  path: '/:name',

  view: {
    container: appContainer,
    props: (context) => {
      const name = context.params.name[0].toUpperCase() + context.params.name.slice(1);

      return {
        name
      };
    },
    component: Name
  }
});

framework.start();
