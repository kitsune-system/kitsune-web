import './console.scss';

import React, { Component } from 'react';

import RequestList from '../requests';
import ViewTree from '../view-tree';

class Console extends Component {
  render() {
    return (
      <div className="console">
        <h1 className="title">Kitsune</h1>
        <ViewTree/>
        <RequestList/>
      </div>
    );
  }
}

export default Console;
