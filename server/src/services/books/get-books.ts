import { db } from '@config/index';

export const getBooks = async () => {
  try {
    const books = await db.selectFrom('books').selectAll().execute();
    return books;
  } catch (err) {
    throw err;
  }
};
