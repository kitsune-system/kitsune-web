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

function Console() {
  const [random, setRandom] = useState('');
  const [commandList, setCommandList] = useState([]);
  const [edgeList, setEdgeList] = useState([]);

  const onRandomClick = () => service.random().then(setRandom);

  useEffect(() => {
    onRandomClick();

    service('commands').then(setCommandList);
    service('listEdge').then(setEdgeList);
  }, []);

  const commands = Object.entries(commandList).map(([hash, name]) => {
    return <li key={hash}><CopyInput readOnly type="text" value={hash}/> - {JSON.stringify(name)}</li>;
  });

  const edges = edgeList.map(([head, tail, id]) => (
    <li key={id}>{head} {'>>>'} {tail} # {id}</li>
  ));

  return (
    <div>
      <div style={{ display: 'flex', width: '100%' }}>
        <Button onClick={onRandomClick}>Random</Button>
        <CopyInput style={{ flexGrow: 1 }} type="text" value={random}/>
      </div>
      <div>
        <Input type="text" placeholder="Head"/>
        <Input type="text" placeholder="Tail"/>
        <Button>Create</Button>
      </div>
      <div>Commands:</div>
      <ul>{commands}</ul>
      <div>Edges:</div>
      <ul>{edges}</ul>
    </div>
  );
}

export default Console;
