import { Router, RequestHandler } from 'express';

type RouteMethod = 'get' | 'post' | 'put' | 'delete';

export type RouteConfig = {
  method: RouteMethod;
  path: string;
  handler: RequestHandler;
  middleware?: RequestHandler[];
};

export const createRouter = (routes: RouteConfig[]): Router => {
  const router = Router();

  routes.forEach(({ method, path, handler, middleware = [] }) => {
    router[method](path, ...middleware, handler);
  });

  return router;
};
