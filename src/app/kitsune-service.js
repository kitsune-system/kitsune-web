import axios from 'axios';

const RANDOM = '456f47d1ebec9fdbf64cf941dd399c36c06e24e71014a08cd6dd67ca03d44966';
const TO_HEX = 'ea961077cb5326469431eedf200ebbb44b713ab5b866e338d79275a243cdf7a4';
const WRITE_STRING = 'fc9b664949f9da76c96475cd50578b8755070a060923bafe2e4fe2252275dbb1';

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

  const post = (parts, data) => request.post(path(parts), data);

  const random = () => post([RANDOM, TO_HEX]);
  const writeString = str => post([WRITE_STRING, TO_HEX], str);

  return {
    random,
    writeString
  };
};

export default KitsuneService;
