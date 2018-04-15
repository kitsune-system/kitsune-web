import Split from '../../core/split';
import State from '../../core/state';

const objectMixins = (state, push) => ({
  set: (name, value) => {
    state.value[name] = value;
    push('set', name, value);
  },
  delete: name => {
    delete state.value[name];
    push('delete', name);
  }
});

const Requests = (...listeners) => {
  const split = Split(...listeners);

  const requests = State({}, { output: split, mixins: objectMixins });

  let reqIdCounter = 0;

  const add = (type, meta) => {
    return new Promise((res, rej) => {
      const id = ++reqIdCounter;

      const resolve = value => {
        res(value);
        requests.delete(id);
      };

      const reject = value => {
        rej(value);
        requests.delete(id);
      };

      requests.set(id, { type, meta, resolve, reject });
    });
  };

  const listen = (listener, withPush = false) => {
    split.add(listener);

    if(withPush)
      listener(requests());
  };

  return { add, get: requests, listen };
};

export default Requests;
