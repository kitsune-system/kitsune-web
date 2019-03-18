const KitsuneService = request => {
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

export default KitsuneService;
