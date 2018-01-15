import './entry.scss';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import KeySwitch from '../../services/key-switch';

import Icon from '../../components/icon';
import Overlay from '../../components/overlay';
import TextRangeEntry from './text-range-entry';

import actions from '../../app/actions';
import kitsuneService from '../../app/kitsune-service';
import store from '../../app/store';

export const COMMAND_MODE = 'command';
export const STRING_MODE = 'string';
export const TEXT_MODE = 'text';

const { clearNodeList, newNode, removeNode, setEntry, setMode, writeString } = actions;

const commands = {
  clear: clearNodeList,
  delete: removeNode,
  rm: removeNode,
  new: newNode,
  search: value => {
    console.log('Search', value);
    kitsuneService.searchStrings(value).then(res => {
      console.log('Search Result:', res);
    });
  }
};

const commandConfirm = () => {
  const { value } = store.getState().entry;
  console.log('COMMAND CONFIRM:', value);

  const args = value.split(/\s+/);
  const commandName = args.shift();
  const command = commands[commandName];

  if(command)
    command.apply(null, args);
  else
    toastr.error(`No such command: ${commandName}`);

  setMode(null);
};

const textConfirm = () => {
  const { value } = store.getState().entry;
  console.log('TEXT CONFIRM:', value);

  setMode(null);
  writeString(value);
};

const entries = {};

// COMMAND
const commandKeySwitch = new KeySwitch();
commandKeySwitch.on('enter !prevent', commandConfirm);
commandKeySwitch.on('escape !prevent', () => setMode(null));
entries[COMMAND_MODE] = TextRangeEntry({
  label: <Icon name="terminal"/>,
  onConfirm: commandConfirm,
  onKeyDown: commandKeySwitch.handle
});

// STRING
const stringKeySwitch = new KeySwitch();
stringKeySwitch.on('enter !prevent', textConfirm);
stringKeySwitch.on('escape !prevent', () => setMode(null));
stringKeySwitch.on('space', e => {
  const { value } = store.getState().entry;
  if(value.length === 0) {
    e.preventDefault();
    setMode(TEXT_MODE);
  }
});
entries[STRING_MODE] = TextRangeEntry({
  label: <Icon name="quote-right"/>,
  onConfirm: textConfirm,
  onKeyDown: stringKeySwitch.handle
});

// TEXT
const textKeySwitch = new KeySwitch();
textKeySwitch.on('enter +shift !prevent', textConfirm);
textKeySwitch.on('escape !prevent', () => setMode(null));
textKeySwitch.on('space', e => {
  const { value } = store.getState().entry;
  if(value.length === 0) {
    e.preventDefault();
    setMode(STRING_MODE);
  }
});
entries[TEXT_MODE] = TextRangeEntry({
  label: <Icon name="file-text-o"/>,
  onConfirm: textConfirm,
  onKeyDown: textKeySwitch.handle
});

class Entry extends React.Component {
  render() {
    const { mode, value } = this.props;

    const EntryMode = entries[mode];
    let result = null;

    if(mode !== null) {
      result = (
        <Overlay>
          <EntryMode ref={el => (this.entry = el)} value={value} onChange={e => setEntry(e.target.value)}/>
        </Overlay>
      );
    }

    return result;
  }

  componentDidMount() {
    if(this.entry)
      this.entry.focus();
  }

  componentDidUpdate() {
    if(this.entry)
      this.entry.focus();
  }
}

Entry.propTypes = {
  mode: PropTypes.string,
  value: PropTypes.string
};

Entry.defaultProps = {
  mode: null,
  value: ''
};

export default connect(state => ({ ...state.entry }))(Entry);
