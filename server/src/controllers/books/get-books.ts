import { Request, Response } from 'express';
import apiResponse from '@lib/api-response';
import { BookServices } from '@services/index';

const fetchBooks = async (req: Request, res: Response) => {
  try {
    const booksData = await BookServices.getBooks();
    apiResponse.success(res, booksData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default fetchBooks;
