import { Reducer } from './redux-utils';

const initialState = {
  entry: '',
  entryList: [],
  nodes: {},
  random: '',
};

const reducer = Reducer({
  ENTRY: (state, { key }) => {
    let { entry } = state;

    if(key === 'Backspace')
      entry = entry.substring(0, entry.length - 1);
    else if(/Key./.test(key))
      entry += key.substring(3);

    return { ...state, entry };
  },
  PUSH_ENTRY: state => {
    const { entry, entryList } = state;
    return { ...state, entry: '', entryList: [...entryList, entry] };
  },
  UPDATE: (state, { data }) => {
    const newState = { ...state };
    Object.entries(data).forEach(([key, value]) => {
      newState[key] = value;
    });
    return newState;
  },
}, initialState);

export default reducer;
