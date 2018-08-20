import config from '../config';
import api from './';


export default () =>
  api(({ get }) => get(`${config('CORE_API_PLUGIN')}/version/${config('CLIENT_VERSION')}`));
