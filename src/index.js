import 'toastr/build/toastr.css';
import toastr from 'toastr';

// Toastr config
toastr.options = {
  hideDuration: 300,
  progressBar: true
};

import { run } from './kitsune';

run();
