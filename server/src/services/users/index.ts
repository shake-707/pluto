// export {default as getUser} from './get-user';
// export {default as insertUser} from './insert-new-user';
import getUser from './get-user';
import insertUser from './insert-new-user';
import getUserFollowers from './get-followers';

export default {
  getUser,
  insertUser,
  getUserFollowers
};
