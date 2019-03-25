import axios from 'axios';

export const KitsuneService = request => {
  const service = (parts, data) => {
    if(typeof data !== 'object')
      data = JSON.stringify(data);

    return request.post(parts, data).then(response => response);
  };

  service.random = () => service('BGbYmq/iTV8cUZ7WvhoeFlTgmYyGZAlPn7amkHgy4Rk=', { // PIPE
    commandList: [
      'ijJv0As7V8Vk8kx1kL5Rm+LSDyHnfFPazUVtB/pmZiw=', // RANDOM
      '4Y/SXeyS8y1YP4n+oercdBwh+FhDmhwTDWBdOsrjmQc=', // bin to b64
    ],
  });

  return service;
};

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
export default service;
