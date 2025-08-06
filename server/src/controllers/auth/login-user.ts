import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';
import { login } from './utils/auth-schema';
import { loginRequestData } from './utils/auth-types';
import { getUser } from '@services/users';
import apiResponse from '@lib/api-response';

const MINS_15 = 15 * 60 * 1000;
const HRS_24 = 24 * 60 * 60 * 1000;

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: loginRequestData = req.body as z.infer<
      typeof login
    >;

    const user = await getUser('user_name', username);

    if (!user) {
      apiResponse.notFound(res, null, 'invalid username');
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      apiResponse.notFound(res, null, 'invalid password');
      return;
    }

    const accessToken = jwt.sign({ userId: user.id }, authConfig.secret, {
      expiresIn: authConfig.secret_expires_in as any,
    });


    const refressToken = jwt.sign({ userId: user.id }, authConfig.secret, {
      expiresIn: authConfig.refresh_secret_expires_in as any,
    });

    res.cookie('accessToken', accessToken, {
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

export default loginUser;
