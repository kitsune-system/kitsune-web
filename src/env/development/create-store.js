import { createStore } from 'redux';

const devCreateStore = reducer => {
  const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  return createStore(reducer, enhancer);
};
export default devCreateStore;
