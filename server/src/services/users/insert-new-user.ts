//import db from '@config/db-config';
import { db } from '@config/index';
import { NewUser } from '@config/database/schema';

const insertUser = async (
  user: NewUser
) => {
  try {
    await db.insertInto('users').values(user).execute();
  } catch (err) {
    console.error('error inserting new user', err);
    throw err;
  }
};

export default insertUser;