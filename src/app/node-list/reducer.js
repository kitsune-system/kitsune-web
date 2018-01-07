import { buildReducer } from '../redux-utils';

// TODOS: Anti-pattern, fix this
let listCounter = 0;

const appHandlers = {
  ADD_NODE: (state, action) => ([...state, { key: ++listCounter, node: action.node }]),
  CLEAR_NODE_LIST: () => []
};

const reducer = buildReducer(appHandlers, []);

export default reducer;
