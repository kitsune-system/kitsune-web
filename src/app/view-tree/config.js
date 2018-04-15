import React from 'react';

import kitsuneService from '../kitsune-service';
import actions from '../store/actions';

import NodeList from '../node-list';
import VerticalSplit from '../../components/vertical-split';

const Test = () => <div>This is a test component.</div>;
const Test2 = () => <div>Another Test</div>;
const Default = ({ viewId }) => <div>No view found for node: {viewId}</div>;

const { clearNodeList, newNode, removeNode, setActiveView, switchFocus } = actions;

const list = () => setActiveView('node-list');

const config = {
  default: {
    view: Default,
    commands: {
      another: () => console.log('Another One'),
      go: (...args) => setActiveView(...args),
      goodbye: () => console.log('Goodbye World'),
      hello: () => console.log('Hello World'),
      list,
      ls: list,
      search: value => kitsuneService.searchStrings(value)
        .then(res => console.log('Search Result:', res)),
      test: () => setActiveView('test')
    }
  },
  'node-list': {
    view: NodeList,
    commands: {
      clear: clearNodeList,
      delete: removeNode,
      new: newNode,
      rm: removeNode
    }
  },
  test: {
    view: Test,
    commands: {
      another: () => console.log('Another Test')
    }
  },
  test2: {
    view: Test2,
    commands: {
      goodbye: () => console.log('さようなら')
    }
  },
  vsplit: {
    view: VerticalSplit,
    commands: {
      hello: () => console.log('Hello VSplit'),
      another: () => console.log('Another VSplit'),
      sw: switchFocus,
      switch: switchFocus
    }
  }
};

export const getViewConfig = (view, defaultFallback = false) => {
  let viewConfig = config[view];

  if(viewConfig === undefined && defaultFallback)
    viewConfig = config.default;

  return viewConfig;
};
