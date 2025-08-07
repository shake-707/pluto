import { cn } from '../../../lib/utils';
import { Button } from '../../../Shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../Shared/ui/card';
import { useState } from 'react';
import { Input } from '../../../Shared/ui/input';
import { Label } from '../../../Shared/ui/label';
import authSchema from '../utils/auth-schema';
import { z } from 'zod';
import { postRegisterUser } from '../api/register-user';

import { fetchLoginUser } from '../api/login-user';

export type RegisterInputs = z.infer<typeof authSchema.register>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [inputs, setInputs] = useState<RegisterInputs>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalInputs = authSchema.register.safeParse(inputs);

    if (!finalInputs.success) {
      console.log(finalInputs.data);
      console.error('invalid inputs');
      return;
    }

    try {
      await postRegisterUser(finalInputs.data);
      const { email, passwordConfirmation, ...loginInputs } = finalInputs.data;
      const user = await fetchLoginUser(loginInputs);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up For An Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegistration}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="user_name"
                  type="text"
                  placeholder="username"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  type="password"
                  required
                />
                <div className="flex items-center">
                  <Label htmlFor="passwordConfirmation">
                    Password Confirmation
                  </Label>
                </div>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  value={inputs.passwordConfirmation}
                  onChange={handleChange}
                  required
                />
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <a href="/auth/login" className="underline underline-offset-4">
                Already Have An Account
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
