import apiResponse from '@lib/api-response';
import { Response, Request, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors: Record<string, string[]> = {};

        err.issues.forEach((err) => {
          const field = err.path.join('.');
          if (!formattedErrors[field]) {
            formattedErrors[field] = [];
          }
          formattedErrors[field].push(err.message);
        });

        apiResponse.validationErrors(res, formattedErrors);
        return;
      }
      apiResponse.error(res, 'invalid request data');
      return;
    }
  };
};

export default validateBody