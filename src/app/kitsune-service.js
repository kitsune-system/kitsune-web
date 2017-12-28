import axios from 'axios';

const WRITE_STRING = 'fc9b664949f9da76c96475cd50578b8755070a060923bafe2e4fe2252275dbb1';
const TO_HEX = 'ea961077cb5326469431eedf200ebbb44b713ab5b866e338d79275a243cdf7a4';

const path = parts => {
  return parts.join('/');
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

const KitsuneService = baseURL => {
  const request = buildAxios(baseURL);

  const post = (parts, data) => {
    return request.post(path(parts), data);
  };

  const writeString = str => {
    return post([WRITE_STRING, TO_HEX], str);
  };

  return {
    writeString
  };
};

export default KitsuneService;
