/* eslint-disable */
import React, { useEffect } from 'react';
import { Button, Input, List } from 'semantic-ui-react';

import { bind, linkState } from '../../utils';

import Node from '../../components/node';

// import { BUILT_IN_NODES } from '@kitsune-system/kitsune-common';

const NodeList = props => {
  const { loadNodes, onCreateNode } = props;

  const [nodeName, nodeList] = ['', {}].map(linkState);

  // TODO: Replace with with a follow/watch/track
  useEffect(() => {
    loadNodes(nodes => console.log('NODES:', nodes))
  }, []);

  const onCreateClick = async() => onCreateNode(nodeName());

  //   const stringNode = await writeString();
  //   const randomNode = await random();
  //
  //   let mapNode = await getVar(BUILT_IN_NODES);
  //   const nodeMap = await readMap(mapNode);
  //
  //   nodeMap[stringNode] = randomNode;
  //
  //   mapNode = await writeMap(nodeMap);
  //   await setVar(BUILT_IN_NODES, mapNode);
  // };

  const nodes = Object.entries(nodeList()).map(([name, node]) => {
    return <List.Item key={name}><Node value={node}/> {name}</List.Item>;
  });

  return (
    <>
      <Input {...bind(nodeName)}/>
      <Button onClick={onCreateClick}>Create</Button>
      <List items={nodes}/>
    </>
  );
};

export default NodeList;
