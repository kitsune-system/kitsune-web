import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => <i className={`fa fa-${props.name}`} aria-hidden="true"/>;
Icon.propTypes = {
  name: PropTypes.string.isRequired
};
export default Icon;
