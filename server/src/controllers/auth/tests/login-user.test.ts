import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserServices } from '@services/index';
import loginUser from '@controllers/auth/login-user';


jest.mock('@services/index');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('@config/index', () => {
  return {};
});

// mock Express response
const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('login user controller', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        password: 'password123',
      },
    };

    res = mockResponse();

    // Clear all previous mock calls
    jest.clearAllMocks();
  });

  it('should return 200 and set cookies on successful login', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password_hash: 'hashedpass123',
    };

    (UserServices.getUser as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    await loginUser(req as Request, res);

    // Validate password hash
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpass123');

    // Validate tokens are generated
    expect(jwt.sign).toHaveBeenCalledTimes(2);

    // Validate cookies are set
    expect(res.cookie).toHaveBeenCalledWith(
      'accessToken',
      'mockToken',
      expect.objectContaining({ httpOnly: true, maxAge: expect.any(Number) })
    );
    expect(res.cookie).toHaveBeenCalledWith(
      'refreshToken',
      'mockToken',
      expect.objectContaining({ httpOnly: true, maxAge: expect.any(Number) })
    );

    // Validate response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      message: 'success',
      data: {
        id: 1,
        username: 'testuser',
      },
    });
  });

  it('should return 404 if username is invalid', async () => {
    (UserServices.getUser as jest.Mock).mockResolvedValue(null);

    await loginUser(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      message: 'invalid username',
      data: null,
    });
  });

  it('should return 404 if password is invalid', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password_hash: 'hashedpass123',
    };

    (UserServices.getUser as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await loginUser(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      message: 'invalid password',
      data: null,
    });
  });
});
