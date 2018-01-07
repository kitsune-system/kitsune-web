import should from 'should';
import sinon from 'sinon';

import KeySwitch, { keyCode } from '.';

describe('KeySwitch', () => {
  beforeEach(() => {
    const modules = {
      enter: keyCode(13),
      escape: keyCode(27),
      '+shift': e => e.shiftKey,
      '!prevent': e => {
        e.preventDefault();
        return true;
      }
    };

    this.keySwitch = KeySwitch(modules);
  });

  it('should work', () => {
    const { keySwitch } = this;

    const handler = sinon.spy();
    const off = keySwitch.on('enter +shift !prevent', handler);

    const e = { keyCode: 13, shiftKey: true, preventDefault: sinon.spy() };
    keySwitch.handle(e);
    keySwitch.handle({ keyCode: 13, shiftKey: false }); //  This shouldn't trigger the handler

    off();

    handler.callCount.should.equal(1);
    handler.getCall(0).args[0].should.equal(e);
    e.preventDefault.callCount.should.equal(1);
  });

  it('should work again', () => {
    const { keySwitch } = this;

    const handler = sinon.spy();
    keySwitch.on('escape', handler);

    const e = { keyCode: 27, shiftKey: true, preventDefault: sinon.spy() };
    keySwitch.handle(e);

    handler.callCount.should.equal(1);
    handler.getCall(0).args[0].should.equal(e);
    e.preventDefault.callCount.should.equal(0);
  });

  it('should throw an Error on an invalid module name', () => {
    const { keySwitch } = this;

    should(() => {
      keySwitch.on('escape oops', () => {});
    }).throw('Invalid module name: oops');
  });
});
