import 'toastr/build/toastr.css';

import { Pipe } from '@kitsune-system/common';
import { Collector, Layers } from '@kitsune-system/common';
import React from 'react';
import { render } from 'react-dom';
import toastr from 'toastr';

import Console from './kitsune/console';
import { Provider } from './kitsune/context';

import { dummy } from './dummy';
import { Entry } from './entry';
import { EventListener } from './event-listener';
import { GlobalStyle } from './style';

// Toastr config
toastr.options = {
  hideDuration: 300,
  positionClass: 'toast-bottom-right',
  progressBar: true,
};

/// //////////////////////////////////////

const [fireCount, onCount] = Pipe();
onCount(() => {});

let count = 0;
const bump = value => {
  count += value;
  fireCount(count);
};

setInterval(() => {
  count++;
  fireCount(count);
}, 1000);

/// //////////////////////////////////////

const keyDown = EventListener();
const keyLayers = Layers();
const entry = Entry();

// Input
keyDown.target(window);
keyDown.type('keydown');
// Output
// keyDown.onOutput(e => entry.input({ input: e.code, onOutput: () => {} }));
keyDown.onOutput(keyLayers.input);

keyLayers.open({ onOutput: id => {
  const out = keyLayers[id];
  out(({ input, onOutput }) => entry.input({ input: input.code, onOutput }));
} });
keyLayers.onDefault(e => {
  console.log('Key Unhandled: ', e);
});

// Output
// entry.onOutput(value => {
//   console.log('>>', value);
// });

/// //////////////////////////////////////

const types = {
  bump: 'INPUT',
  onCount: 'OUTPUT',
  onEntry: 'OUTPUT',
  misc: 'SOMETHING_ELSE', // Not used, just here as a fail check
};

const systems = {
  COUNTER: {
    bump,
    onCount,
    onEntry: entry.onOutput,
    misc: () => {
      throw Error('Don\'t call me!');
    },
  },
};

const DummySystem = () => {
  const [getSystem, onGetSystem] = Pipe();
  const [getPortType, onGetPortType] = Pipe();

  const system = {};

  const register = ({ input: systemId, onOutput: update, onError }) => {
    console.log('Registered', systemId);

    const outputs = [];
    getSystem({ input: systemId, onOutput: system => {
      if(!system) {
        onError({ type: 'systemNotFound', systemId });
        return;
      }

      const collect = Collector();
      Object.keys(system).forEach(portId => getPortType({ input: portId, onOutput: collect(portId) }));

      collect.done(portTypes => {
        const entries = Object.entries(portTypes);
        const [inputPorts, outputPorts] = ['INPUT', 'OUTPUT'].map(type => {
          return entries.filter(([_, portType]) => portType === type).map(([portId]) => portId);
        });

        const inputs = {};
        inputPorts.forEach(portId => (inputs[portId] = system[portId]));
        update(inputs);

        outputPorts.forEach(portId => {
          const output = system[portId];
          output(value => update({ [portId]: value }));
        });
      });
    } });

    return () => {
      // FIXME: THIS
      console.log('Unregistered', systemId);
      outputs.forEach(output => output(() => {}));
    };
  };

  system.register = register;
  system.onGetSystem = onGetSystem;
  system.onGetPortType = onGetPortType;

  return system;
};

const dummySys = DummySystem();
dummySys.onGetSystem(({ input: systemId, onOutput }) => onOutput(systems[systemId]));
dummySys.onGetPortType(({ input: portId, onOutput }) => onOutput(types[portId]));

const App = () => {
  return (
    <Provider register={dummySys.register}>
      <GlobalStyle/>
      <Console systemId="COUNTER"/>
    </Provider>
  );
};

render(<App/>, document.getElementById('root'));

dummy();
