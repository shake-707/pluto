import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';
import apiResponse from '@lib/api-response';
const MINS_15 = 15 * 60 * 1000;
const HRS_24 = 24 * 60 * 60 * 1000;

const refreshToken = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const refresh_token = req.cookies.refreshToken;

    if (!refresh_token) {
      apiResponse.unauthorized(res, null, 'token missing or expired');
      return;
    }

    const new_access_token = await jwt.sign({ user: user.id, user_name: user.user_name, email: user.email  }, authConfig.secret, {
      expiresIn: authConfig.secret_expires_in as any,
    });

    res.cookie('accessToken', new_access_token, {
      httpOnly: true,
      maxAge: MINS_15,
      sameSite: 'strict',
    });

    apiResponse.success(res, { message: 'access token refreshed' });
    return;
  } catch (err) {
    console.error('refresh token failed', err);
    apiResponse.error(res, null, 'failed to refresh token');
  }
};

export default refreshToken;
