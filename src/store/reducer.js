import { Reducer } from './redux-utils';

const initialState = {
  random: '',
};

const reducer = Reducer({
  RANDOM: (state, action) => {
    return { ...state, random: action.value };
  },
  TEST: (state, action) => {
    return { ...state, value: action.value };
  },
}, initialState);

export default reducer;
