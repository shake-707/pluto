import api from '../default-api';
import type { AxiosError } from 'axios';
import { fetchRefreshToken} from './fetch-refresh-token';

export type CurrentUser = {
  id: number;
  user_name: string;
  email: string;
};

export const fetchCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const res = await api.get('/user/current-user');
    return res.data.data;
  } catch (err) {
    const e = err as AxiosError;
    if (e.response?.status === 401) {
      const checkRefresh = await fetchRefreshToken();
      if (!checkRefresh) {
        return null;
      }
      const res = await api.get('/user/current-user');
      return res.data.data;
    }
    throw err;
  }
};
