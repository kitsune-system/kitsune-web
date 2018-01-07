/* eslint-disable */
export function addNode(node) { return { type: 'ADD_NODE', node }; }
export function setEntry(value) { return { type: 'SET_ENTRY', value }; }
export function setMode(mode, text) {
  const action = { type: 'SET_MODE', mode };

  if(text)
    action.text = text;

  return action;
}
