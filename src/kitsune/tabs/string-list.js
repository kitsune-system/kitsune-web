/* eslint-disable */
import React, { useEffect } from 'react';
import { Button, List } from 'semantic-ui-react';

import { CopyInput, Node } from '../../components';
import { bind, linkState } from '../../utils';

import build from '../build';

const StringList = () => {
  const [{ watch }, socket] = ['actions', 'socket'].map(build);

  const [string, stringList] = ['', []].map(linkState);

  useEffect(() => watch('STRINGS'), []);
  // useEffect(() => {
  //   client('listString').then(stringList);
  // }, []);

  const onWriteStringClick = () => {
    socket(JSON.stringify({ msg: 'From string list' }));
    // client.writeString(string()).then(hash => string(hash));
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

export default StringList;
