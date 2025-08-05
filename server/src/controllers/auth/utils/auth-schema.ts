import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(7, 'Password must be at least 7 characters')
  .max(20, 'password can not be longer than 20 characters');

const usernameSchema = z
  .string()
  .min(6, 'Username must be at least 6 characters long')
  .max(20, 'Username can not be longer than 20 characters');

export const login = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const register = z
  .object({
    username: usernameSchema,
    email: z.email('invalid email'),
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'passwords do not match',
  });

export default  {login,register};


