import { buildReducer } from '../redux-utils';

const entryHandlers = {
  SET_ENTRY: (state, action) => ({ ...state, value: action.value }),
  SET_MODE: (state, action) => {
    const { mode, text } = action;

    // TODO: Simplyfy this
    if(mode === null)
      return null;

    return mode ? { mode, value: text || '' } : null;
  }
};

const reducer = buildReducer(entryHandlers, null);

export default reducer;
