import { Keyboard, Split, on } from '@gamedevfox/katana';
import { KitsuneClient } from '@kitsune-system/common';
import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import createStore from 'env/create-store';
import baseConfig from 'env/config';

import { buildActions } from '../store/actions';
import reducer from '../store/reducer';

import { buildConfig as appBuildConfig } from './app';

const buildConfig = {
  ...appBuildConfig,

  config: () => {
    const config = { ...baseConfig };

    const webProto = config.secure ? 'https://' : 'http://';
    const wsProto = config.secure ? 'wss://' : 'ws://';

    config.webUrl = webProto + config.kitsuneHost;
    config.webSocketUrl = wsProto + config.kitsuneHost;

    return config;
  },

  actions: buildActions,

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

  remoteSystem: build => KitsuneClient(build('axios')),
  webClient: build => build('remoteSystem'),

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

  keyboard: () => Keyboard(),

  runFn: build => () => {
    const [
      App, { entry, pushEntry }, config, keyboard, webClient
    ] = [
      'App', 'actions', 'config', 'keyboard', 'webClient'
    ].map(name => build(name));

    build('socket');

    // Toastr config
    toastr.options = {
      hideDuration: 300,
      progressBar: true
    };

    // Initial logging
    console.log('Hello Kitsune');
    console.log('Config:', config);

    // Service test
    webClient.random().then(random => {
      const msg = `Random: ${random}`;
      console.log(msg);
      toastr.info(msg);
    });

    keyboard.output.down(key => {
      if(/Enter|Space/.test(key))
        pushEntry();

      if(/Backspace|Key./.test(key))
        entry(key);
    });

    const Focus = (target = global) => {
      const [input, output] = Split();

      on(target, 'focus', () => input(true));
      on(target, 'blur', () => input(false));

      return output;
    };

    const focus = Focus();
    focus(() => keyboard.clear());

    render(<App/>, document.getElementById('root'));
  }
};

export default buildConfig;
