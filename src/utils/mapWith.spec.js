import { mapWith } from './index';

describe('mapWith', () => {
  it('should work', () => {
    const map = {
      1: 'hello',
      2: 'world',
      something: 'here',
      one: 'more time',
      last: 'this is it'
    };

    const result = mapWith([1, 'one', 'last'], map);
    result.should.deepEqual(['hello', 'more time', 'this is it']);
  });
});
