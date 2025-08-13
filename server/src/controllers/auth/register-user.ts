import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';

import { registerRequestData } from './utils/auth-types';
import { register } from './utils/auth-schema';
import { insertUser } from '@services/users';
import { getUser } from '@services/users';
import apiResponse from '@lib/api-response';
import { NewUser } from '@config/database/schema';

const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      email,
      passwordConfirmation,
    }: registerRequestData = req.body as z.infer<typeof register>;

    const emailExists = await getUser('email', email);
    if (emailExists) {
      //   res.status(400).send('email already exists');
      apiResponse.badRequest(res, null, 'email already exists');
      return;
    }

    const userNameExists = await getUser('user_name', username);
    if (userNameExists) {
      //   res.status(400).send('username already exists');
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
    
    await insertUser({
      user_name: username,
      email: email,
      password_hash: hashPassword,
    });

    // res.status(200).send('successful registration');
    apiResponse.created(res, {}, 'successful registration');
  } catch (err) {
    console.error('error with registering', err);
    // res.status(501).send(err);
    apiResponse.error(res, err, 'error with registering');
  }
};

export default registerUser;
