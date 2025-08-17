import { db } from '@config/index';
import type { NewFollow } from '@config/database/schema';

const followUser = async (followData: NewFollow) => {
  try {
    await db.insertInto('user_follows').values({
      user_id: followData.user_id,
      followed_user_id: followData.followed_user_id,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default followUser;