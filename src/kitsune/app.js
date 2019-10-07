import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import Console from './console';
import { SystemContext } from './context';

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

export const buildApp = build => () => (
  <SystemContext.Provider value="ALRIGHT!!">
    <Provider store={build('store')}>
      <GlobalStyle/>
      <Console/>
    </Provider>
  </SystemContext.Provider>
);
