import { Action, doSomething } from './redux-utils';

const TEST_TYPE = 'TEST_TYPE';

describe('Action', () => {
  it('should work', () => {
    const a = Action(TEST_TYPE);
    const data = a({ name: 'Adam', gold: 1000 });

    data.should.deepEqual({ type: TEST_TYPE, name: 'Adam', gold: 1000 });
  });
});

xdescribe('???', () => {
  it('should work', () => {
    const { store } = doSomething({
      counter: {
        increment: state => state++,
        decrement: state => state--,
        reset: () => 0
      },
      entry: {
        addItem: (state, action) => {
          const { mode, list } = state;
          const { item } = action;

          if(mode === 'normal')
            return [...list, item];

          return [item, ...list];
        },
        removeItem: state => {
          const { mode, list } = state;

          if(mode === 'normal')
            return list.slice(0, -1);

          return list.slice(1);
        },

        mode: {
          setMode: action => action.mode
        },
        list: {
          clear: () => [],
          reverse: state => state.reverse
        }
      }
    },
    {
      counter: 1,
      entry: {
        mode: 'normal',
        list: []
      }
    });

    console.log('S', store);
    store.subscribe(state => console.log('STATE:', state));

    store.should.equal({});
  });
});
