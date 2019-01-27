import { createStore } from 'redux';

const prodCreateStore = reducer => createStore(reducer);
export default prodCreateStore;
