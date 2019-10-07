import { hashEdge, hashString } from '@kitsune-system/common';

import { Reducer } from './redux-utils';

const initialState = {
  entry: '',
  selected: null,
  showLabels: false,
  edge: ['', '', ''],

  nodes: {},
  entryList: [],
  strings: [],
};

const indexLookup = { head: 0, tail: 1 };

export const reducer = Reducer({
  ENTRY: (state, { key }) => {
    let { entry } = state;

    if(key === 'Backspace')
      entry = entry.substring(0, entry.length - 1);
    else if(/Key./.test(key))
      entry += key.substring(3);
    else if(key === 'Space')
      entry += '_';

    return { ...state, entry };
  },
  PUSH_ENTRY: state => {
    const { entry, entryList } = state;

    const selected = hashString(entry);
    return { ...state, entry: '', entryList: [...entryList, entry], selected };
  },
  CLEAR_ENTRY: state => ({ ...state, entry: '' }),

  UPDATE: (state, { data }) => {
    const newState = { ...state };
    Object.entries(data).forEach(([key, value]) => {
      newState[key] = value;
    });
    return newState;
  },

  UPDATE_EDGE: (state, { field }) => {
    const { edge: currentEdge, selected } = state;

    const edge = [...currentEdge];
    const index = indexLookup[field];
    edge[index] = selected;

    if(edge[0] && edge[1])
      edge[2] = hashEdge(edge[0], edge[1]);

    return { ...state, edge };
  },
}, initialState);
