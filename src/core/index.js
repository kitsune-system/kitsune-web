import _ from 'lodash';

export const mapWith = (input, map) => input.map(key => map[key]);

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

export const superMap = (input, fn) => {
  let result = null;

  if(_.isPlainObject(input))
    result = _.mapValues(input, fn);
  else if(_.isArray(input))
    result = _.map(input, fn);
  else
    result = fn(input);

  return result;
};
