import apiResponse from '@lib/api-response';
import { Request, Response } from 'express';

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    if (userId) {
      // may need to add refresh token to db
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    apiResponse.success(res, null, 'user logged out');
    return;
  } catch (err) {
    console.error('logout failed', err);
    apiResponse.error(res, null, 'logout failed');
    return;
  }
};

export default logoutUser;