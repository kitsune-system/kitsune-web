import './overlay.scss';

import React from 'react';
import PropTypes from 'prop-types';

const Overlay = props => {
  return (
    <div className="overlay">
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired
};

export default Overlay;
