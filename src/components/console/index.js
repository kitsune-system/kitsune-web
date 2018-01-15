import './console.scss';

import React from 'react';

import Entry from '../../app/entry';
import NodeList from '../../app/node-list';
import ViewSwitch from '../../app/view-switch';

class Console extends React.Component {
  render() {
    const path = location.pathname;
    const parts = path.split('/');

    const [refMode, viewId, nodeId] = parts.slice(1);
    if(refMode !== 'id')
      return <div>Unsupported Reference Mode: {JSON.stringify(refMode)}</div>;

    const node = { id: nodeId };

    return (
      <div className="console">
        <h1 className="title">Kitsune</h1>

        <ViewSwitch viewId={viewId} node={node}/>
        <NodeList/>
        <Entry/>
      </div>
    );
  }
}

export default Console;
