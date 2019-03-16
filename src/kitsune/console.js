/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'semantic-ui-react';

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

function Console() {
  const [random, setRandom] = useState('');
  const [commandList, setCommandList] = useState([]);

  const onRandomClick = () => {
    service('ijJv0As7V8Vk8kx1kL5Rm+LSDyHnfFPazUVtB/pmZiw=').then(result => {
      const random = Buffer.from(result).toString('base64');
      setRandom(random);
    });
  };

  useEffect(onRandomClick, []);

  useEffect(() => {
    service('commands').then(setCommandList);
  }, []);

  const button = (<Button onClick={onRandomClick}>Random</Button>);

  const commands = Object.entries(commandList).map(([hash, name]) => {
    return <li key={hash}><Input readOnly type="text" value={hash}/> - {JSON.stringify(name)}</li>;
  });

  return (
    <div>
      <Input fluid type="text" actionPosition="left" action={button} value={random}/>
      <div>
        <Input type="text" placeholder="Head"/>
        <Input type="text" placeholder="Tail"/>
        <Button>Create</Button>
      </div>
      <div>List Commands</div>
      <ul>{commands}</ul>
    </div>
  );
}

export default Console;
