import config from '../config';
import api from './';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/consoles`;

export const getConsoles = () => api(({ get }) => get(CORE_END_POINT_URL));

export const getConsole = id => api(({ get }) => get(`${CORE_END_POINT_URL}/${id}`));
