/* eslint-disable */
import React from 'react';

import { buildReducer } from '../redux-utils';

import Icon from '../icon';
import { COMMAND_MODE, STRING_MODE, TEXT_MODE } from '.';

const handleConfirm = (e, requireShift = false) => {
  const shiftCheck = !requireShift || e.shiftKey;
  if(e.keyCode === 13 && shiftCheck) { // ENTER
    e.preventDefault();

    // TODO: Fix this
    // self.props.onConfirm();
  }
};

const handleCancel = e => {
  if(e.keyCode === 27) { // ESCAPE
    e.preventDefault();

    // TODO: Fix this
    // self.props.onModeChange(null);
    setMode(null);
  }
};

const handleToggle = (e, mode) => {
  if(e.keyCode === 32 && // SPACE
      self.props.value.length === 0) { // TODOS: FIX THIS
    e.preventDefault();

    // TODO: Fix this
    // const mode = (self.props.mode === STRING_MODE ? TEXT_MODE : STRING_MODE);
    // self.props.onModeChange(mode);
    setMode(mode);
  }
};

const modes = {};

modes[STRING_MODE] = {
  label: <Icon name="quote-right"/>,
  onKeyDown: e => {
    handleConfirm(e);
    handleCancel(e);

    handleToggle(e, TEXT_MODE);
  }
};

modes[TEXT_MODE] = {
  label: <Icon name="file-text-o"/>,
  onKeyDown: e => {
    handleConfirm(e, true);
    handleCancel(e);

    handleToggle(e, STRING_MODE);
  }
};

const entryHandlers = {
  SET_ENTRY: (state, action) => ({ ...state, value: action.value }),
  SET_MODE: (state, action) => {
    const { mode, text } = action;

    // TODO: Simplyfy this
    if(mode === null)
      return null;

    return mode ? { mode, value: text || ''} : null;
  }
};

const reducer = buildReducer(entryHandlers, null);

export default reducer;
