import './node-view.scss';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import NodeId from '../node-id';

const NodeView = props => {
  const { node } = props;
  return (
    <div className="node-view">
      <NodeId id={node.id}/>
      {node.string && <Fragment><br/><pre>{node.string}</pre></Fragment>}
    </div>
  );
};

NodeView.propTypes = {
  node: PropTypes.object.isRequired
};

export default NodeView;
