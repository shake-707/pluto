import { cn } from '../../../lib/utils';
import { Button } from '../../../Shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../Shared/ui/card';

import { Input } from '../../../Shared/ui/input';
import { Label } from '../../../Shared/ui/label';
import { fetchLoginUser } from '../api/login-user';
import { useState } from 'react';
import { z } from 'zod';
import authSchema from '../utils/auth-schema';
import { useNavigate } from '@tanstack/react-router';
export type LoginInput = z.infer<typeof authSchema.login>;
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const [input, setInputs] = useState<LoginInput>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalInputs = authSchema.login.safeParse(input);

    if (!finalInputs.success) {
      console.log(finalInputs.data);
      console.error('invalid inputs');
      return;
    }
    try {
      const user = await fetchLoginUser(finalInputs.data);
      console.log(user);
      navigate({
        from: '/auth/login',
        to: '/',
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="username"
                  value={input.username}
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
                  type="password"
                  name="password"
                  value={input.password}
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
              Don&apos;t have an account?{' '}
              <a href="/auth/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
