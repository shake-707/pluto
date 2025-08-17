import { db } from '@config/index';
import { sql } from 'kysely';
import type { bookData } from './books.types';
const getBooks = async (): Promise<bookData[]> => {
  try {
    const books: bookData[] = await db
      .selectFrom('books')
      .leftJoin('books_authors_join as ba_j', 'ba_j.book_key', 'books.key')
      .leftJoin('book_authors as ba', 'ba.key', 'ba_j.author_key')
      .selectAll('books')
      .select(() => sql<string[]>`array_agg(ba.name)`.as('authors'))
      .groupBy('books.key')
      .execute();
    return books;
  } catch (err) {
    throw err;
  }
};

export default getBooks;
