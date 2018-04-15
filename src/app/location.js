/* eslint-disable */
/* TODO: Refactor this
import { setPath } from './store/action-creators';

const getPath = (state, path) => {
  let subPath = '';

  if(state) {
    const { activeView } = state;
    if(activeView)
      subPath = '/' + getPath(state.children[activeView], state.activeView);
  }

  return path + subPath;
};

const bindStoreToLocation = (store, win) => {
  const { history, location } = win;

  store.subscribe(() => {
    const state = store.getState();
    const path = getPath(state.viewTree, '');

    // Update if different url
    if(path !== location.pathname)
      history.pushState(null, null, path);
  });

  win.onpopstate = () => {
    const { pathname: path } = location;
    store.dispatch(setPath(path));
  };
};

export default bindStoreToLocation;
*/
