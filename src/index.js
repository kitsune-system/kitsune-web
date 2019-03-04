/* eslint-disable */
import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import App from './app';
import keySplit from './app/input/key-split';
import actions from './app/store/actions';
import config from 'env/config';

import kitsuneService from './app/kitsune-service';

// Service test
// kitsuneService.random().then(random => {
//   console.log('Random:', random);
// });

const { setActiveView } = actions;

// Toastr config
toastr.options = {
  hideDuration: 300,
  progressBar: true
};

// Initial logging
console.log('Hello Kitsune');
console.log('Config', config);

// Register KeyHandler
window.addEventListener('keydown', keySplit);

// Load initial view based on location or default
setActiveView('vsplit');

// Render App
render(<App/>, document.getElementById('root'));
