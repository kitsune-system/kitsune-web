import { Action, doSomething } from './redux-utils';

const TEST_TYPE = 'TEST_TYPE';

describe('Action', () => {
  it('should work', () => {
    const a = Action(TEST_TYPE);
    const data = a({ name: 'Adam', gold: 1000 });

    data.should.deepEqual({ type: TEST_TYPE, name: 'Adam', gold: 1000 });
  });
});
