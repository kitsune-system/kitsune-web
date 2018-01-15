import { render } from 'react-dom';
import toastr from 'toastr';

import config from './config';
import actions from './app/actions';
import keySwitch from './app/key-switch';

import './index.scss';

console.log('Hello Kitsune');
console.log('Config', config);

// Toastr config
toastr.options = {
  hideDuration: 300,
  progressBar: true
};

const { writeString } = actions;
writeString('Welcome to Kitsune')
  .then(() => writeString('Start typing to begin command mode'));

if(window) {
  const { handle: handler } = keySwitch;

  if(window.handler)
    window.removeEventListener('keydown', handler);

  window.addEventListener('keydown', handler);
  window.handler = handler;
}

function buildApp() {
  const App = require('./app').default;
  return App;
}

render(buildApp(), document.getElementById('root'));

if(module.hot) {
  module.hot.accept('./app', () => {
    render(buildApp(), document.getElementById('root'));
  });
}
