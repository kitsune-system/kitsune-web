const buildReducer = (handlers, initialState) => {
  return (oldState, action) => {
    if(oldState === undefined)
      return initialState;

    let state;

    const actionHandler = handlers[action.type];
    if(actionHandler)
      state = actionHandler(oldState, action);
    else
      state = oldState;

    return state;
  };
};

export { buildReducer };
