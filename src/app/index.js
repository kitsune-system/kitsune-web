import { connect } from 'react-redux';

import { COMMAND_MODE } from './entry';

export default function appFactory({ actions, Console }) {
  const { setMode } = actions;

  const dispatchToProps = {
    onSetClick: () => setMode(COMMAND_MODE, 'run this command')
  };

  return connect(state => state, dispatchToProps)(Console);
}
