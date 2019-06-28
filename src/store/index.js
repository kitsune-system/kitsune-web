/* eslint-disable */
import createStore from 'env/create-store';

import { Action, Reducer } from './redux-utils';

const reducer = Reducer({
  TEST: (state, action) => {
    return { ...state, value: action.value };
  }
}, { value: "Nothing yet..." });

export const store = createStore(reducer);

console.log('INIT', store.getState());
store.subscribe(() => {
  console.log('SUB', store.getState());
});

const test = Action('TEST');
setTimeout(() => {
  store.dispatch(test({ value: 'Hello World' }));
}, 3000);

export default store;
