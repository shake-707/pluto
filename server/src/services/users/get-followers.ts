import { db } from '@config/index';
import { User } from '@config/database/schema';

const getUserFollowers = async (userId: number): Promise<Partial<User>[]> => {
  try {
    const users = await db
      .selectFrom('users')
      .leftJoin('user_follows', 'user_follows.user_id', 'id')
      .select('user_name')
      .where('user_follows.followed_user_id', '=', userId)
      .execute();

    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getUserFollowers;
