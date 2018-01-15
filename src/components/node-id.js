import React from 'react';
import PropTypes from 'prop-types';

const NodeId = props => {
  const shortId = props.id.substr(0, 7);
  return <span style={{ color: 'red' }}>{shortId}</span>;
};

NodeId.propTypes = {
  id: PropTypes.string.isRequired
};

export default NodeId;
