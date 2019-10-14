export const Action = type => args => {
  if(typeof args !== 'object')
    args = { value: args };

  return { type, ...args };
};

export const Reducer = (handlers, initialState) => {
  return (oldState, action) => {
    if(oldState === undefined)
      return initialState;

    const { type } = action;
    const actionHandler = handlers[type];

    let state = oldState;
    if(actionHandler)
      state = actionHandler(oldState, action);

    return state;
  };
};
