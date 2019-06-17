import _ from 'lodash';

const Split = (...listeners) => {
  let idCounter = 0;
  const outputs = {};

  const split = (...args) => _.mapValues(outputs, output => output(...args));

  const add = output => {
    const id = ++idCounter;
    outputs[id] = output;

    const remove = () => delete outputs[id];
    remove.id = id;
    return remove;
  };

  split.add = add;

  listeners.forEach(add);

  return split;
};

export default Split;
