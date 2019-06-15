/* eslint-disable */
import _ from 'lodash';
import { combineReducers, createStore } from 'redux';

const reduceMe = (name = null, reducerDef) => {
  const type = typeof reducerDef;

  switch(type) {
    case 'function':
      return reducerDef;
    case 'object':
      const mapped = _.mapValues(reducerDef, def => reduceMe(def));
      return combineReducers(mapped);
    default:
      throw new Error('reducerDef must be function or object');
  }
};

const doSomething = (actions, initialState) => {
  const myActions = _.mapValues(actions, (action, name) => {
    console.log('A', name, action);
  });

  const reducer = reduceMe(actions);
  debugger;

  const store = createStore(reducer, initialState);
  return { actions, store };
};

const Action = type => {
  return args => ({ ...args, type });
};

const Reducer = (handlers, initialState) => {
  return (oldState, action) => {
    if(oldState === undefined)
      return initialState;

    const { type } = action;
    const actionHandler = handlers[type];

    let state = oldState;
    if(actionHandler)
      state = actionHandler(oldState, action);

    return state;
  };
};

export { Action, Reducer, doSomething };
