import _ from 'lodash';

import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Dummy = ({ node }) => <div>Hello {JSON.stringify(node, null, 2)} World</div>;
Dummy.propTypes = { node: PropTypes.object.isRequired };

const Another = ({ node }) => <div>Another One: {JSON.stringify(node, null, 2)}</div>;
Another.propTypes = { node: PropTypes.object.isRequired };

const configMap = {
  1234: Dummy,
  5678: Another
};

const ViewSwitch = props => {
  const { viewId } = props;
  const Component = configMap[viewId];

  if(Component === undefined)
    return <div>Unsupported View: {viewId}</div>;

  return (
    <div>
      <div>View Switch</div>
      <Component {...(_.omit(props, 'viewId'))}/>
    </div>
  );
};

ViewSwitch.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default withRouter(ViewSwitch);
