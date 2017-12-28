import { connect } from 'react-redux';

import App from './app/app';

import { COMMAND_MODE } from './app/entry-box/entry-box';

const build = actions => {
  const { confirmEntry, setEntry, setMode } = actions;

  const stateToProps = state => {
    return {
      entry: state.entry,
      mode: state.mode,
      nodeList: state.nodeList
    };
  };

  const dispatchToProps = {
    onConfirmEntry: confirmEntry,
    onEntryChange: e => setEntry(e.target.value),
    onModeChange: setMode,
    onSetClick: () => setMode(COMMAND_MODE, 'run this command')
  };

  return connect(stateToProps, dispatchToProps)(App);
};

export default build;
