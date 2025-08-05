import { Request, Response } from 'express';
import { getUser } from '@services/users';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';
import { strict } from 'assert';
import apiResponse from '@lib/api-response';
const MINS_15 = 15 * 60 * 1000;
const HRS_24 = 24 * 60 * 60 * 1000;

const refreshToken = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      apiResponse.unauthorized(res, null, 'token missing or expired');
      return;
    }

    const newAccessToken = jwt.sign({ userId: userId }, authConfig.secret, {
      expiresIn: authConfig.secret_expires_in as any,
    });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      maxAge: MINS_15,
      sameSite: 'strict',
    });

    apiResponse.success(res, { messgae: 'access token refreshed' });
    return;
  } catch (err) {
    console.error('refresh token failed', err);
    apiResponse.error(res, null, 'failed to refresh token');
  }
};

export default refreshToken;
