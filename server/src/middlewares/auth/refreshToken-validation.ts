import { Request, Response, NextFunction } from 'express';
import apiResponse from '@lib/api-response';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';
import { decodedToken } from './authenticate-user';

const refresTokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    apiResponse.unauthorized(res, { message: 'No refresh token provided' });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      authConfig.refresh_secret
    ) as decodedToken;

    (req as any).userId = decodedToken.userId;

    next();
  } catch (err) {
    console.error('refresh token validation failed', err);
    apiResponse.unauthorized(res, {
      message: 'invalid or expired refresh token',
    });
    return;
  }
};

export default refresTokenValidation;