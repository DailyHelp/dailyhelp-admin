'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Input } from '@/components/ui';
import { useRouter } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import EmailIcon from '@/assets/email-icon.svg';
import PasswordIcon from '@/assets/password-icon.svg';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { clearResetSession, saveResetSession } from '@/features/auth/reset-session';
import type { LoginPayload, LoginResponse } from '@/features/auth/types';
import type { ApiError } from '@/lib/api-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setPendingLogin, clearPendingLogin, logout, completeLogin, accessToken } = useAuthStore(
    (state) => ({
      setPendingLogin: state.setPendingLogin,
      clearPendingLogin: state.clearPendingLogin,
      logout: state.logout,
      completeLogin: state.completeLogin,
      accessToken: state.accessToken,
    }),
  );
  const [storeHydrated, setStoreHydrated] = useState(
    () => useAuthStore.persist?.hasHydrated?.() ?? true,
  );

  useEffect(() => {
    if (storeHydrated) {
      return;
    }

    const unsub = useAuthStore.persist?.onFinishHydration?.(() => setStoreHydrated(true));
    return () => {
      unsub?.();
    };
  }, [storeHydrated]);

  useEffect(() => {
    if (!storeHydrated) {
      return;
    }

    if (accessToken) {
      router.replace('/dashboard');
    }
  }, [accessToken, router, storeHydrated]);

  const loginMutation = useMutation<LoginResponse, ApiError | Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (response) => {
      setEmailError(false);
      setPasswordError(false);
      clearPendingLogin();
      clearResetSession();

      if (response.data.otpRequired) {
        setPendingLogin({
          ...response.data,
          password,
        });
        toast.success('Enter the verification code sent to your email.');
        router.push('/auth/verify-code');
        return;
      }

      if (response.data.accessToken && response.data.user) {
        if (response.data.requiresPasswordReset) {
          if (!response.data.accessToken || !response.data.user.email) {
            toast.error('Unable to start password reset. Please try again.');
            return;
          }
          saveResetSession({
            token: response.data.accessToken,
            email: response.data.user.email,
            type: 'login',
            oldPassword: password,
          });
          toast.success('Create a new password to finish signing in.');
          router.push('/auth/reset-password');
          return;
        }

        completeLogin({
          accessToken: response.data.accessToken,
          user: response.data.user,
          roles: response.data.roles ?? [],
          permissions: response.data.permissions ?? [],
        });
      }

      toast.success('Login successful.');
      router.push('/dashboard');
    },
    onError: (error) => {
      const message = error.message || 'Unable to log in with the provided credentials.';
      toast.error(message);
      setEmailError(true);
      setPasswordError(true);
    },
  });

  const isDisabled = !email || !password || loginMutation.isPending;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    logout();
    clearResetSession();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[420px] space-y-8 rounded-[32px] bg-white p-10 shadow-md"
      >
        <DailyHelpLogo className="h-10 w-auto" />

        <div className="space-y-1">
          <h2 className="text-[28px] font-bold text-[#0E171A]">Welcome to DailyHelp Admin</h2>
          <p className="text-sm font-medium text-[#757C91]">
            Enter your login credentials to continue
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-[#757C91]" htmlFor="email">
              Email address
            </label>
            <div className="relative mt-2">
              <EmailIcon
                className={clsx(
                  'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2',
                  emailError ? 'text-[#F0443A]' : 'text-[#757C91]',
                )}
              />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) {
                    setEmailError(false);
                  }
                }}
                aria-invalid={emailError}
                placeholder="Enter email address"
                className={clsx(
                  'pl-12 text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] focus:bg-white focus:border-[#017441]',
                  emailError
                    ? 'border border-[#F0443A] bg-[#FFF7F7]'
                    : 'border border-transparent bg-[#F9F9FB] hover:border-[#D6DBE7]',
                )}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#757C91]" htmlFor="password">
              Password
            </label>
            <div className="relative mt-2">
              <PasswordIcon
                className={clsx(
                  'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2',
                  passwordError ? 'text-[#F0443A]' : 'text-[#757C91]',
                )}
              />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) {
                    setPasswordError(false);
                  }
                }}
                aria-invalid={passwordError}
                placeholder="Enter password"
                className={clsx(
                  'pl-12 text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] focus:bg-white focus:border-[#017441]',
                  passwordError
                    ? 'border border-[#F0443A] bg-[#FFF7F7]'
                    : 'border border-transparent bg-[#F9F9FB] hover:border-[#D6DBE7]',
                )}
                required
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isDisabled} className="w-full">
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>

        <button
          type="button"
          onClick={() => router.push('/auth/forgot-password')}
          className="w-full text-center text-sm font-semibold text-[#017441] transition-colors duration-200 hover:text-[#015c3a]"
        >
          Forgot password?
        </button>
      </form>
    </div>
  );
}
