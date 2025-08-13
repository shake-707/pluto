import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';


import { register } from './utils/auth-schema';
import apiResponse from '@lib/api-response';
import { UserServices } from '@services/index';

const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      email,
      passwordConfirmation,
    } = req.body as z.infer<typeof register>;

    const emailExists = await UserServices.getUser('email', email);
    if (emailExists) {
      
      apiResponse.badRequest(res, null, 'email already exists');
      return;
    }

    const userNameExists = await UserServices.getUser('user_name', username);
    if (userNameExists) {
      apiResponse.badRequest(res, null, 'username already exists');
      return;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = {
      user_name: username,
      email: email,
      password_hash: hashPassword,
    };
    console.log('new user: ', newUser);

    await UserServices.insertUser({
      user_name: username,
      email: email,
      password_hash: hashPassword,
    });


    apiResponse.created(res, {}, 'successful registration');
  } catch (err) {
    console.error('error with registering', err);
    apiResponse.error(res, err, 'error with registering');
  }
};

export default registerUser;
