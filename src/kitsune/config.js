import { KitsuneClient } from '@kitsune-system/common';
import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import toastr from 'toastr';

import createStore from 'env/create-store';
import baseConfig from 'env/config';

import reducer from '../store/reducer';

import Console from './console';

const GlobalStyle = createGlobalStyle`
  body, #root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 4px;

    font-family: monospace;
  }

  // toastr
  #toast-container > div {
    opacity:1;
  }
`;

const buildConfig = {
  config: () => {
    const config = { ...baseConfig };

    const webProto = config.secure ? 'https://' : 'http://';
    const wsProto = config.secure ? 'wss://' : 'ws://';

    config.webUrl = webProto + config.kitsuneHost;
    config.webSocketUrl = wsProto + config.kitsuneHost;

    return config;
  },

  App: build => () => (
    <Provider store={build('store')}>
      <GlobalStyle/>
      <Console/>
    </Provider>
  ),

  actions: build => {
    const store = build('store');

    const socket = build('socket');
    const webClient = build('webClient');

    const actions = {};

    actions.random = () => webClient.random().then(random => {
      store.dispatch({ type: 'RANDOM', value: random });
    });
    actions.watch = id => {
      socket('WATCH', id);
      return () => socket('UNWATCH', id);
    };

    return actions;
  },

  axios: build => {
    const baseURL = build('config').webUrl;
    const result = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
    result.interceptors.response.use(res => res.data);
    return result;
  },

  store: () => createStore(reducer),

  webClient: build => KitsuneClient(build('axios')),

  socket: build => {
    const pending = [];
    let send = msg => pending.push(msg);

    const webSocket = new WebSocket(build('config').webSocketUrl);

    const socket = (action, data) => {
      const actionStr = JSON.stringify([action, data]);
      send(actionStr);
    };

    webSocket.addEventListener('open', () => {
      console.log('[Connected to WebSocket server]');
      webSocket.send('Hello');

      send = msg => webSocket.send(msg);
      pending.forEach(msg => send(msg));
    });
    webSocket.addEventListener('message', event => {
      const msg = JSON.parse(event.data);
      console.log('From Server:', msg);
    });

    return socket;
  },

  runFn: build => () => {
    // Toastr config
    toastr.options = {
      hideDuration: 300,
      progressBar: true
    };

    // Initial logging
    console.log('Hello Kitsune');
    console.log('Config:', build('config'));

    // Service test
    const client = build('webClient');
    client.random().then(random => {
      const msg = `Random: ${random}`;
      console.log(msg);
      toastr.info(msg);
    });

    // build('actions');
    build('socket');

    // Register KeyHandler
    // window.addEventListener('keydown', keySplit);

    const App = build('App');
    render(<App/>, document.getElementById('root'));
  }
};

export default buildConfig;
