import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  .content {
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Overlay = props => {
  return (
    <Styles>
      <div className="content">
        {props.children}
      </div>
    </Styles>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired
};

export default Overlay;
