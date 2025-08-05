import { Response } from 'express';

const success = (res: Response, data: any, message = 'success') => {
  res.status(200).json({
    ok: true,
    message,
    data,
  });
  return;
};

const error = (res: Response, data: any, message = 'error') => {
  res.status(500).json({
    ok: false,
    message,
    data,
  });
  return;
};

const notFound = (res: Response, data: any, message = 'not found') => {
  res.status(404).json({
    ok: true,
    message,
    data,
  });
  return;
};

const unauthorized = (res: Response, data: any, message = 'unathorized') => {
  res.status(401).json({
    ok: true,
    message,
    data,
  });
  return;
};

const badRequest = (res: Response, data: any, message = 'Bad request') => {
  res.status(400).json({
    ok: false,
    message,
    data,
  });
  return;
};

const created = (res: Response, data: any, message = 'created') => {
  res.status(201).json({
    ok: true,
    message,
    data,
  });
  return;
};

const validationErrors = (res: Response, errors: Record<string, string[]>) => {
  res.status(422).json({
    ok: false,
    message: 'Validation Error',
    errors,
  });
};

export default {
  success,
  error,
  notFound,
  unauthorized,
  badRequest,
  created,
  validationErrors,
};
