import api from './default-api';

export const fetchLogoutUser = (): Promise<void> => {
  return api
    .post('/auth/logout')
    .then((response) => {
      response.data;
      window.location.href = '/';
    })
    .catch((err) => {
      console.log('error logging out', err);
      throw err;
    });
};
