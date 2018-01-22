import './console.scss';

import React from 'react';

import Entry from '../../app/entry';
import NodeList from '../../app/node-list';
import ViewSwitch from '../../app/view-switch';

const Console = () => (
  <div className="console">
    <h1 className="title">Kitsune</h1>

    <ViewSwitch/>
    <NodeList/>
    <Entry/>
  </div>
);

export default Console;
