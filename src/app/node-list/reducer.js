import { buildReducer } from '../redux-utils';

// TODOS: Anti-pattern, fix this
let listCounter = 0;

const appHandlers = {
  ADD_NODE: (state, action) => {
    return [...state, { key: ++listCounter, node: action.node }];
  }
};

const reducer = buildReducer(appHandlers, []);

export default reducer;
