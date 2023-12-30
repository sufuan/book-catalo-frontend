'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [userInput, setUserInput] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    console.log('User Input:', userInput);

    try {
      // setIsLoading(true);
      // Dispatch the loginUser action with user credentials
      await dispatch(
        loginUser({ email: userInput.email, password: userInput.password })
      );
      // console.log('Login successful!');
      // Additional logic for successful login if needed
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle login error (e.g., show a user-friendly error message)
    } finally {
      // setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (user.email && !isLoading) {
      navigate('/');
    }
  }, [user.email, isLoading]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={userInput.email}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={userInput.password}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Login with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? <p>loading</p> : <p>GitHub</p>}
      </Button>
    </div>
  );
}
