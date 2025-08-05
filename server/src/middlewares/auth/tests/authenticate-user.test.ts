import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import apiResponse from '@lib/api-response';
import refreshTokenValidation from '../refreshToken-validation';


jest.mock('jsonwebtoken');
jest.mock('@lib/api-response');

describe('refreshTokenValidation middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if refresh token is missing', () => {
    refreshTokenValidation(req as Request, res as Response, next);

    expect(apiResponse.unauthorized).toHaveBeenCalledWith(
      res,
      { message: 'No refresh token provided' }
    );
    expect(next).not.toHaveBeenCalled();
  });


  it('should decode token, set userId in req and call next()', () => {
    const userId = 42;
    req.cookies = { refreshToken: 'valid-token' };

    (jwt.verify as jest.Mock).mockReturnValue({ userId });

    refreshTokenValidation(req as Request, res as Response, next);

    expect((req as any).userId).toBe(userId);
    expect(next).toHaveBeenCalled();
    expect(apiResponse.unauthorized).not.toHaveBeenCalled();
  });
});
