import React from 'react';
import { connect } from 'react-redux';
import { Button, List, Tab } from 'semantic-ui-react';

import { Node } from '../components';

// import NodeList from './tabs/node-list';
import CommandList from './tabs/command-list';
import EdgeList from './tabs/edge-list';
import StringList from './tabs/string-list';

import build from './build';

import styled from 'styled-components';
const Flex = styled.div`{
  display: flex;

  & > * {
    flex-grow: 1;
  }
}`;

const flexGrow = (val = 1) => ({ style: { flexGrow: val } });
const noGrow = flexGrow(0);

export const Console = props => {
  const { random } = props;

  const { random: getRandom } = build('actions');

  const onTestClick = () => {
    // client(
    //   'code', // Code
    //   'X9jwENfzyDvyCXKAdZfslKcH6L44mTrV7vOnaJ4RHXo=', // Edge
    // ).then(code => {
    //   console.log('LEN:', code.length);
    //   console.log('CODE:', code);
    // });
  };

  const onBuildClick = () => {
    // client('build').then(path => console.log(`Build Path: ${path}`));
  };

  return (
    <List>
      <List.Item>
        {/*
        <Button onClick={() => client('save')}>Save</Button>
        <Button onClick={() => client('load')}>Load</Button>
        */}
        <Button onClick={onTestClick}>Test</Button>
        <Button onClick={onBuildClick}>Build</Button>
      </List.Item>

      <List.Item>
        <Flex>
          <Button {...noGrow} onClick={getRandom}>Random</Button>
          <Node value={random}/>
        </Flex>
      </List.Item>

      <List.Item>
        <Tab panes={[
          // ['Nodes', <NodeList key="nodeList" loadNodes={/ret => client('built-in-nodes').then(ret)}/>],
          ['Commands', <CommandList key="commandList"/>],
          ['Edges', <EdgeList key="edgeList"/>],
          ['Strings', <StringList key="stringList"/>],
        ].map(
          ([menuItem, content]) => ({ menuItem, render: () => <Tab.Pane>{content}</Tab.Pane> })
        )}/>
      </List.Item>
    </List>
  );
};

export default connect(
  state => ({ random: state.random }),
)(Console);
