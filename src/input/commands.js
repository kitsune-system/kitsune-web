import toastr from 'toastr';

import { getActiveViewList } from '../store';
import { getViewConfig } from '../view-tree/config';

const findCommand = name => {
  const activeViews = [...getActiveViewList(), 'default'];

  for(const viewId of activeViews) {
    const { commands = {} } = getViewConfig(viewId) || {};

    if(commands[name])
      return commands[name];
  }
};

const command = cmdStr => {
  const args = cmdStr.split(/\s+/);
  const commandName = args.shift();

  const command = findCommand(commandName);

  if(command)
    command(...args);
  else
    toastr.error(`No such command: ${commandName}`);
};

export default command;
