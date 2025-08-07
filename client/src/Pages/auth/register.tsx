// import { z } from 'zod';
// import authSchema from './utils/auth-schema';
// export type LoginInput = z.infer<typeof authSchema.register>;
import { RegisterForm } from './ui/register-form';

export const Register = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};
