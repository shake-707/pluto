import { UserServices } from '@services/index';
import { AuthController } from '@controllers/index';
import { Request, Response } from 'express';
import apiResponse from '@lib/api-response';

// skip db call
jest.mock('@config/index', () => {
  return {};
});

jest.mock('@services/users');

describe('registering a user', () => {
  let mockRequest: Partial<Request>;
  let res: Response;

  const mockResponse = (): Response => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
    };

    res = mockResponse();
  });
  it('should send bad requst if email already in database', async () => {
    mockRequest.body = {
      username: 'testuser',
      email: 'used@email.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const user = mockRequest.body;

    (UserServices.insertUser as jest.Mock).mockRejectedValue(
      new Error('Email already exists')
    );
    (UserServices.getUser as jest.Mock).mockImplementation((field, value) => {
      if (field === 'email' && value === 'used@email.com') {
        return Promise.resolve({ id: 1, email: value });
      }
      return Promise.resolve(null);
    });

    await AuthController.registerUser(mockRequest as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: 'email already exists',
      data: null,
    });
    expect(UserServices.insertUser).not.toHaveBeenCalled();
  });

  it('should send a bad request if username already in database', async () => {
    mockRequest.body = {
      username: 'testuser',
      email: 'used@email.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    (UserServices.getUser as jest.Mock).mockImplementation((field, value) => {
      if (field === 'user_name' && value === 'testuser') {
        return Promise.resolve({ id: 1, username: value });
      }
      return Promise.resolve(null);
    });

    await AuthController.registerUser(mockRequest as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: 'username already exists',
      data: null,
    });

    expect(UserServices.insertUser).not.toHaveBeenCalled();
  });

  it('should send success if user registered if unique username and email', async () => {
    mockRequest.body = {
      username: 'uniqueUser',
      email: 'unique@email.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    (UserServices.getUser as jest.Mock).mockResolvedValue(null);

    (UserServices.insertUser as jest.Mock).mockResolvedValue({});

    await AuthController.registerUser(mockRequest as Request, res as Response);

    expect(UserServices.insertUser).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      data: {},
      message: 'successful registration',
    });
  });
});
