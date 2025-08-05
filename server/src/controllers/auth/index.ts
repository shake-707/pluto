import loginUser from './login-user';
import refreshToken from './refresh-token';
import logoutUser from './logout-user';
import registerUser from './register-user';
import * as AuthSchema from './utils/auth-schema';

export default {
  loginUser,
  refreshToken,
  logoutUser,
  registerUser,
  AuthSchema,
};
