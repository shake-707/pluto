import { z } from 'zod';
import authSchema from './utils/auth-schema';
export type LoginInput = z.infer<typeof authSchema.login>;
import { LoginForm } from './ui/login-form';

export const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};
