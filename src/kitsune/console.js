import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, List, Tab } from 'semantic-ui-react';

import service from './kitsune-service';

const CopyInput = props => {
  const inputEl = useRef(null);

  const copy = () => {
    inputEl.current.select();
    document.execCommand('copy');
  };

  const action = <Button icon="copy outline" onClick={copy}/>;
  return <Input ref={inputEl} action={action} {...props}/>;
};

const Node = props => <CopyInput readOnly type="text" {...props}/>;

const bind = state => ({
  onChange: e => state(e.currentTarget.value),
  value: state(),
});

const linkState = initState => {
  const [value, setter] = useState(initState);
  return val => val === undefined ? value : setter(val);
};

const CommandList = () => {
  const commandList = linkState([]);

  useEffect(() => {
    service('commands').then(commandList);
  }, []);

  const commands = Object.entries(commandList()).map(([hash, name]) => {
    return <List.Item key={hash}><Node value={hash}/> {JSON.stringify(name)}</List.Item>;
  });

  return <Tab.Pane><List items={commands}/></Tab.Pane>;
};

const EdgeList = () => {
  const [head, tail, edgeList] = ['', '', []].map(linkState);

  useEffect(() => {
    service('listEdge').then(edgeList);
  }, []);

  const onWriteEdgeClick = () => {
    service('writeEdge', [head(), tail()]).then(() => {
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
    <Tab.Pane>
      <div>
        <CopyInput type="text" placeholder="Head" {...bind(head)}/>
        <CopyInput type="text" placeholder="Tail" {...bind(tail)}/>
        <Button onClick={onWriteEdgeClick}>Write Edge</Button>
      </div>

      <List items={edges}/>
    </Tab.Pane>
  );
};

const StringList = () => {
  const [string, stringList] = ['', []].map(linkState);

  useEffect(() => {
    service('listString').then(stringList);
  }, []);

  const onWriteStringClick = () => {
    service('writeString', string()).then(hash => string(hash));
  };

  const strings = stringList().map(({ id, string }) => (
    <div key={id}><Button icon="close"/><Node value={id}/><Node value={string}/></div>
  ));

  return (
    <Tab.Pane>
      <CopyInput type="text" placeholder="String" {...bind(string)}/>
      <Button onClick={onWriteStringClick}>Write String</Button>

      <List items={strings}/>
    </Tab.Pane>
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

const Console = () => {
  const random = linkState('');

  const onRandomClick = () => service.random().then(random);
  const onTestClick = () => {
    service(
      'code', // Code
      'X9jwENfzyDvyCXKAdZfslKcH6L44mTrV7vOnaJ4RHXo=', // Edge
    ).then(code => {
      console.log('LEN:', code.length);
      console.log('CODE:', code);
    });
  };

  useEffect(() => {
    onRandomClick();
  }, []);

  return (
    <List>
      <List.Item>
        <Button onClick={() => service('save')}>Save</Button>
        <Button onClick={() => service('load')}>Load</Button>
        <Button onClick={onTestClick}>
          Test
        </Button>
      </List.Item>

      <List.Item>
        <Flex>
          <Button {...noGrow} onClick={onRandomClick}>Random</Button>
          <Node value={random()}/>
        </Flex>
      </List.Item>

      <List.Item>
        <Tab panes={[
          { menuItem: 'Commands', render: () => <CommandList/> },
          { menuItem: 'Edges', render: () => <EdgeList/> },
          { menuItem: 'Strings', render: () => <StringList/> },
        ]}/>
      </List.Item>
    </List>
  );
};

export default Console;
