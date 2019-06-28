import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

import Console from './console';

const App = () => (
  <Provider store={store}>
    <Console/>
  </Provider>
);

export default App;
