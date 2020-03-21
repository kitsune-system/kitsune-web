import should from 'should';
import { spy } from 'sinon';

import { Rules } from './rules';

describe('Rules({...})', () => {
  it('should work', () => {
    const rules = Rules({
      even: x => x % 2 === 0,
      odd: x => x % 2 !== 0,
      negative: x => x < 0,
      large: x => x > 100
    });

    let rule = rules('even !negative');

    rule(10).should.be.true();
    rule(15).should.be.false();
    rule(-10).should.be.false();

    rule = rules.union('!odd negative', 'evenOrNeg');
    rule(12).should.be.true();
    rule(-7).should.be.true();
    rule(-8).should.be.true();
    rule(21).should.be.false();

    rule = rules('evenOrNeg large'); // Using our stored union rule above
    rule(50).should.be.false();
    rule(123).should.be.false();
    rule(200).should.be.true();

    // Actions
    const mySpy = spy(x => x * 2);
    const yourSpy = spy(x => x + 10);

    let action = rules('even !negative', mySpy);
    mySpy.callCount.should.equal(0);

    action(12).should.equal(24);
    mySpy.callCount.should.equal(1);

    should(action(13)).be.undefined();
    mySpy.callCount.should.equal(1);

    action = rules('even !negative', mySpy, yourSpy);
    mySpy.callCount.should.equal(1);
    yourSpy.callCount.should.equal(0);

    action(12).should.equal(34);
    mySpy.callCount.should.equal(2);
    yourSpy.callCount.should.equal(1);

    should(action(13)).be.undefined();
    mySpy.callCount.should.equal(2);
    yourSpy.callCount.should.equal(1);
  });
});
