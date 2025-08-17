import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/get-books';
import type { bookData } from '../types';
export const booksQuery = () => {
  return useQuery<bookData[]>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
};
