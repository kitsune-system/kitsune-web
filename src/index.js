import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import bottle from './bottle';

import './index.scss';

console.log('Hello Kitsune');

function buildRoot() {
  const { actions, keySwitch, store, Console } = bottle.container;

  actions.writeString('hello');
  actions.writeString('world');

  if(window) {
    const { handle: handler } = keySwitch;

    if(window.handler)
      window.removeEventListener('keydown', handler);

    window.addEventListener('keydown', handler);
    window.handler = handler;
  }

  const appFactory = require('./app').default;
  const App = appFactory({ actions, Console });

  return (
    <Provider store={store}>
      <App actions={actions}/>
    </Provider>
  );
}

render(buildRoot(), document.getElementById('root'));

if(module.hot) {
  module.hot.accept('./app', () => {
    render(buildRoot(), document.getElementById('root'));
  });
}
