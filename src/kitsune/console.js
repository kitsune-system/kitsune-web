/* eslint-disable */
import { deepHashEdge as E, WRITE, STRING } from '@kitsune-system/common';
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Button, Input, List } from 'semantic-ui-react';
import styled from 'styled-components';

import { Flex, Node } from '../components';
import { Keys } from '../components/store/keys';

import { bind } from './context';
import { build } from './index';

const flexGrow = (val = 1) => ({ style: { flexGrow: val } });
const noGrow = flexGrow(0);

const Styles = styled.div`
  .entries {
    ul { padding-left: 0px; }
    li {
      display: inline;
      font-weight: bold;

      border: 2px solid black
      border-radius: 5px;

      padding: 2px 5px;
      margin-right: 12px;

    }
  }
`;

const EntryStyle = styled.div`
  text-align: center; font-weight: bold;
  color: ${props => props.active ? 'red' : 'darkorange'};

  span { color: black; }
`;

const Entry = ({ value }) => {
  let entryView = 'Kitsune';
  if(value) {
    entryView = (
      <>
        <span>&gt;&gt;&gt;</span>
        {value}
        <span>&lt;&lt;&lt;</span>
      </>
    );
  }

  return <EntryStyle active={value}>{entryView}</EntryStyle>;
};

const Label = styled.div`
  position: absolute; top: 0; left: 0;
  border-radius: 4px; padding: 2px 4px;
  background-color: black; color: white;
`;

const Selectable = connect(state => ({ state }))(props => {
  const { nodeId, label, state, children } = props;
  const value = state[nodeId];
  const myLabel = label(props);

  return (
    <div style={{ position: 'relative' }}>
      {children(value)}
      {myLabel && <Label>{myLabel}</Label>}
    </div>
  );
});

export const Console = props => {
  const {
    edge, entry, entryList, nodes, selected,
    showLabels, strings, update, writeString,
  } = props;

  const [string, setString] = useState('');

  const reverseEntryList = [...entryList];
  reverseEntryList.reverse();

  const [head, tail, edgeId] = edge;

  const onStringClient = () => {
    writeString(string, id => update({ selected: id }));
  };

  return (
    <Styles>
      <List>
        <List.Item>
          <Entry value={entry}/>
        </List.Item>

        <List.Item>
          <Flex>
            <Button {...noGrow}>Selected</Button>
            <Node value={selected || ''}/>
          </Flex>
        </List.Item>

        <List.Item>
          <Flex>
            <Button {...noGrow}>EDGE</Button>
            <Node value={head}/>
            <Node value={tail}/>
            <Node value={edgeId}/>
          </Flex>
        </List.Item>

        <List.Item>
          <Flex>
            <Button {...noGrow} onClick={onStringClient}>STRING</Button>
            <Input type="text" value={string} onChange={e => setString(e.currentTarget.value)}/>
          </Flex>
        </List.Item>

        <List.Item className="entries">
          <h3>Entries</h3>
          <ul>
            {reverseEntryList.map((entry, index) => <li key={index}>{entry}</li>)}
          </ul>
        </List.Item>

        <List.Item>
          <h3>STRINGS</h3>
          <pre>
            {JSON.stringify(strings.map(string => Object.values(string).join(' ')), null, 2)}
          </pre>
        </List.Item>

        {/*
        <List.Item>
          <Flex>
            <Button {...noGrow}>Switch</Button>
            <Selectable nodeId="selected" label={({ nodeId }) => showLabels && nodeId}>{id => (
              <Node value={id || ''}/>
            )}
            </Selectable>
          </Flex>
        </List.Item>

        <List.Item>
          <h3>Keys</h3>
          <Keys/>
        </List.Item>

        <List.Item>
          <h3>Strings</h3>
          <ul>
            {strings.map(({ string }) => <li key={string}>{string}</li>)}
          </ul>
        </List.Item>

        <List.Item>
          <h3>Nodes</h3>
          <ul>
            {Object.entries(nodes).map(([key, value]) => <li key={key}>{key}<Node value={value}/></li>)}
          </ul>
        </List.Item>
        */}
      </List>
    </Styles>
  );
};

export default hot(bind(connect(state => state)(Console), {
  update: 'ACTION_UPDATE',
  writeString: E(WRITE, STRING),
}));
