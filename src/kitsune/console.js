/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Button, List } from 'semantic-ui-react';

import { Flex, Node } from '../components';

import { build } from './index';

const flexGrow = (val = 1) => ({ style: { flexGrow: val } });
const noGrow = flexGrow(0);

export const Console = props => {
  const { entry, entryList, nodes, random } = props;

  const { random: getRandom } = build('actions');
  const webClient = build('webClient');

  const keyboard = build('keyboard');

  const [keys, setKeys] = useState({ ...keyboard() });
  useEffect(() => keyboard.output.change(() => setKeys({ ...keyboard() })), []);

  const onTestClick = () => webClient(
    'code', // Code
    'X9jwENfzyDvyCXKAdZfslKcH6L44mTrV7vOnaJ4RHXo=', // Edge
  ).then(code => {
    console.log('LEN:', code.length);
    console.log('CODE:', code);
  });

  return (
    <List>
      <List.Item style={{ textAlign: 'center', color: entry ? 'red' : 'darkorange', fontWeight: 'bold' }}>
        {
          entry ?
            <><span style={{ color: 'black' }}>&gt;&gt;&gt;</span> {entry} <span style={{ color: 'black' }}>&lt;&lt;&lt;</span></> :
            'Kitsune'
        }
      </List.Item>

      <List.Item>
        <Flex>
          <Button {...noGrow} onClick={getRandom}>Random</Button>
          <Node value={random}/>
        </Flex>
      </List.Item>

      <List.Item>
        <Button onClick={onTestClick}>Test</Button>
      </List.Item>

      <List.Item>
        <h3>Entry List</h3>
        <ul>
          {entryList.map(entry => <li key={entry}>{entry}</li>)}
        </ul>
      </List.Item>

      <List.Item>
        <h3>Nodes</h3>
        <ul>
          {Object.keys(nodes).map(key => <li key={key}>{key}</li>)}
        </ul>
      </List.Item>

      <List.Item>
        <h3>Keys</h3>
        <pre>
          {JSON.stringify(Object.keys(keys), null, 2)}
        </pre>
      </List.Item>
    </List>
  );
};

export default hot(connect(state => state)(Console));
