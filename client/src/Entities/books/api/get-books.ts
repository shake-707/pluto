import api from '@/Shared/api/default-api';
import type { ApiResponseObject } from '@/Shared/types/types';

export const fetchBooks = async () => {
  try {
    const books : ApiResponseObject = await api
      .get('/books')
      .then((response) => {
        
        return response.data;
      });
      console.log(books.data);

    if (!books.ok) {
      throw new Error(`${books.data}`);
    }

    return books.data;
  } catch (err) {
    console.error('error retriecving books', err);
    throw err;
  }
};


