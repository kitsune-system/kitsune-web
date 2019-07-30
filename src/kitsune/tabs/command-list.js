/* eslint-disable */
import React, { useEffect } from 'react';
import { List } from 'semantic-ui-react';

import { linkState } from '../../utils';

import build from '../build';

const CommandList = () => {
  const commandList = linkState([]);

  // useEffect(() => {
  //   client('commands').then(commandList);
  // }, []);

  const commands = Object.entries(commandList()).map(([hash, name]) => {
    return <List.Item key={hash}><Node value={hash}/> {JSON.stringify(name)}</List.Item>;
  });

  return <List items={commands}/>;
};

export default CommandList;
