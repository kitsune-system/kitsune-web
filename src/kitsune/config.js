import { Focus, Keyboard, noOp } from '@gamedevfox/katana';
import { HttpSystem, SUPPORTS_COMMAND } from '@kitsune-system/common';

import createStore from 'env/create-store';
import baseConfig from 'env/config';

import { buildActions } from '../store/actions';
import { reducer } from '../store/reducer';

import { buildApp } from './app';
import { Socket } from './socket';

const buildConfig = {
  App: buildApp,

  actions: buildActions,
  focus: () => Focus(),
  keyboard: () => Keyboard(),
  store: () => createStore(reducer),

  core: build => {
    const remoteCore = build('remoteCore');

    const core = (systemId, systemOut = noOp) => {
      remoteCore(SUPPORTS_COMMAND, supportsCommand => {
        supportsCommand(systemId, isSupported => {
          if(!isSupported)
            throw new Error(`No local or remote system for id: ${systemId}`);

          remoteCore(systemId, systemOut);
        });
      });
    };

    return core;
  },
  remoteCore: build => HttpSystem(build('config').webUrl),

  config: () => {
    const config = { ...baseConfig };

    config.webUrl = (config.secure ? 'https://' : 'http://') + config.kitsuneHost;
    config.webSocketUrl = (config.secure ? 'wss://' : 'ws://') + config.kitsuneHost;

    return config;
  },

  socket: build => {
    const socketUrl = build('config').webSocketUrl;
    return Socket(socketUrl);
  },
};

export default buildConfig;
