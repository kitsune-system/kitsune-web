import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import buildActions from './actions';
import reducer from './reducer';

import { COMMAND_MODE, STRING_MODE, TEXT_MODE } from './app/entry-box/entry-box';
import keyCodes from './app/key-codes';

import './index.scss';

console.log('Hello Kitsune');

const initialState = {
  mode: null,
  entry: '',
  nodeList: []
};
const store = createStore(reducer, initialState);

const actions = buildActions(store);
const { setMode } = actions;

if(window) {
  window.addEventListener('keydown', e => {
    const { mode } = store.getState();
    if(mode === null && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if(e.keyCode === 27) { // ESCAPE
        e.preventDefault();
        store.dispatch(setMode(null));
      } else if(e.keyCode === 32 && e.target.tagName === 'BODY') { // SPACE
        e.preventDefault();
        const mode = e.shiftKey ? TEXT_MODE : STRING_MODE;
        store.dispatch(setMode(mode));
      } else if(keyCodes.includes(e.code) && !e.shiftKey && e.target.tagName === 'BODY') {
        store.dispatch(setMode(COMMAND_MODE));
      }
    }
  });
}

function rootComponent() {
  const buildAppRedux = require('./app-redux').default;
  const AppRedux = buildAppRedux(actions);
  return (
    <Provider store={store}>
      <AppRedux/>
    </Provider>
  );
}

render(rootComponent(), document.getElementById('root'));

if(module.hot) {
  module.hot.accept('./app/app', () => {
    render(rootComponent(), document.getElementById('root'));
  });
}
