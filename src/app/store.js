import { combineReducers, createStore } from 'redux';

import entryReducer from './entry/reducer';
import nodeListReducer from './node-list/reducer';

export default function storeFactory() {
  const reducer = combineReducers({
    entry: entryReducer,
    nodeList: nodeListReducer
  });

  return createStore(reducer);
}
