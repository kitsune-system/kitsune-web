import {
  deepHashEdge as E, STRING, RANDOM, WRITE
} from '@kitsune-system/common';

const Action = fn => {
  return {
    fn: ({ store }) => (...args) => {
      const action = fn(...args);
      store.dispatch(action);
    },
    inject: { store: 'STORE' },
  };
};

export const coreConfig = {
  ACTION_ENTRY: Action(key => ({ type: 'ENTRY', key })),
  ACTION_CLEAR_ENTRY: Action(() => ({ type: 'CLEAR_ENTRY' })),
  ACTION_PUSH_ENTRY: {
    fn: ({ store, writeString }) => () => {
      const { entry } = store.getState();
      writeString(entry, id => console.log('WRITE STRING ID:', id));

      store.dispatch({ type: 'PUSH_ENTRY' });
    },
    bind: { writeString: E(WRITE, STRING) },
    inject: { store: 'STORE' },
  },

  ACTION_UPDATE: Action(data => ({ type: 'UPDATE', data })),
  ACTION_UPDATE_EDGE: Action(field => ({ type: 'UPDATE_EDGE', field })),

  ACTION_RANDOM: {
    fn: ({ random, update }) => () => {
      random(null, id => update({ selected: id }));
    },
    bind: { random: RANDOM, update: 'ACTION_UPDATE' },
  },
};
