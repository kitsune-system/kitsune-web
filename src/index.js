import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import { build as buildClient } from './common/client';
import config from 'env/config';
import App from './kitsune/app';

// Toastr config
toastr.options = {
  hideDuration: 300,
  progressBar: true
};

const client = buildClient(config);

// Initial logging
console.log('Hello Kitsune');
console.log('Config:', config);

// Service test
client.random().then(random => {
  console.log('Random:', random);
  toastr.info(`Random: ${random}`);
});

// Register KeyHandler
// window.addEventListener('keydown', keySplit);

// Render App
render(<App/>, document.getElementById('root'));
