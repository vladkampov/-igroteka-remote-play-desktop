import config from '../config';
import api from './';


export const checkDemoHistory = (uid, fprint) =>
  api(({ get }) => get(`${config('CORE_API_PLUGIN')}/checkdemohistory/${uid}/${fprint}`));

export const createDemoHistory = (uid, fprint) =>
  api(({ post }) => post(`${config('CORE_API_PLUGIN')}/createDemoHistory`, { data: { uid, fprint } }));
