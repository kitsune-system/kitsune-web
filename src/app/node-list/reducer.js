import _ from 'lodash';

import { buildReducer } from '../redux-utils';

// TODOS: Anti-pattern, fix this
let listCounter = 0;

const clampSelectedNode = (selectedNode, nodes) => _.clamp(selectedNode, 0, nodes.length - 1);

const appHandlers = {
  ADD_NODE: (state, action) => {
    const nodes = [{ key: ++listCounter, node: action.node }, ...state.nodes];
    return { ...state, nodes, selectedNode: 0 };
  },
  CLEAR_NODE_LIST: state => {
    return { ...state, nodes: [] };
  },
  REMOVE_NODE: state => {
    let { nodes, selectedNode } = state;

    nodes = [...nodes.slice(0, selectedNode), ...nodes.slice(selectedNode + 1)];
    selectedNode = clampSelectedNode(selectedNode, nodes);

    return { ...state, nodes, selectedNode };
  },
  OFFSET_SELECTED_NODE: (state, action) => {
    const { offset } = action;
    const selectedNode = clampSelectedNode(state.selectedNode += offset, state.nodes);

    return { ...state, selectedNode };
  }
};

const reducer = buildReducer(appHandlers, { nodes: [], selectedNode: 0 });

export default reducer;
