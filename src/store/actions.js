export const buildActions = build => {
  const store = build('store');

  const socket = build('socket');
  const webClient = build('webClient');

  const entry = key => store.dispatch({ type: 'ENTRY', key });
  const pushEntry = () => store.dispatch({ type: 'PUSH_ENTRY' });
  const update = data => store.dispatch({ type: 'UPDATE', data });

  const random = () => webClient.random()
    .then(node => update({ random: node }));

  const watch = id => {
    socket('WATCH', id);
    return () => socket('UNWATCH', id);
  };

  return { entry, pushEntry, random, update, watch };
};
