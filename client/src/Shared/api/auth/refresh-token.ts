import api from '../default-api';
import { AxiosError } from 'axios';

export const refreshToken = async () => {
  try {
    await api.post('auth/refresh-token');
    return true;
  } catch (err) {
    const e = err as AxiosError;
    if (e.response?.status === 401) {
      console.log('user logged out');
      return false;
    }
    throw err;
  }
};
