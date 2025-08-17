import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth-config';
import apiResponse from '@lib/api-response';
import refreshToken from '../refresh-token-controller';

jest.mock('jsonwebtoken');
jest.mock('@config/auth-config');

const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('resfreshing access token', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@email.ci',
        password_hash: 'hashedpass123',
      },
      cookies: {},
    } as any;

    res = mockResponse();
  });

  it('should send success and new accessToken if refreshToken present', async () => {
    req.cookies = {
      refreshToken: 'validToken',
    };

    (jwt.sign as jest.Mock).mockReturnValue('mockToken');
    await refreshToken(req as Request, res);

    expect(jwt.sign).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith(
      'accessToken',
      'mockToken',
      expect.objectContaining({ httpOnly: true, maxAge: expect.any(Number) })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      message: 'success',
      data: { message: 'access token refreshed' },
    });
  });

  it('should send unauthorized if refresh token is missing', async () => {
    await refreshToken(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      data: null,
      message: 'token missing or expired',
    });
  });
});
