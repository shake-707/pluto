import { Request, Response } from 'express';
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
