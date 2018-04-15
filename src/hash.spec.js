import hash, { hashList, toHex, fromHex, sha256 } from './hash';

describe('hash', () => {
  it('should work', () => {
    const result = hash(['my data', 'another one']);
    result.should.equal('');
  });

  describe('hashList', () => {
    it('should work', () => {
      const list = ['Start!', 'Hello World', 'こにちは'].map(x => sha256(x));
      const result = hashList(list);
      result.should.equal('2c74b184ec20063862373098c690c6ea224fd2da7588545f15a730db3ba34072');
    });
  });

  describe('toHex', () => {
    it('should work', () => {
      const result = toHex('Hello World');
      result.should.equal('48656c6c6f20576f726c64');
    });

    it('should work with utf-8', () => {
      const result = toHex('こにちは');
      result.should.equal('e38193e381abe381a1e381af');
    });
  });

  describe('fromHex', () => {
    it('should work', () => {
      const result = fromHex('48656c6c6f20576f726c64');
      result.should.equal('Hello World');
    });

    it('should work with utf-8', () => {
      const result = fromHex('e38193e381abe381a1e381af');
      result.should.equal('こにちは');
    });
  });

  describe('sha256', () => {
    it('should work', () => {
      const result = sha256('Hello World');
      result.should.equal('a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e');
    });

    it('should work with utf-8', () => {
      const result = sha256('こにちは');
      result.should.equal('edf2a1a36cf27a1cd1d0f3e5ce2bfce1e7df9882f686ddded6e799074addf424');
    });
  });
});
