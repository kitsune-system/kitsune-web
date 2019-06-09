// Node List
export function addNode(node) {
  return { type: 'ADD_NODE', node };
}

export function clearNodeList() {
  return { type: 'CLEAR_NODE_LIST' };
}

export function removeNode() {
  return { type: 'REMOVE_NODE' };
}

export function selectPrevNode() {
  return { type: 'OFFSET_SELECTED_NODE', offset: 1 };
}

export function selectNextNode() {
  return { type: 'OFFSET_SELECTED_NODE', offset: -1 };
}

// ViewTree
export function setActiveView(activeView) {
  return { type: 'SET_ACTIVE_VIEW', activeView };
}

// VSplit
export function switchFocus() {
  return { type: 'SWITCH_FOCUS' };
}
