import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import validateBody from '../validate-body';
import apiResponse from '@lib/api-response';

jest.mock('@lib/api-response');

describe('validateBody middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  const mockRes = (): Response => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(() => {
    req = {};
    res = mockRes();
    next = jest.fn();
    jest.clearAllMocks();
  });

  const testSchema = z.object({
    username: z.string().min(5).max(10),
    password: z.string().min(6).max(20),
  });

  it('should call next() if schema is valid', () => {
    req.body = { username: 'validUser', password: 'validPassword' };

    const middleware = validateBody(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(apiResponse.validationErrors).not.toHaveBeenCalled();
  });

  it('should return validationErrors if schema fails', () => {
    req.body = { username: 'j', password: 'short' };

    const middleware = validateBody(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(apiResponse.validationErrors).toHaveBeenCalledWith(
      expect.anything(),
      {
        username: expect.any(Array),
        password: expect.any(Array),
      }
    );
  });

  it('should return validationErrors if username is too short', () => {
    req.body = { username: 'abc', password: 'validPass123' };

    const middleware = validateBody(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(apiResponse.validationErrors).toHaveBeenCalledWith(
      expect.anything(),
      {
        username: expect.any(Array),
      }
    );
  });

  it('should return validationErrors if username is too long', () => {
    req.body = { username: 'averylongusername', password: 'validPass123' };

    const middleware = validateBody(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(apiResponse.validationErrors).toHaveBeenCalledWith(
      expect.anything(),
      {
        username: expect.any(Array),
      }
    );
  });

  it('should return validationErrors if password is too short', () => {
    req.body = { username: 'validUser', password: '123' };

    const middleware = validateBody(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(apiResponse.validationErrors).toHaveBeenCalledWith(
      expect.anything(),
      {
        password: expect.any(Array),
      }
    );
  });

  it('should return validationErrors if password is too long', () => {
    req.body = {
      username: 'validUser',
      password: 'thispasswordiswaytoolong123',
    };

    const middleware = validateBody(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(apiResponse.validationErrors).toHaveBeenCalledWith(
      expect.anything(),
      {
        password: expect.any(Array),
      }
    );
  });
});
