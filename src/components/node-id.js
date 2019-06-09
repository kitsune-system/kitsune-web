import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Styles = styled.div`
  position: relative;

  .full {
    display: none;

    background-color: black;
    position: absolute;
    top: -2px;
    left: 0px;
  }

  &:hover .full { display: inline; }
`;

const NodeId = ({ id }) => {
  const shortId = id.substr(0, 7);
  return (
    <Styles style={{ color: 'red' }}>
      <span className="short">{shortId}</span>
      <span className="full long">{id}</span>
    </Styles>
  );
};

NodeId.propTypes = {
  id: PropTypes.string.isRequired
};

export default NodeId;
