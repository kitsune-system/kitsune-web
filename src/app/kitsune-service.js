import axios from 'axios';

import KitsuneService from '../services/kitsune-service';

import { kitsuneUrl } from 'env/config';

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

const request = buildAxios(kitsuneUrl);

const kitsuneService = KitsuneService(request);
export default kitsuneService;
