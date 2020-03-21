import { Pipe } from '@kitsune-system/common';

export const EventListener = () => {
  const [output, onOutput] = Pipe();

  let currTarget = null;
  let currType = null;

  const update = (newTarget, newType) => {
    if(currTarget && currType)
      currTarget.removeEventListener(currType, output);

    currTarget = newTarget;
    currType = newType;

    if(currTarget && currType)
      currTarget.addEventListener(currType, output);
  };

  const target = newTarget => {
    update(newTarget, currType);
  };

  const type = newType => {
    update(currTarget, newType);
  };

  const detach = () => {
    update(null, null);
  };

  return { target, type, detach, onOutput };
};
