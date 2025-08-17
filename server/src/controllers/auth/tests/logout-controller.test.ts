import { Request, Response } from 'express';
import logoutUser from '../logout-controller';

const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('logging out a user', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {};
    res = mockResponse();
  });

  it('should send success response if properly logged out', async () => {
    await logoutUser(req as Request, res); // ✅ Call before assertions

    // Validate cookies cleared
    expect(res.clearCookie).toHaveBeenCalledWith('accessToken');
    expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');

    //   Validate response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      data: null,
      message: 'user logged out',
    });
  });
});
