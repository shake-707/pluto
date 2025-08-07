import db from '@config/db-config';
import type { BookData } from './types';

export const getBooks = async (): Promise<BookData[]> => {
  try {
    const sql = `SELECT b.title, STRING_AGG(a.name, ', ') AS authors, b.year_released,
        b.cover_id, b.key AS book_key
        FROM books b
        LEFT JOIN books_authors_join ba ON b.key = ba.book_key
        LEFT JOIN book_authors a ON ba.author_key = a.key
        GROUP BY b.key, b.title, b.year_released, b.cover_id;`;
    const data = db.any<BookData>(sql);

    return data;
  } catch (err) {
    throw err;
  }
};
