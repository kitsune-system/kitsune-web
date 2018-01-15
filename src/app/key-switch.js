import { COMMAND_MODE, STRING_MODE, TEXT_MODE } from './entry';
import keyCodes from './key-codes';

import KeySwitch, { defaultModules } from '../services/key-switch';

import actions from '../app/actions';
import store from '../app/store';

const { newNode, selectPrevNode, selectNextNode, setMode } = actions;

const keySwitch = KeySwitch({
  ...defaultModules,
  simpleKey: e => keyCodes.includes(e.code),
  // eslint-disable-next-line no-warning-comments
  '+onBody': e => e.target.tagName === 'BODY', // TODO: Do we really need this now? (vs +nullMode)
  '+nullMode': () => store.getState().entry.mode === null
});

keySwitch.on('n +shift +nullMode', newNode);

keySwitch.on('down +nullMode', selectPrevNode);
keySwitch.on('up +nullMode', selectNextNode);

keySwitch.on('simpleKey -shift -ctrl -alt -meta +nullMode +onBody', () => setMode(COMMAND_MODE));
keySwitch.on('space -shift +nullMode +onBody !prevent', () => setMode(STRING_MODE));
keySwitch.on('space +shift +nullMode +onBody !prevent', () => setMode(TEXT_MODE));

keySwitch.on('escape +nullMode !prevent', () => setMode(null));

export default keySwitch;
