import db from '../config/db_connection';

export type bookAuthorData = {
  key: string;
  name: string;
};

export const insertBooksAuthorsDB = async ({ key, name }: bookAuthorData) => {
  try {
    const SQL = `INSERT INTO book_authors (key, name)
    VALUES ($1, $2) 
    ON CONFLICT (key) DO NOTHING
    RETURNING name`;

    const result = await db.oneOrNone(SQL, [key, name]);

    if (result) {
      console.log(`success: inserted ${result.name} into book authors table`);
    } else {
      console.log(`failed: ${name} already in book authors table`);
    }
  } catch (err) {
    throw err;
  }
};
