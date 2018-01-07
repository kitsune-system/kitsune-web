import './entry.scss';

import React from 'react';
import PropTypes from 'prop-types';

import KeySwitch from '../key-switch';

import Icon from '../icon';
import TextRangeEntry from './text-range-entry';

export const COMMAND_MODE = 'command';
export const STRING_MODE = 'string';
export const TEXT_MODE = 'text';

export default function entryFactory({ actions, kitsuneService, store }) {
  const { addNode, setEntry, setMode, writeString } = actions;

  const commands = {
    new: () => {
      kitsuneService.random().then(result => {
        console.log('R', result);
        addNode({ id: result });
      });
    }
  };

  const commandConfirm = () => {
    const { value } = store.getState().entry;
    console.log('COMMAND CONFIRM:', value);

    const command = commands[value];

    if(command)
      command();
    else
      console.log('No such command:', value);

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

      const Entry = entries[mode];
      return <Entry ref={el => (this.entry = el)} value={value} onChange={e => setEntry(e.target.value)}/>;
    }

    componentDidMount() {
      this.entry.focus();
    }

    componentDidUpdate() {
      this.entry.focus();
    }
  }

  Entry.propTypes = {
    mode: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  return Entry;
}
