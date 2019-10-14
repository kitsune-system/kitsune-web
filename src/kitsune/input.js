import { Switch, on } from '@gamedevfox/katana';
import { LOOKUP_NATIVE_NODE } from '@kitsune-system/common';

export const coreConfig = {
  CONFIGURE_KEYBOARD: {
    bind: {
      random: 'ACTION_RANDOM', update: 'ACTION_UPDATE',
      entry: 'ACTION_ENTRY', clearEntry: 'ACTION_CLEAR_ENTRY',
      pushEntry: 'ACTION_PUSH_ENTRY', updateEdge: 'ACTION_UPDATE_EDGE',
      lookupNativeName: LOOKUP_NATIVE_NODE,
    },
    inject: { focus: 'FOCUS', keyboard: 'KEYBOARD', store: 'STORE' },
    fn: ({
      focus, keyboard, store, update,
      random, entry, clearEntry, pushEntry, updateEdge,
      lookupNativeName,
    }) => () => {
      focus(() => keyboard.clear());

      // Prevent Default on certain keys
      on('keydown', e => {
        if(e.code === 'Escape')
          document.activeElement.blur();

        const preventIt = [
          e.code === 'Tab' && e.shiftKey === false,
          e.code === 'Space' && document.activeElement.tagName !== 'INPUT',
        ].find(value => value);

        if(preventIt)
          e.preventDefault();
      });

      const tabKey = keyboard('Tab');
      tabKey.output(value => update({ showLabels: value }));

      const leftShiftKey = keyboard('ShiftLeft');
      const shiftSwitch = Switch(leftShiftKey);
      keyboard.output.down(shiftSwitch);

      const neutralOutput = shiftSwitch.path(value => value === false);
      const shiftOutput = shiftSwitch.path(value => value === true);

      neutralOutput(key => {
        if(document.activeElement.tagName === 'INPUT')
          return;

        if(/Backspace|Key.|Space/.test(key))
          entry(key);
        else if(key === 'Enter')
          pushEntry();
        else if(key === 'Escape')
          clearEntry();
        else if(key === 'BracketLeft')
          updateEdge('head');
        else if(key === 'BracketRight')
          updateEdge('tail');
        else if(key === 'Backslash')
          lookupNativeName('RANDOM', result => console.log(result));
      });

      shiftOutput(key => {
        if(key === 'KeyN') {
          const { entryList } = store.getState();
          const latestEntry = entryList[entryList.length - 1];
          lookupNativeName(latestEntry, id => {
            update({ selected: id || '' });
          });
        } else if(key === 'KeyR') {
          random();
        } else if(key === 'KeyS') {
          const { showLabels } = store.getState();
          update({ showLabels: !showLabels });
        }
      });
    },
  },
};
