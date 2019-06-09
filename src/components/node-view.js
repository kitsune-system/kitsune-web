import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import NodeId from './node-id';

const Styles = styled.div`
  border: 2px solid dimgrey;
  border-radius: 8px;
  margin-bottom: 5px;
  padding: 4px;

  # TODO: Double check this
  .selected .node-view {
    border-color: yellow;
  }
`;

const NodeView = props => {
  const { node } = props;
  return (
    <Styles>
      <NodeId id={node.id}/>
      {node.string && <><br/><pre>{node.string}</pre></>}
    </Styles>
  );
};

NodeView.propTypes = {
  node: PropTypes.object.isRequired
};

export default NodeView;
