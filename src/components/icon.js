import React from 'react';
import PropTypes from 'prop-types';

export const Icon = props => <i className={`fa fa-${props.type}`} aria-hidden="true"/>;

Icon.propTypes = {
  type: PropTypes.string.isRequired
};
