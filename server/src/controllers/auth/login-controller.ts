import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';
import { login } from './utils/auth-schema';
import apiResponse from '@lib/api-response';
import { UserServices } from '@services/index';
const MINS_15 = 15 * 60 * 1000;
const HRS_24 = 24 * 60 * 60 * 1000;

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body as z.infer<
      typeof login
    >;

    const user = await UserServices.getUser('user_name', username);
    console.log(user);

    if (!user) {
      apiResponse.notFound(res, null, 'invalid username');
      return;
    }

    const is_valid_password = await bcrypt.compare(
      password,
      user.password_hash as string
    );

    if (!is_valid_password) {
      apiResponse.notFound(res, null, 'invalid password');
      return;
    }

    const access_token = jwt.sign(
      { userId: user.id, user_name: user.user_name, email: user.email },
      authConfig.secret,
      {
        expiresIn: authConfig.secret_expires_in as any,
      }
    );

    const refressToken = jwt.sign(
      { userId: user.id, user_name: user.user_name, email: user.email },
      authConfig.refresh_secret,
      {
        expiresIn: authConfig.refresh_secret_expires_in as any,
      }
    );

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      maxAge: MINS_15,
      sameSite: 'strict',
    });

    res.cookie('refreshToken', refressToken, {
      httpOnly: true,
      maxAge: HRS_24,
      sameSite: 'strict',
    });

    const { password_hash, ...safeUser } = user;
    apiResponse.success(res, safeUser);
    return;
  } catch (err) {
    console.error('login failed', err);
    apiResponse.error(res, err);
  }
};

export default loginController;
