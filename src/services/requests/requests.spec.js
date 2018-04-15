import Requests from './index';

describe('Requests', () => {
  it('should resolve promise on completion', done => {
    const requests = Requests();
    requests.add('i-need-this');
    requests.add('something')
      .then(value => {
        value.should.deepEqual({ one: 2, three: 4 });
        done();
      })
      .catch(done);

    const reqList = requests.get();
    reqList.should.containDeep({ 1: { type: 'i-need-this' }, 2: { type: 'something' } });
    reqList[2].resolve({ one: 2, three: 4 });
  });

  it('should reject promise on completion with reject flag', done => {
    const requests = Requests();
    requests.add('something-else')
      .then(() => {
        done(new Error('Promise should not resolve'));
      })
      .catch(e => {
        e.should.eql('banana');
        done();
      });

    const reqList = requests.get();
    reqList.should.containDeep({ 1: { type: 'something-else' } });
    reqList[1].reject('banana');
  });
});
