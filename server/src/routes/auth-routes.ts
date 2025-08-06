import { AuthController } from '@controllers/index';
import { createRouter, RouteConfig } from './index';
import { AuthMiddleware, ValidationsMiddleware } from '@middlewares/index';

const routes: RouteConfig[] = [
  {
    method: 'post',
    path: '/login',
    // check if request body has valid login inputs
    middleware: [ValidationsMiddleware.validateBody(AuthController.AuthSchema.login)],
    handler: AuthController.loginUser,
  },
  {
    method: 'post',
    path: '/register',
    //check if request body has valid registration inputs
    middleware: [ValidationsMiddleware.validateBody(AuthController.AuthSchema.register)],
    handler: AuthController.registerUser,
  },
  {
    method: 'post',
    path: '/logout',
    // check if user is logged in
    middleware: [AuthMiddleware.authenticateUser],
    handler: AuthController.logoutUser,
  },
  {
    method: 'post',
    path: '/refresh-token',
    // check if user has refresh token
    middleware: [AuthMiddleware.refreshTokenValidation],
    handler: AuthController.refreshToken,
  },
];

export const AuthRouter = createRouter(routes);
