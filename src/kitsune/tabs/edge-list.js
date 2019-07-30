/* eslint-disable */
import React, { useEffect } from 'react';
import { Button, List } from 'semantic-ui-react';

import { CopyInput, Node } from '../../components';
import { bind, linkState } from '../../utils';

const EdgeList = () => {
  const [head, tail, edgeList] = ['', '', []].map(linkState);

  // useEffect(() => {
  //   client('listEdge').then(edgeList);
  // }, []);

  const onWriteEdgeClick = () => {
    // client.writeEdge(head(), tail()).then(() => {
    //   head('');
    //   tail('');
    // });
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

export default EdgeList;
