import { combineReducers } from 'redux';

import createStore from 'env/create-store';

import nodeListReducer from '../node-list/reducer';
import viewTreeReducer from '../view-tree/reducer';

const reducer = combineReducers({
  nodeList: nodeListReducer,
  viewTree: viewTreeReducer
});

const store = createStore(reducer);

const getViewTree = () => {
  const state = store.getState();
  return state.viewTree;
};

export const getViewState = view => {
  const viewTree = getViewTree();

  if(view === undefined)
    view = viewTree.activeView;

  return viewTree.children[view] || {};
};

const getSubView = view => {
  const viewState = getViewState(view);

  const { activeView, children = {} } = viewState;
  return children[activeView];
};

const collectActiveView = (viewId, views, list = []) => {
  const subView = getSubView(viewId);

  if(subView) {
    const child = getViewState(subView);
    if(child)
      collectActiveView(child, views, list);
    list.push(subView);
  }

  return list;
};

export const getActiveViewList = () => {
  const { activeView, children: views } = getViewTree();
  const list = collectActiveView(activeView, views);

  list.push(activeView);
  return list;
};

export default store;
