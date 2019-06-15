import { bindActionCreators } from 'redux';

import * as actionCreators from './action-creators';
import kitsuneService from '../kitsune-service';
import store from './index';

const basicActions = bindActionCreators(actionCreators, store.dispatch);
const { addNode } = basicActions;

const newNode = () => {
  kitsuneService.random().then(result =>
    addNode({ id: result })
  );
};

const writeString = (string, hash) => {
  if(hash) {
    addNode({ id: hash, string });
    return Promise.resolve();
  }

  return kitsuneService.writeString(string).then(hash => {
    console.log(`Hash for "${string}": ${hash}`);
    addNode({ id: hash, string });
  });
};

const actions = {
  ...basicActions,

  newNode,
  writeString
};
export default actions;
