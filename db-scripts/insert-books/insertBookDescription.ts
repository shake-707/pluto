import db from '../config/db_connection';

export const insertBooksDescriptionDB = async () => {
  try {
    const booksSQL = `SELECT key
    FROM books`;

    const bookKeys = await db.any(booksSQL);

    for (const { key } of bookKeys) {
      const descriptionData = await fetch(`https://openlibrary.org${key}.json`);
      const descObject = await descriptionData.json();
      //const description = descriptionString.description.split(/\r?\n/)[0];
      let description: string | null = null;

      if (typeof descObject.description === 'string') {
        description = descObject.description.split(/\r?\n/)[0];
      } else if (
        descObject.description &&
        typeof descObject.description === 'object' &&
        'value' in descObject.description
      ) {
        description = descObject.description.value.split(/\r?\n/)[0];
      } else {
        description = null;
      }

      const SQL = `
        UPDATE books
        SET description = $1
        WHERE key = $2`;

      await db.none(SQL, [description, key]);
    }
  } catch (err) {
    throw err;
  }
};
