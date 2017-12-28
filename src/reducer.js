// TODOS: Anti-pattern, fix this
let listCounter = 0;

const actionHandlers = {
  '@@redux/INIT': state => state, // IGNORE redux init
  '@@INIT': state => state, // IGNORE redux devools init
  ADD_NODE: (state, action) => {
    const nodeList = [...state.nodeList, { key: ++listCounter, node: action.node }];
    return { ...state, nodeList };
  },
  SET_ENTRY: (state, action) => ({ ...state, entry: action.entry }),
  SET_MODE: (state, action) => {
    let { mode, text } = action;

    const newState = { ...state, mode };

    if(mode === null)
      text = '';

    if(text !== undefined)
      newState.entry = text;

    return newState;
  }
};

const reducer = function(oldState, action) {
  let state = oldState;

  const actionHandler = actionHandlers[action.type];
  if(actionHandler)
    state = actionHandler(oldState, action);
  else
    console.warn(`No handler found for action type: ${action.type}`, action);

  return state;
};

export default reducer;
