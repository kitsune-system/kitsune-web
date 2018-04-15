import jsSHA from 'jssha';

export const toHex = str => Buffer.from(str).toString('hex');
export const fromHex = hex => Buffer.from(hex, 'hex').toString('utf8');

export const sha256 = (input, type = 'TEXT') => {
  const sha256 = new jsSHA('SHA-256', type); // eslint-disable-line new-cap
  sha256.update(input);
  return sha256.getHash('HEX');
};

export const hashList = list => sha256(list.join(''), 'HEX');

const hash = array => {
  return sha256(array[0]);
};
export default hash;
