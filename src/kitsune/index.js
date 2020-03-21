import { Focus, Keyboard, noOp } from '@gamedevfox/katana';
import {
  HttpSystem, WebSocketSystem, value, CORE, CORE_SUBSYSTEMS, RANDOM,
} from '@kitsune-system/common';
import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import env from 'env/config';

import { reducer } from '../store/reducer';
import { BrowserSocket } from './browser-socket';

import { coreConfig as actionConfig } from '../store/actions';
import { coreConfig as appConfig } from './app';
import { coreConfig as inputConfig } from './input';

export const RUN = 'F1Qh+f2XbxAheht97A/BINk3BomM3pz6E+/TtaAUBdo=';

export const coreConfig = {
  ...actionConfig,
  ...appConfig,
  ...inputConfig,

  [RUN]: {
    fn: ({ App, configureKeyboard, initialRemoteCalls }) => () => {
      render(<App/>, document.getElementById('root'));

      console.log('[[ INIT Kitsune Web ]]');
      console.log('Config:', env);

      configureKeyboard();
      initialRemoteCalls();
    },
    bind: {
      configureKeyboard: 'CONFIGURE_KEYBOARD',
      initialRemoteCalls: 'INITIAL_REMOTE_CALLS',
    },
    inject: { App: 'APP' },
  },
  [CORE_SUBSYSTEMS]: {
    fn: ({ remoteSystem }) => (_, output) => output([remoteSystem]),
    inject: { remoteSystem: 'SOCKET_SYSTEM' },
  },

  HTTP_SYSTEM: {
    fn: () => (_, output) => {
      const webUrl = (env.secure ? 'https://' : 'http://') + env.kitsuneHost;
      console.log('WEB URL:', webUrl);
      output(HttpSystem(webUrl));
    },
  },

  FOCUS: value(Focus()),
  KEYBOARD: value(Keyboard()),

  INITIAL_REMOTE_CALLS: {
    fn: ({ random, update }) => () => {
      random(null, id => {
        update({ selected: id });
        toastr.info(`Random: ${id}`);
      });

      // core(BUILT_IN_NODES, builtInNodes => builtInNodes(null, nodes => update({ nodes })));
      // core(E(LIST_V, STRING), listStrings => listStrings(null, strings => update({ strings })));
    },
    bind: { random: RANDOM, update: 'ACTION_UPDATE' },
  },

  SOCKET: {
    fn: () => (_, output = noOp) => {
      const webSocketUrl = (env.secure ? 'wss://' : 'ws://') + env.kitsuneHost;

      console.log('Connecting to WebSocket:', webSocketUrl);
      const socket = BrowserSocket(webSocketUrl);

      output(socket);
    },
  },

  SOCKET_SYSTEM: {
    fn: ({ core, socket }) => (_, output = noOp) => {
      output(WebSocketSystem({ core, socket }));
    },
    bind: { core: CORE },
    inject: { socket: 'SOCKET' },
  },

  SET_MY_ID: {
    fn: () => (id, output = noOp) => {
      console.log('I\'m setting my id:', id);
      output(Math.floor(Math.random() * 100));
    },
  },
};
