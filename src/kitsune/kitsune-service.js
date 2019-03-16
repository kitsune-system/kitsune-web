const KitsuneService = request => {
  return (parts, data) => {
    if(typeof data !== 'object')
      data = JSON.stringify(data);

    return request.post(parts, data).then(response => response);
  };
};

export default KitsuneService;
