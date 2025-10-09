'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import EmailIcon from '@/assets/email-icon.svg';
import { Button, Input } from '@/components/ui';
import { initiateResetPassword } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { clearResetSession } from '@/features/auth/reset-session';
import type { InitiateResetPasswordResponse } from '@/features/auth/types';
import type { ApiError } from '@/lib/api-client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const { setPendingForgotPassword, clearPendingForgotPassword, clearPendingPasswordReset } =
    useAuthStore((state) => ({
      setPendingForgotPassword: state.setPendingForgotPassword,
      clearPendingForgotPassword: state.clearPendingForgotPassword,
      clearPendingPasswordReset: state.clearPendingPasswordReset,
    }));
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

  const initiateMutation = useMutation<InitiateResetPasswordResponse, ApiError | Error, string>({
    mutationFn: (payloadEmail) => initiateResetPassword({ email: payloadEmail }),
    onSuccess: (response) => {
      clearResetSession();
      clearPendingPasswordReset();
      setPendingForgotPassword({
        email: response.data.email,
        pinId: response.data.pinId,
      });
      toast.success('We just sent a verification code to your email.');
      router.push('/auth/forgot-password/verify');
    },
    onError: (error) => {
      toast.error(error.message || 'Unable to start password reset.');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearResetSession();
    clearPendingPasswordReset();
    clearPendingForgotPassword();
    initiateMutation.mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] px-4">
      <div className="w-full max-w-[420px] space-y-8 rounded-[32px] bg-white p-10 shadow-md">
        <DailyHelpLogo className="h-10 w-auto" />
        <div className="space-y-1">
          <h2 className="text-[28px] font-bold text-[#0E171A]">Forgot password?</h2>
          <p className="text-sm font-medium text-[#757C91]">
            Enter your admin email address. We’ll send a six digit verification code to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-[#757C91]" htmlFor="reset-email">
              Email address
            </label>
            <div className="relative mt-2">
              <EmailIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#757C91]" />
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                className="pl-12 text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] focus:bg-white focus:border-[#017441]"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={!email || initiateMutation.isPending} className="w-full">
            {initiateMutation.isPending ? 'Sending code...' : 'Send code'}
          </Button>

          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="w-full text-center text-sm font-semibold text-[#017441] transition-colors duration-200 hover:text-[#015c3a]"
          >
            Return to login
          </button>
        </form>
      </div>
    </div>
  );
}
