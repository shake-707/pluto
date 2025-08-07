import api from '../../../Shared/api/default-api';
import type { User } from '../../../Shared/types/types';
import type { LoginInput } from '../ui/login-form';

export const fetchLoginUser = (reqData: LoginInput): Promise<User> => {
  return api
    .post('/auth/login', reqData)
    .then((response) => response.data)
    .catch((err) => {
      console.error('error logging in', err);
      throw err;
    });
};
