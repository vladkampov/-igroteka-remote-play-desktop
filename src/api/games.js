import config from '../config';
import api from './';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/games`;

export const getGames = () => api(({ get }) => get(CORE_END_POINT_URL));

export const getGame = id => api(({ get }) => get(`${CORE_END_POINT_URL}/${id}`));
