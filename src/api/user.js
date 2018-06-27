import config from '../config';
import api from './';

const CORE_END_POINT_AUTH_URL = `${config('CORE_API_DOMAIN')}/auth`;
const CORE_END_POINT_USER_URL = `${config('CORE_API_DOMAIN')}/user`;


export const login = data =>
  api(({ post }) => post(`${CORE_END_POINT_AUTH_URL}/local`, { data }));

export const register = data =>
  api(({ post }) => post(`${CORE_END_POINT_AUTH_URL}/local/register`, { data }));

export const recoverPassword = data =>
  api(({ post }) => post(`${CORE_END_POINT_AUTH_URL}/forgot-password`, { data }));

export const resetPassword = data =>
  api(({ post }) => post(`${CORE_END_POINT_AUTH_URL}/reset-password`, { data }));

export const getUser = () =>
  api(({ get }) => get(`${CORE_END_POINT_USER_URL}/me`));

export const updateUser = (id, data) =>
  api(({ put }) => put(`${CORE_END_POINT_USER_URL}/${id}`, {
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  }));

export const deleteUser = id =>
  api(({ del }) => del(`${CORE_END_POINT_USER_URL}/${id}`));
