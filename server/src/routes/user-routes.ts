import { createRouter, RouteConfig } from './index';
import { UserController } from '@controllers/index';
import { AuthMiddleware } from '@middlewares/index';

const routes: RouteConfig[] = [
  {
    method: 'get',
    path: '/current-user',
    middleware: [AuthMiddleware.authenticateUser],
    handler: UserController.getCurrentUserController,
  },
];

export const UserRouter = createRouter(routes);
