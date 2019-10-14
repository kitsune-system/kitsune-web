import { CORE } from '@kitsune-system/common';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import Console from './console';
import { Provider as SystemProvider } from './context';

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

export const coreConfig = {
  APP: {
    fn: ({ store, system }) => (_, output) => output(() => (
      <SystemProvider system={system}>
        <StoreProvider store={store}>
          <GlobalStyle/>
          <Console/>
        </StoreProvider>
      </SystemProvider>
    )),
    bind: { system: CORE },
    inject: { store: 'STORE' },
  },
};
