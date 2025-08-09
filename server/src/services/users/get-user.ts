import db from '@config/db-config';
import { UserDBData } from './types';

const getUser = async (
  column: 'email' | 'user_name' | 'id',
  value: string
): Promise<UserDBData> => {
  try {
    const SQL = `
        SELECT id, user_name, email, password_hash
        FROM users
        WHERE ${column} = $1
        `;
    const user = await db.oneOrNone<UserDBData>(SQL, [value]);

    if (!user) {
      throw new Error();
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export default getUser;
