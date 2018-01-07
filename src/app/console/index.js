import './console.scss';

import React from 'react';
import PropTypes from 'prop-types';

import NodeList from '../node-list';
import Overlay from '../overlay';

export default function consoleFactory({ Entry }) {
  class Console extends React.Component {
    render() {
      const { entry, onSetClick } = this.props;

      return (
        <div className="app">
          <h1 className="title">Hello Kitsune</h1>

          <button className="btn btn-primary" onClick={onSetClick}>Set</button>

          <NodeList/>

          {entry !== null &&
            <Overlay>
              <Entry {...entry}/>
            </Overlay>
          }
        </div>
      );
    }
  }

  Console.propTypes = {
    entry: PropTypes.object,
    nodeList: PropTypes.array.isRequired,
    onSetClick: PropTypes.func.isRequired
  };

  Console.defaultProps = {
    entry: null
  };

  return Console;
}
