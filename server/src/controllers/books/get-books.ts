import { getBooks } from '@services/books/get-books';
import { Request, Response } from 'express';
import apiResponse from '@lib/api-response';

const fetchBooks = async (req: Request, res: Response) => {
  try {
    // const booksData = await getBooks();
   const booksData = await getBooks();
   console.log('data from books', booksData);
    apiResponse.success(res, booksData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default fetchBooks;
