import { spy } from 'sinon';

import State from './state';

describe('State', () => {
  it('should work', () => {
    const output = spy();

    const state = State(123, { output });
    (typeof state).should.equal('function');

    output.callCount.should.equal(1);
    output.getCall(0).args.should.deepEqual([123]);
  });

  it('mixins should work', () => {
    const output = spy();
    const mixins = (state, push) => ({
      push: (name, value) => {
        state.value[name] = value;
        push(name, value);
      }
    });

    const state = State({ hello: 'world' }, { mixins });
    state.output = output;
    output.callCount.should.equal(0);

    state.push('another-one', 456);
    output.callCount.should.equal(1);
    output.getCall(0).args.should.deepEqual([
      {
        hello: 'world',
        'another-one': 456
      },
      'another-one',
      456
    ]);
  });
});
