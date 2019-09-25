import 'toastr/build/toastr.css';

import { BUILT_IN_NODES, RANDOM } from '@kitsune-system/common';

import { build } from './kitsune';

const { update } = build('actions');
const webClient = build('webClient');

webClient(RANDOM, null, node => console.log('NODE', node));
webClient(BUILT_IN_NODES, null, nodes => {
  console.log('NODES', nodes);
  update({ nodes });
});

build('runFn')();
