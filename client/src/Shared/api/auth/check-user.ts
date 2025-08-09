import api from '../default-api';
import type { AxiosError } from 'axios';
import { refreshToken } from './refresh-token';

export const checkCurrentUser = async () => {
  try {
    const res = await api.get('/user/current-user');
    return res.data.data;
  } catch (err) {
    const e = err as AxiosError;
    if (e.response?.status === 401) {
      const checkRefresh = await refreshToken();
      if (!checkRefresh) {
        return null;
      }
      const res = await api.get('/user/current-user');
      return res.data.data;
    }
    throw err;
  }
};
