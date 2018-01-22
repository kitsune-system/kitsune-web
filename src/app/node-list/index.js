import { connect } from 'react-redux';

import NodeListView from '../../components/node-list-view';

const NodeList = connect(state => ({ ...state.nodeList }))(NodeListView);
export default NodeList;
