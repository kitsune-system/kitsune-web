import { buildReducer } from '../redux-utils';

const entryHandlers = {
  SET_ENTRY: (state, action) => ({ ...state, value: action.value }),
  SET_MODE: (state, action) => ({ mode: action.mode, value: action.text || '' })
};

const reducer = buildReducer(entryHandlers, { mode: null });

export default reducer;
