import {  User } from '@config/database/schema';
import { db } from '@config/index';
const getUser = async (
  column: 'email' | 'user_name' | 'id',
  value: string
): Promise<Partial<User>> => {
  try {
    
    const user = await db
      .selectFrom('users')
      .select(['id', 'user_name', 'password_hash', 'email'])
      .where(column, '=', value) // can use dynamic column from the function parameter
      .executeTakeFirst() as Partial<User>;

    return user;
  } catch (err) {
    throw err;
  }
};

export default getUser;
