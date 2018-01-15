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

// Entry
export function setEntry(value) {
  return { type: 'SET_ENTRY', value };
}
export function setMode(mode, text) {
  const action = { type: 'SET_MODE', mode };

  if(text)
    action.text = text;

  return action;
}
