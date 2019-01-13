import _ from 'lodash';

const State = (val, { output, mixins } = {}) => {
  let state = null;

  const push = (...args) => {
    if(state.output)
      state.output(state.value, ...args);
  };

  state = val => {
    if(val === undefined)
      return state.value;

    state.value = val;
    push();
  };

  // Mount state props
  state.output = output;
  state.value = val;

  // Initial push
  if(output)
    push();

  // Add mixins
  if(mixins) {
    const mixinObj = mixins(state, push);
    _.each(mixinObj, (mixin, name) => {
      if(name === 'output' || name === 'value')
        throw new Error('Can\'t include a mixin called "output" or "value"');

      state[name] = mixin;
    });
  }

  return state;
};

export default State;
