import api from './default-api';

export const logoutUser = (): Promise<void> => {
  return api
    .post('/auth/logout')
    .then((response) => response.data)
    .catch((err) => {
      console.log('error logging out', err);
      throw err;
    });
};
