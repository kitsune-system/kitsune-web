import './node-id.scss';

import React from 'react';
import PropTypes from 'prop-types';

const NodeId = ({ id }) => {
  const shortId = id.substr(0, 7);
  return (
    <span className="node-id" style={{ color: 'red' }}>
      <span className="short">{shortId}</span>
      <span className="full long">{id}</span>
    </span>
  );
};

NodeId.propTypes = {
  id: PropTypes.string.isRequired
};

export default NodeId;
