import db from '@config/db-config';

const insertUser = async (
  username: string,
  email: string,
  passwordHash: string
): Promise<void> => {
  try {
    const sql = `INSERT INTO users (user_name, email, password_hash)
        VALUES ($1, $2, $3)`;

    await db.none(sql, [username, email, passwordHash]);
  } catch (err) {
    console.error('error inserting new user', err);
    throw err;
  }
};

export default insertUser;