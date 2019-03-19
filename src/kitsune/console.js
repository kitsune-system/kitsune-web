/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';

import KitsuneService from './kitsune-service';

const buildAxios = baseURL => {
  const result = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  result.interceptors.request.use(req => {
    req.data = JSON.stringify(req.data);
    return req;
  });

  result.interceptors.response.use(res => res.data);

  return result;
};

const request = buildAxios('http://localhost:8080');

const service = KitsuneService(request);

const CopyInput = props => {
  const inputEl = useRef(null);

  const copy = () => {
    inputEl.current.select();
    document.execCommand("copy");
  };

  const action = <Button icon="copy outline" onClick={copy}/>;
  return <Input ref={inputEl} action={action} {...props}/>;
};

const Node = props => <CopyInput readOnly type="text" {...props}/>;

const bind = statePair => ({
  onChange: e => statePair[1](e.currentTarget.value),
  value: statePair[0],
});

function Console() {
  const [random, setRandom] = useState('');
  const [commandList, setCommandList] = useState([]);
  const [edgeList, setEdgeList] = useState([]);
  const [head, tail] = ['', ''].map(useState);

  const onRandomClick = () => service.random().then(setRandom);
  const onWriteEdgeClick = () => service('/writeEdge', [head[0], tail[0]]);

  useEffect(() => {
    onRandomClick();

    service('commands').then(setCommandList);
    service('listEdge').then(setEdgeList);
  }, []);

  const commands = Object.entries(commandList).map(([hash, name]) => {
    return <li key={hash}><Node value={hash}/> - {JSON.stringify(name)}</li>;
  });

  const edges = edgeList.map(([head, tail, id]) => (
    <li key={id}><Button icon="close"/><Node value={head}/> {'->'} <Node value={tail}/> # <Node value={id}/></li>
  ));

  return (
    <div>
      <Button onClick={() => service('/save')}>Save</Button>
      <Button onClick={() => service('/load')}>Load</Button>
      <div style={{ display: 'flex', width: '100%' }}>
        <Button onClick={onRandomClick}>Random</Button>
        <Node style={{ flexGrow: 1 }} value={random}/>
      </div>
      <div>
        <CopyInput type="text" placeholder="Head" {...bind(head)}/>
        <CopyInput type="text" placeholder="Tail" {...bind(tail)}/>
        <Button onClick={onWriteEdgeClick}>Write Edge</Button>
      </div>

      <h2>Commands:</h2>
      <ul>{commands}</ul>

      <h2>Edges:</h2>
      <ul>{edges}</ul>
    </div>
  );
}

export default Console;
