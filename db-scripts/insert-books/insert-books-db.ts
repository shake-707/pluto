import db from '../config/db_connection';
export type booksInsertData = {
  key: string;
  title: string;
  cover_id?: number;
  year_released?: number;
};

export const insertBookDB = async ({
  key,
  title,
  cover_id,
  year_released,
}: booksInsertData): Promise<string> => {
  try {
    const SQL = `INSERT INTO books (key, title,cover_id,year_released)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (key) DO NOTHING
        RETURNING title`;

    const result = await db.oneOrNone(SQL,[key,title,cover_id,year_released]);
    if (!result) {
        console.log(`skipped: ${title} already in books table`);
    } else {
        console.log(`succes: ${result.title} insert into books table`);
    }
    return 'books data added to db';
  } catch (err) {
    throw err;
  }
};
