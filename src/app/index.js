import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Console from './console';
import store from './store';

const App = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/:viewId" component={Console}/>
        <Redirect to="/1234/abcd"/>
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;
