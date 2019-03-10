import axios from 'axios';
import React, { Component } from 'react';
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

// TODO: Use hooks
class Console extends Component {
  state = { value: '' };

  componentDidMount() {
    this.onRandomClick();
  }

  onRandomClick = () => {
    service('ijJv0As7V8Vk8kx1kL5Rm+LSDyHnfFPazUVtB/pmZiw=').then(result => {
      const random = Buffer.from(result).toString('base64');
      console.log('R', random);
      this.setState({ value: random });
    });
  };

  render() {
    const { value } = this.state;
    const button = (<Button onClick={this.onRandomClick}>Random</Button>);

    return (
      <Input fluid type="text" actionPosition="left" action={button} value={value}/>
    );
  }
}

export default Console;
