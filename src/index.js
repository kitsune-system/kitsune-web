import React from 'react';
import { render } from 'react-dom';

import App from './app';

import './index.scss';

render(<App/>, document.getElementById('root'));

if(module.hot) {
  module.hot.accept('./app', () => {
    const App = require('./app').default;
    render(<App/>, document.getElementById('root'));
  });
}
