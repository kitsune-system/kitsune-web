import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import App from './app';
import keySplit from './app/input/key-split';
import actions from './app/store/actions';
import config from './config';

const { setActiveView, writeString } = actions;

// Toastr config
toastr.options = {
  hideDuration: 300,
  progressBar: true
};

// Initial logging
console.log('Hello Kitsune');
console.log('Config', config);

// Write defaults strings to list
writeString('Welcome to Kitsune').then(() =>
  writeString('Start typing to begin command mode')
);

// Register KeyHandler
window.addEventListener('keydown', keySplit);

// Load initial view based on location or default
setActiveView('vsplit');

// Render App
render(<App/>, document.getElementById('root'));
