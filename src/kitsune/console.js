import axios from 'axios';
import { Component } from 'react';

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
  componentDidMount() {
    service('ijJv0As7V8Vk8kx1kL5Rm+LSDyHnfFPazUVtB/pmZiw=').then(result => {
      const random = Buffer.from(result).toString('base64');
      console.log('R', random);
    });
  }

  render() {
    return 'Hello World';
  }
}

export default Console;
