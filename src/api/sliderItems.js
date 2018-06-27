import config from '../config';
import api from './';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/slideritems`;

export const getSliderItems = () => api(({ get }) => get(CORE_END_POINT_URL));

export const getSliderItem = id => api(({ get }) => get(`${CORE_END_POINT_URL}/${id}`));
