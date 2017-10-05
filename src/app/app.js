import React from 'react';

import $ from 'jquery';
import TextStretch from './text-stretch';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = { text: '' };

    this.list = [];
    this.state = {
      text: '',
      list: this.list
    };

    this.onChange = e => this.setState({ text: e.target.value });

    this.onClick = () => {
      this.setState({ text: 'You hit the button!\nAnother one' });
    };

    this.onKeyDown = e => {
      if(e.key === 'Enter' && this.state.text.trim().length !== 0) {
        e.preventDefault();

        this.list.push(this.state.text);
        this.setState({ text: '', list: this.list });
      }

      console.log('G', e.keyCode, e.key, e.location);
    };
  }

  componentDidMount() {
    $('#root .text-stretch textarea').focus();
  }

  render() {
    const listItems = this.state.list.map(item => <li key={item}>{item}</li>);

    return (
      <div>
        <h1>Hello Kitsune</h1>
        <button onClick={this.onClick}>Set</button>
        <div className={this.state.text.length ? '' : 'hidden'}>
          <TextStretch value={this.state.text} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
        </div>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}
