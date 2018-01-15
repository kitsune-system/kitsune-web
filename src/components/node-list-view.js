import React from 'react';
import PropTypes from 'prop-types';

import NodeView from './node-view';

class NodeListView extends React.Component {
  render() {
    return (
      <div className="entry-list">
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
