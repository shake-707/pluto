import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import apiResponse from '@lib/api-response';
import refreshTokenValidation from '../check-refresh-token';

jest.mock('jsonwebtoken');
jest.mock('@lib/api-response');

describe('refreshTokenValidation middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      user: {},
      cookies: {},
    } as any;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if refresh token is missing', () => {
    refreshTokenValidation(req as Request, res as Response, next);

    expect(apiResponse.unauthorized).toHaveBeenCalledWith(res, {
      message: 'No refresh token provided',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should decode token, set userId in req and call next()', () => {
    req.cookies = { refreshToken: 'valid-token' };
    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@email.com',
      password_hash: 'hashedpass123',
    };
    (jwt.verify as jest.Mock).mockReturnValue(user);
    refreshTokenValidation(req as Request, res as Response, next);

    expect((req as any).user).toBe(user);
    expect(next).toHaveBeenCalled();
    expect(apiResponse.unauthorized).not.toHaveBeenCalled();
  });
});
