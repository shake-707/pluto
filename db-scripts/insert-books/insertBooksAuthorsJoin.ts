import db from '../config/db_connection';

export type booksAuthorsJoinData = {
  author_key: string;
  book_key: string;
};

export const insertBooksAuthorsJoinDB = async ({
  author_key,
  book_key,
}: booksAuthorsJoinData) => {
  try {
    const SQL = `INSERT INTO books_authors_join(author_key, book_key)
        VALUES ($1, $2)
        ON CONFLICT (author_key, book_key)
        DO NOTHING`;

    await db.none(SQL, [author_key, book_key]);
  } catch (err) {
    throw err;
  }
};
