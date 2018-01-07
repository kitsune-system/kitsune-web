import { COMMAND_MODE, STRING_MODE, TEXT_MODE } from './entry';
import keyCodes from './key-codes';

import KeySwitch, { defaultModules } from './key-switch';

const keySwitchFactory = ({ actions, store }) => {
  const { setMode } = actions;

  const keySwitch = KeySwitch({
    ...defaultModules,
    simpleKey: e => keyCodes.includes(e.code),
    '+onBody': e => e.target.tagName === 'BODY', // TODO: Do we really need this now? (vs +nullMode)
    '+nullMode': () => store.getState().entry === null
  });

  keySwitch.on('simpleKey -shift +nullMode +onBody', () => setMode(COMMAND_MODE));
  keySwitch.on('space -shift +nullMode +onBody !prevent', () => setMode(STRING_MODE));
  keySwitch.on('space +shift +nullMode +onBody !prevent', () => setMode(TEXT_MODE));

  keySwitch.on('escape +nullMode !prevent', () => setMode(null));

  return keySwitch;
};

export default keySwitchFactory;
