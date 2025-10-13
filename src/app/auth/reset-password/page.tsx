'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import PasswordIcon from '@/assets/password-icon.svg';
import EyeIcon from '@/assets/eye-icon.svg';
import ErrorIcon from '@/assets/error-icon.svg';
import CheckIcon from '@/assets/check-icon.svg';
import InformationIcon from '@/assets/info-icon.svg';
import { EyeOff } from 'lucide-react';
import { Button, IconButton, Input } from '@/components/ui';
import { changePassword, resetPassword } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import {
  clearResetSession,
  readResetSession,
  type ResetSession,
} from '@/features/auth/reset-session';
import type { ApiError } from '@/lib/api-client';

const MIN_LENGTH = 6;

const requirements = [
  {
    id: 'length',
    label: `Must be at least ${MIN_LENGTH} characters long`,
    test: (value: string) => value.length >= MIN_LENGTH,
  },
  {
    id: 'uppercase',
    label: 'Must contain 1 uppercase letter',
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: 'symbolOrNumber',
    label: 'Must contain at least 1 symbol or number 12&#%',
    test: (value: string) => /[\d!@#$%^&*(),.?":{}|<>]/.test(value),
  },
] as const;

export default function ResetPasswordPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const [session, setSession] = useState<ResetSession | null>(() => readResetSession());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setSession(readResetSession());
  }, []);

  const validationStates = useMemo(
    () =>
      requirements.map((rule) => ({
        id: rule.id,
        label: rule.label,
        valid: rule.test(password),
      })),
    [password],
  );

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const allValid = validationStates.every((rule) => rule.valid) && passwordsMatch;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!session) {
        throw new Error('Reset session expired.');
      }

      if (session.type === 'login') {
        if (!session.oldPassword) {
          throw new Error('Missing current password for reset.');
        }
        return changePassword({
          token: session.token,
          oldPassword: session.oldPassword,
          newPassword: password,
        });
      }

      return resetPassword({
        token: session.token,
        email: session.email,
        password,
      });
    },
    onSuccess: () => {
      toast.success('Password updated. Please sign in with your new password.');
      setRedirecting(true);
      clearResetSession();
      setSession(null);
      logout();
      router.replace('/auth/login');
    },
    onError: (apiError: ApiError | Error) => {
      const message = apiError.message || 'Unable to reset password. Please try again.';
      toast.error(message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) {
      toast.error('Your session has expired. Please try again.');
      setRedirecting(true);
      router.push('/auth/forgot-password');
      return;
    }
    if (!allValid) {
      setError('Please satisfy all password requirements.');
      return;
    }
    setError('');
    mutation.mutate();
  };

  if (!session) {
    if (redirecting) {
      return null;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] px-4">
        <div className="w-full max-w-[420px] space-y-6 rounded-[32px] bg-white p-10 text-center shadow-md">
          <DailyHelpLogo className="mx-auto h-10 w-auto" />
          <h2 className="text-[28px] font-bold text-[#0E171A]">Reset password</h2>
          <p className="text-sm font-medium text-[#757C91]">
            Your reset session has expired. Please request a new code or return to login to start
            again.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push('/auth/forgot-password')} className="w-full">
              Request new code
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/auth/login')}
              className="w-full"
            >
              Return to login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const heading = 'Reset password';
  const description =
    session.type === 'login'
      ? 'Protect your account by creating a strong password before continuing.'
      : 'Protect your account by creating a strong password.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] space-y-6 rounded-[32px] bg-white p-10 shadow-md"
      >
        <DailyHelpLogo className="h-10 w-auto" />

        <div className="space-y-1">
          <h2 className="text-[28px] font-bold text-[#0E171A]">{heading}</h2>
          <p className="text-sm font-medium text-[#757C91]">{description}</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-[#757C91]" htmlFor="new-password">
              New password
            </label>
            <div className="relative mt-2">
              <PasswordIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#757C91]" />
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
                className="pl-12 text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] focus:bg-white focus:border-[#017441]"
                required
              />
              <IconButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0 text-[#757C91]"
              >
                {showPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
              </IconButton>
            </div>
            <ul className="mt-3 space-y-2 rounded-xl bg-[#F9F9FB] p-3 text-xs font-semibold">
              {validationStates.map((rule) => (
                <li
                  key={rule.id}
                  className={clsx(
                    'flex items-center gap-2',
                    rule.valid ? 'text-[#27A535]' : 'text-[#757C91]',
                  )}
                >
                  {rule.valid ? (
                    <CheckIcon className=" text-[#27A535]" />
                  ) : (
                    <InformationIcon className=" text-[#F0443A]" />
                  )}
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#757C91]" htmlFor="confirm-password">
              Confirm password
            </label>
            <div className="relative mt-2">
              <PasswordIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#757C91]" />
              <Input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                placeholder="Re-enter password"
                aria-invalid={!passwordsMatch}
                className={clsx(
                  'pl-12 text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] focus:bg-white focus:border-[#017441]',
                  confirmPassword &&
                    !passwordsMatch &&
                    'border border-[#F0443A] bg-[#FFF7F7] text-[#3B4152]',
                )}
                required
              />
              <IconButton
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0 text-[#757C91]"
              >
                {showConfirm ? <EyeOff size={18} /> : <EyeIcon size={18} />}
              </IconButton>
            </div>

            {confirmPassword && !passwordsMatch && (
              <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#F0443A]">
                <ErrorIcon className="" />
                Password mismatch
              </p>
            )}
          </div>
        </div>

        {error && (
          <p className="flex items-center gap-2 text-xs font-semibold text-[#F0443A]">
            <ErrorIcon className="" />
            {error}
          </p>
        )}

        <Button type="submit" disabled={!allValid || mutation.isPending} className="w-full">
          {mutation.isPending ? 'Saving password...' : 'Save password'}
        </Button>
      </form>
    </div>
  );
}
