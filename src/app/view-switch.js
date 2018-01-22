import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Dummy = ({ node }) => <div>Hello {JSON.stringify(node, null, 2)} World</div>;
Dummy.propTypes = { node: PropTypes.object.isRequired };

const Another = ({ node }) => <div>Another One: {JSON.stringify(node, null, 2)}</div>;
Another.propTypes = { node: PropTypes.object.isRequired };

const pathToNodeId = Comp => {
  const HigherComp = ({ path }) => {
    const id = path.split('/')[2];
    const node = { id };

    return <Comp node={node}/>;
  };

  HigherComp.propTypes = {
    path: PropTypes.string.isRequired
  };

  return HigherComp;
};

const configMap = {
  1234: pathToNodeId(Dummy),
  5678: pathToNodeId(Another)
};

const ViewSwitch = props => {
  const path = location.pathname;
  const parts = path.split('/');

  parts.shift(); // Remove leading '/'
  const viewId = parts.shift();

  const Comp = configMap[viewId];
  if(Comp === undefined)
    return <div>Unsupported View: {viewId}</div>;

  return (
    <div>
      <div>View Switch</div>
      <Comp path={path} {...props}/>
    </div>
  );
};

export default withRouter(ViewSwitch);
