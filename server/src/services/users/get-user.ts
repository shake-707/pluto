//import db from '@config/db-config';
import { UserDBData } from './types';
import { UsersTable, User } from '@config/database/schema';
import { db } from '@config/index';
const getUser = async (
  column: 'email' | 'user_name' | 'id',
  value: string
): Promise<Partial<User>> => {
  try {
    // const SQL = `
    //     SELECT id, user_name, email, password_hash
    //     FROM users
    //     WHERE ${column} = $1
    //     `;
    // const user = await db.oneOrNone<UserDBData>(SQL, [value]);
    const user = await db
      .selectFrom('users')
      .select(['id', 'user_name', 'password_hash', 'email'])
      .where(column, '=', value) // can use dynamic column from the function parameter
      .executeTakeFirst() as Partial<User>;

    // if (!user) {
    //   throw new Error();
    // }
    return user;
  } catch (err) {
    throw err;
  }
};

export default getUser;
