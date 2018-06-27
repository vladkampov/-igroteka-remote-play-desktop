import config from '../config';
import api from './';

const CORE_END_POINT_URL = `${config('CORE_API_DOMAIN')}/paymenttypes`;

export const getPaymentTypes = () => api(({ get }) => get(CORE_END_POINT_URL));

export const getPaymentType = id => api(({ get }) => get(`${CORE_END_POINT_URL}/${id}`));
