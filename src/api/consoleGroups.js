import config from '../config';
import api from './';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/consolegroups`;

export const getConsoleGroups = () => api(({ get }) => get(CORE_END_POINT_URL));

export const getConsoleGroup = id => api(({ get }) => get(`${CORE_END_POINT_URL}/${id}`));
