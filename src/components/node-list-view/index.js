import React from 'react';
import PropTypes from 'prop-types';

import NodeView from '../node-view/index';

class NodeListView extends React.Component {
  render() {
    return (
      <div className="node-list-view">
        {this.props.nodes.map((item, index) => (
          <span key={item.key} className={index === this.props.selectedNode ? 'selected' : null}>
            <NodeView node={item.node}/>
          </span>
        ))}
      </div>
    );
  }
}

NodeListView.propTypes = {
  nodes: PropTypes.array.isRequired,
  selectedNode: PropTypes.number.isRequired
};

export default NodeListView;
