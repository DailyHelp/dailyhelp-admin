'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import { Button, Input } from '@/components/ui';
import { verifyOtp, resendLoginOtp } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { clearResetSession, saveResetSession } from '@/features/auth/reset-session';
import type { ApiError } from '@/lib/api-client';
import type { VerifyOtpPayload, ResendOtpPayload } from '@/features/auth/types';

const OTP_LENGTH = 6;

const maskEmail = (value: string) => {
  const [localPart, domain] = value.split('@');
  if (!domain) {
    return value;
  }
  const visible = localPart.slice(0, Math.min(2, localPart.length));
  return `${visible}***@${domain}`;
};

export default function VerifyCodePage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [hasError, setHasError] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { pendingLogin, completeLogin, updatePendingPin, clearPendingLogin } = useAuthStore(
    (state) => ({
      pendingLogin: state.pendingLogin,
      completeLogin: state.completeLogin,
      updatePendingPin: state.updatePendingPin,
      clearPendingLogin: state.clearPendingLogin,
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

  const email = pendingLogin?.email ?? '';
  const pinId = pendingLogin?.pinId ?? '';
  const otpValue = otp.join('');
  const isOtpComplete = otpValue.length === OTP_LENGTH && !otp.includes('');

  useEffect(() => {
    if (!storeHydrated) {
      return;
    }
    if (!pendingLogin) {
      // router.replace('/auth/login');
    }
  }, [pendingLogin, router, storeHydrated]);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    const intervalId = window.setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [timer]);

  const verifyMutation = useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: (response) => {
      setHasError(false);
      clearResetSession();
      if (pendingLogin && response.data.requiresPasswordReset) {
        if (!response.data.accessToken) {
          toast.error('Unable to start password reset. Please try again.');
          return;
        }
        saveResetSession({
          token: response.data.accessToken,
          email: pendingLogin.email,
          type: 'login',
          oldPassword: pendingLogin.password,
        });
        clearPendingLogin();
        toast.success('Create a new password to finish signing in.');
        router.push('/auth/reset-password');
        return;
      }

      clearPendingLogin();
      completeLogin({
        accessToken: response.data.accessToken,
        user: response.data.user,
        roles: response.data.roles,
        permissions: response.data.permissions,
      });
      toast.success('Login successful.');
      setIsRedirecting(true);
      router.push('/dashboard');
    },
    onError: (error: ApiError | Error) => {
      const message = error.message || 'Invalid verification code. Please try again.';
      toast.error(message);
      setHasError(true);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputsRef.current[0]?.focus?.();
    },
  });

  const resendMutation = useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendLoginOtp(payload),
    onSuccess: (response) => {
      updatePendingPin(response.data.pinId);
      setTimer(60);
      setOtp(Array(OTP_LENGTH).fill(''));
      setHasError(false);
      toast.success('A new code has been sent to your email.');
      inputsRef.current[0]?.focus?.();
    },
    onError: (error: ApiError | Error) => {
      const message = error.message || 'Unable to resend code at the moment.';
      toast.error(message);
    },
  });

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) {
      return;
    }
    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      const nextOtp = [...otp];
      nextOtp[index - 1] = '';
      setOtp(nextOtp);
      inputsRef.current[index - 1]?.focus?.();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').slice(0, OTP_LENGTH).split('');
    const nextOtp = [...otp];
    pasted.forEach((char, idx) => {
      if (/^\d$/.test(char)) {
        nextOtp[idx] = char;
      }
    });
    setOtp(nextOtp);
    const lastIndex = Math.min(pasted.length - 1, OTP_LENGTH - 1);
    inputsRef.current[lastIndex]?.focus?.();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pendingLogin) {
      toast.error('Your session has expired. Please log in again.');
      // router.replace('/auth/login');
      return;
    }
    if (!isOtpComplete) {
      toast.error('Enter the 6-digit verification code.');
      setHasError(true);
      return;
    }
    setHasError(false);
    verifyMutation.mutate({
      email: pendingLogin.email,
      pinId: pendingLogin.pinId,
      otp: otpValue,
    });
  };

  const handleResend = () => {
    if (!pendingLogin || timer > 0) {
      return;
    }
    resendMutation.mutate({
      email: pendingLogin.email,
      pinId: pendingLogin.pinId,
    });
  };

  if (!storeHydrated || !pendingLogin) {
    return null;
  }

  if (isRedirecting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9FB] px-4">
        <DailyHelpLogo className="h-12 w-auto" />
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#017441] border-t-transparent" />
          <p className="text-sm font-medium text-[#47516B]">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] space-y-8 rounded-[32px] bg-white p-10 shadow-md"
      >
        <DailyHelpLogo className="h-10 w-auto" />

        <div className="space-y-1">
          <h2 className="text-[28px] font-bold text-[#0E171A]">Enter code</h2>
          <p className="text-sm font-medium text-[#757C91]">
            Enter the 6-digit code sent to {maskEmail(email)} to continue.
          </p>
        </div>

        <div onPaste={handlePaste} className="flex gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(element: HTMLInputElement | null) => {
                inputsRef.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(event.target.value, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              aria-label={`OTP digit ${index + 1}`}
              className={clsx(
                'h-12 w-12 rounded-lg border text-center text-lg font-semibold text-[#0E171A]',
                'focus:border-[#017441] focus:bg-white focus:outline-none',
                hasError ? 'border-[#F0443A] bg-[#FFF7F7]' : 'border-transparent bg-[#F9F9FB]',
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={!isOtpComplete || verifyMutation.isPending}
          className="w-full"
        >
          {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || resendMutation.isPending}
          className={clsx(
            'w-full text-center text-sm font-semibold text-[#017441]',
            'transition-colors duration-200 hover:text-[#015c3a]',
            (timer > 0 || resendMutation.isPending) && 'cursor-not-allowed opacity-60',
          )}
        >
          {timer > 0 ? `Resend code in ${timer}s` : resendMutation.isPending ? 'Sending code…' : 'Resend code'}
        </button>
      </form>
    </div>
  );
}
