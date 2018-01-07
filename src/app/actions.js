import { bindActionCreators } from 'redux';

import * as actionCreators from './action-creators';

export default function actionsFactory({ kitsuneService, store }) {
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const { addNode } = actions;

  const writeString = string => {
    kitsuneService.writeString(string).then(hash => {
      console.log(`Hash for "${string}": ${hash}`);
      addNode({ id: hash, string });
    });
  };

  return {
    ...actions,
    writeString
  };
}
