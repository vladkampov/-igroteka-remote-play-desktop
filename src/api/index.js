import axios from 'axios';
import pick from 'lodash.pick';
import { localStorage } from '../utils';

let axiosInstance = axios.create();

export const updateApi = config => { axiosInstance = axios.create(config); };

export const makeRequest = (method, url, options = {}) => {
  const { data, params } = options;
  const headers = { ...axiosInstance.defaults.headers, ...options.headers };

  return axiosInstance({ method, url, data, params, headers })
    .then(response => pick(response, ['data', 'status']));
};

export const get = (url, config) => makeRequest('get', url, config);
export const post = (url, config) => makeRequest('post', url, config);
export const put = (url, config) => makeRequest('put', url, config);
export const patch = (url, config) => makeRequest('patch', url, config);
export const del = (url, config) => makeRequest('delete', url, config);
export const requestHandlers = { get, post, put, patch, del };


export default cb => cb(requestHandlers)
  .then(response => pick(response, ['data', 'status']))
  .catch(error => {
    if (error.error) {
      switch (error.status) {
        case 401:
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.reload();
          break;
        case 403:
          window.location.href = '/not-authorized';
          break;
        default:
          break;
      }
    }

    return error.response ?
      Promise.reject({ error: true, ...pick(error.response, ['data', 'status']) }) :
      Promise.reject({ error: error.message });
  });
