import { Request, Response } from 'express';
import apiResponse from '@lib/api-response';

const getCurrentUserController = async (req: Request, res: Response) => {
  try {
    const current_user = (req as any).user;
    console.log('current user',current_user);

    apiResponse.success(res, current_user);
  } catch (err) {
    console.log('error getting user', err);
    throw err;
  }
};

export default getCurrentUserController;
