import { Request, Response } from 'express';
import { UserServices } from '@services/index';
import apiResponse from '@lib/api-response';
const getUserFollowersController = async (req: Request, res: Response) => {
  try {
    const { userId }= req.body;
    const users = await UserServices.getUserFollowers(userId);
    apiResponse.success(res, users);
  } catch (err) {
    console.error('error with getting user followers', err);
    apiResponse.error(res, err, 'error getting user followers');
  }
};

export default getUserFollowersController;
