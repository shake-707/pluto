import loginUser from './login-controller';
import refreshToken from './refresh-token-controller';
import logoutUser from './logout-controller';
import registerUser from './register-controller';
import * as AuthSchema from './utils/auth-schema';

export default {
  loginUser,
  refreshToken,
  logoutUser,
  registerUser,
  AuthSchema,
};
