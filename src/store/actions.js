import {
  deepHashEdge as E, STRING, RANDOM, WRITE
} from '@kitsune-system/common';

export const buildActions = build => {
  const store = build('store');

  const socket = build('socket');
  const core = build('core');

  const entry = key => store.dispatch({ type: 'ENTRY', key });
  const pushEntry = () => {
    const { entry } = store.getState();
    core(E(WRITE, STRING), writeString => writeString(entry));

    store.dispatch({ type: 'PUSH_ENTRY' });
  };

  const clearEntry = () => store.dispatch({ type: 'CLEAR_ENTRY' });

  const update = data => store.dispatch({ type: 'UPDATE', data });
  const updateEdge = field => store.dispatch({ type: 'UPDATE_EDGE', field });

  const random = () => core(RANDOM, random => random(null, id => {
    update({ selected: id });
  }));

  const watch = id => {
    socket('WATCH', id);
    return () => socket('UNWATCH', id);
  };

  return { clearEntry, entry, pushEntry, random, update, updateEdge, watch };
};
