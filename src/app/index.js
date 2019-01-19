import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import Console from './console';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Console/>
  </Provider>
);

export default hot(App);
