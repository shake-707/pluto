import { Request, Response } from 'express';
import type { UserDBData } from '@services/users/types';
import db from '@config/db-config';
import { getUser } from '@services/users';
import apiResponse from '@lib/api-response';

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    console.log(currentUser);

    apiResponse.success(res, currentUser);
  } catch (err) {
    console.log('error getting user', err);
    throw err;
  }
};

export default getCurrentUser;
