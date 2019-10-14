import 'toastr/build/toastr.css';

import { Core } from '@kitsune-system/common';
import toastr from 'toastr';

import { coreConfig, RUN } from './kitsune';

// Toastr config
toastr.options = {
  hideDuration: 300,
  positionClass: 'toast-bottom-right',
  progressBar: true,
};

Core(coreConfig, core => {
  core(RUN, run => run());
});
