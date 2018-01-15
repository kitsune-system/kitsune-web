import axios from 'axios';

import KitsuneService from '../services/kitsune-service';

import { kitsuneServiceUrl } from '../config';

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

const request = buildAxios(kitsuneServiceUrl);

const kitsuneService = KitsuneService(request);
export default kitsuneService;
