import { combineReducers, createStore } from 'redux';

import entryReducer from './entry/reducer';
import nodeListReducer from './node-list/reducer';

const reducer = combineReducers({
  entry: entryReducer,
  nodeList: nodeListReducer
});

const store = createStore(reducer);
export default store;
