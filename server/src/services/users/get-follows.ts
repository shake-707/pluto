import { db } from '@config/index';
import { User } from '@config/database/schema';
const getUserFollows = async (userId: number): Promise<Partial<User>[]> => {
  try {
    const users = await db
      .selectFrom('users')
      .leftJoin('user_follows','user_follows.user_id', 'users.id')
      .select('user_name')
      .where('user_follows.followed_user_id', '=', userId)
      .execute();

    return users;
  } catch (err) {
    throw err;
  }
};
