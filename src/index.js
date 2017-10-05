import React from 'react';
import { render } from 'react-dom';

import App from './app/app';

import './index.scss';

console.log('Hello Kitsune');

render(<App/>, document.getElementById('root'));

if(module.hot) {
  module.hot.accept('./app/app', () => {
    const App = require('./app/app').default;
    render(<App/>, document.getElementById('root'));
  });
}
