import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const View = props => (
  <div className="entry-list">
    {_.reverse([...props.nodeList]).map(item => (
      <div key={item.key}>
        <pre>{item.node.string}</pre>
        <div style={{ color: 'red' }}>{item.node.id}</div>
      </div>
    ))}
  </div>
);

View.propTypes = {
  nodeList: PropTypes.array.isRequired
};

const NodeList = connect(state => state)(View);
export default NodeList;
