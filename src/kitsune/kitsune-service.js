const KitsuneService = request => {
  const post = (parts, data) => request.post(parts, data)
    .then(response => response);

  const service = (node, data) => post(node, data);
  return service;
};

export default KitsuneService;
