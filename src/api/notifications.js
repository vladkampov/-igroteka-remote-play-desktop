import config from '../config';
import api from './';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/notifications`;

export const getNotification = id => api(({ get }) => get(`${CORE_END_POINT_URL}/${id}`));

export const markNotificationReaded = id =>
  api(({ put }) => put(`${CORE_END_POINT_URL}/${id}`, { data: { readed: true } }));
