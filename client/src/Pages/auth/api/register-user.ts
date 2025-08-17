import api from '@/Shared/api/default-api';
import type { RegisterInputs } from '../ui/register-form';

export const postRegisterUser = (reqData: RegisterInputs): Promise<void> => {
  return api
    .post('auth/register', reqData)
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
