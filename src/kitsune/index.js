import { Builder, Switch, on } from '@gamedevfox/katana';
import { LOOKUP_NATIVE_NAME, RANDOM } from '@kitsune-system/common';
import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import config from './config';

export const build = Builder(config);

const configureKeyboard = () => {
  const [
    { clearEntry, entry, pushEntry, random, update, updateEdge },
    focus,
    keyboard,
    store,
    core,
  ] = ['actions', 'focus', 'keyboard', 'store', 'core'].map(build);

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

    if(/Backspace|Key.|Space/.test(key)) {
      entry(key);
    } else if(key === 'Enter') {
      pushEntry();
    } else if(key === 'Escape') {
      clearEntry();
    } else if(key === 'BracketLeft') {
      updateEdge('head');
    } else if(key === 'BracketRight') {
      updateEdge('tail');
    } else if(key === 'Backslash') {
      core(LOOKUP_NATIVE_NAME, system => {
        system(RANDOM, result => console.log(result));
      });
    }
  });

  shiftOutput(key => {
    if(key === 'KeyN') {
      const { entryList } = store.getState();
      const latestEntry = entryList[entryList.length - 1];
      core(LOOKUP_NATIVE_NAME, lookupNativeName => lookupNativeName(latestEntry, id => {
        update({ selected: id || '' });
      }));
    } else if(key === 'KeyR') {
      random();
    } else if(key === 'KeyS') {
      const { showLabels } = store.getState();
      update({ showLabels: !showLabels });
    }
  });
};

const initialRemoteCalls = () => {
  const [{ update }, core] = ['actions', 'core'].map(build);

  core(RANDOM, random => random(null, id => {
    update({ selected: id });
    toastr.info(`Random: ${id}`);
  }));

  // core(BUILT_IN_NODES, builtInNodes => builtInNodes(null, nodes => update({ nodes })));
  // core(E(LIST_V, STRING), listStrings => listStrings(null, strings => update({ strings })));
};

const socketHandler = () => {
  const socket = build('socket');

  socket.output(msg => {
    console.log('Socket Output:', msg);
  });
};

const renderApp = () => {
  const App = build('App');
  render(<App/>, document.getElementById('root'));
};

const initialLogging = () => {
  const config = build('config');

  console.log('=== Kitsune Web Started ===');
  console.log('Config:', config);
};

export const run = () => ([
  configureKeyboard, initialRemoteCalls, socketHandler, renderApp, initialLogging,
].forEach(fn => fn()));
