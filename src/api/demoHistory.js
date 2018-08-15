import config from '../config';
import api from './';


export const checkDemoHistory = () => api(({ get }) => get(`${config('CORE_API_PLUGIN')}/checkDemoHistory`));

export const createDemoHistory = data =>
  api(({ post }) => post(`${config('CORE_API_PLUGIN')}/checkDemoHistory`, data));
