/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, List, Tab } from 'semantic-ui-react';

import { CopyInput, Node } from '../components';
import { build as buildClient } from '../common/client';
import { bind, linkState } from '../utils';

import NodeList from './tabs/node-list';

const client = buildClient({ kitsuneHost: 'localhost:8080', secure: false });

const CommandList = () => {
  const commandList = linkState([]);

  useEffect(() => {
    client('commands').then(commandList);
  }, []);

  const commands = Object.entries(commandList()).map(([hash, name]) => {
    return <List.Item key={hash}><Node value={hash}/> {JSON.stringify(name)}</List.Item>;
  });

  return <List items={commands}/>;
};

const EdgeList = () => {
  const [head, tail, edgeList] = ['', '', []].map(linkState);

  useEffect(() => {
    client('listEdge').then(edgeList);
  }, []);

  const onWriteEdgeClick = () => {
    client.writeEdge(head(), tail()).then(() => {
      head('');
      tail('');
    });
  };

  const edges = edgeList().map(([head, tail, id]) => (
    <div key={id}>
      <Button icon="close"/>
      <Node value={id}/>
      <Node value={head}/>
      <Node value={tail}/>
    </div>
  ));

  return (
    <>
      <div>
        <CopyInput type="text" placeholder="Head" {...bind(head)}/>
        <CopyInput type="text" placeholder="Tail" {...bind(tail)}/>
        <Button onClick={onWriteEdgeClick}>Write Edge</Button>
      </div>

      <List items={edges}/>
    </>
  );
};

const StringList = () => {
  const [string, stringList] = ['', []].map(linkState);

  useEffect(() => {
    client('listString').then(stringList);
  }, []);

  const onWriteStringClick = () => {
    client.writeString(string()).then(hash => string(hash));
  };

  const strings = stringList().map(({ id, string }) => (
    <div key={id}><Button icon="close"/><Node value={id}/><Node value={string}/></div>
  ));

  return (
    <>
      <CopyInput type="text" placeholder="String" {...bind(string)}/>
      <Button onClick={onWriteStringClick}>Write String</Button>

      <List items={strings}/>
    </>
  );
};

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
  const { myValue } = props;

  const random = linkState('');

  const onRandomClick = () => client.random().then(random);
  const onTestClick = () => {
    client(
      'code', // Code
      'X9jwENfzyDvyCXKAdZfslKcH6L44mTrV7vOnaJ4RHXo=', // Edge
    ).then(code => {
      console.log('LEN:', code.length);
      console.log('CODE:', code);
    });
  };

  const onBuildClick = () => client('build').then(path => console.log(`Build Path: ${path}`));

  useEffect(() => {
    onRandomClick();
  }, []);

  return (
    <List>
      <CopyInput value={myValue}/>

      <List.Item>
        <Button onClick={() => client('save')}>Save</Button>
        <Button onClick={() => client('load')}>Load</Button>
        <Button onClick={onTestClick}>Test</Button>
        <Button onClick={onBuildClick}>Build</Button>
      </List.Item>

      <List.Item>
        <Flex>
          <Button {...noGrow} onClick={onRandomClick}>Random</Button>
          <Node value={random()}/>
        </Flex>
      </List.Item>

      <List.Item>
        <Tab panes={[
          // ['Nodes', <NodeList loadNodes={ret => client('built-in-nodes').then(ret)}/>],
          // ['Commands', <CommandList/>],
          // ['Edges', <EdgeList/>],
          // ['Strings', <StringList/>],
        ].map(
          ([menuItem, content]) => ({ menuItem, render: () => <Tab.Pane>{content}</Tab.Pane> })
        )}/>
      </List.Item>
    </List>
  );
};

export default connect(state => ({ myValue: state.value }))(Console);
