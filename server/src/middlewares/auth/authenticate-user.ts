import { Request, Response, NextFunction } from 'express';
import apiResponse from '@lib/api-response';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';

export type decodedToken = {
  userId: number;
};

 const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    apiResponse.unauthorized(res, null);
    return;
  }

  try {
    const decodedToken = jwt.verify(token, authConfig.secret) as decodedToken;

    (req as any).userId = decodedToken.userId;

    next();
  } catch (err) {
    console.error('authentication failed', err);
    return apiResponse.unauthorized(res, null);
  }
};

export default authenticateUser;