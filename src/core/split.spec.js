import { stub } from 'sinon';

import Split from './split';

describe('Split', () => {
  it('should work', () => {
    const split = Split();

    let results = split({ first: 'one' });
    results.should.deepEqual({});

    //
    const stubA = stub();
    const removeA = split.add(stubA);

    removeA.should.be.a.Function();
    removeA.id.should.equal(1);

    //
    stubA.callCount.should.equal(0);

    stubA.onCall(0).returns('stubA-1');
    results = split({ second: 'one' });

    stubA.callCount.should.equal(1);
    stubA.getCall(0).args[0].should.deepEqual({ second: 'one' });
    results.should.deepEqual({ 1: 'stubA-1' });

    //
    const stubB = stub();
    const removeB = split.add(stubB);

    removeB.should.be.a.Function();
    removeB.id.should.equal(2);

    //
    stubB.callCount.should.equal(0);

    stubA.onCall(1).returns('stubB-2');
    stubB.onCall(0).returns('b stub: first');
    results = split({ another: 'time' });

    stubA.callCount.should.equal(2);
    stubB.callCount.should.equal(1);
    stubA.getCall(1).args[0].should.deepEqual({ another: 'time' });
    stubB.getCall(0).args[0].should.deepEqual({ another: 'time' });
    results.should.deepEqual({ 1: 'stubB-2', 2: 'b stub: first' });

    //
    removeA();
    stubB.onCall(1).returns('b stub: second');
    results = split({ final: 'test' });

    stubA.callCount.should.equal(2);
    stubB.callCount.should.equal(2);
    stubB.getCall(1).args[0].should.deepEqual({ final: 'test' });
    results.should.deepEqual({ 2: 'b stub: second' });

    //
    removeB();
    results = split({ endOfLine: '...' });

    stubA.callCount.should.equal(2);
    stubB.callCount.should.equal(2);
    results.should.deepEqual({});
  });
});
