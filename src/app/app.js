/* eslint-disable */

import './app.scss';

import React from 'react';

import EntryBox from './entry-box/entry-box';
import Overlay from './overlay/overlay';

class App extends React.Component {
  render() {
    const { props } = this;

    return (
      <div className="app">
        <h1 className="title">Hello Kitsune</h1>

        <button className="btn btn-primary" onClick={this.props.onSetClick}>Set</button>

        <div className="entry-list">
          {props.nodeList.map(item => {
            const { key, node } = item;
            return (
              <div key={key}>
                <pre>{node.string}</pre>
                <div style={{ color: 'red' }}>{node.id}</div>
              </div>
            );
          })}
        </div>

        {props.mode !== null &&
          <Overlay>
            <EntryBox ref={el => this.entryBox = el}
              mode={props.mode} onModeChange={props.onModeChange}
              value={props.entry} onChange={props.onEntryChange}
              onConfirm={props.onConfirmEntry}/>
          </Overlay>
        }
      </div>
    );
  }

  componentDidUpdate() {
    if(this.props.mode !== null)
      this.entryBox.focus();
  }
}

export default App;
