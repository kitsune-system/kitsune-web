import { pipe } from './index';

describe('pipe(fns)', () => {
  it('should work', () => {
    const increment = x => x + 1;
    const double = x => x * 2;
    const squared = x => x * x;

    const myFunc = pipe(increment, double, squared);
    let value = myFunc(12);
    value.should.equal(676);

    const yourFunc = pipe(squared, increment, double);
    value = yourFunc(21);
    value.should.equal(884);
  });
});
