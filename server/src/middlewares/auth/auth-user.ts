import { Request, Response, NextFunction } from 'express';
import apiResponse from '@lib/api-response';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';

export type decodedToken = {
  userId: number;
  user_name: string;
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    apiResponse.unauthorized(res, null);
    return;
  }

  try {
    const decoded_token = jwt.verify(token, authConfig.secret);
    const {iat, exp, ...user} = decoded_token as jwt.JwtPayload;
    (req as any).user = user;

    next();
  } catch (err) {
    console.error('authentication failed', err);
    return apiResponse.unauthorized(res, null);
  }
};

export default authenticateUser;
