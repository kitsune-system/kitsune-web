import bind from './bind';

export { bind };

export const pipe = (...fns) => {
  return (...args) => {
    let value = fns[0](...args);
    for(let i = 1; i < fns.length; i++) {
      const fn = fns[i];
      value = fn(value);
    }

    return value;
  };
};
