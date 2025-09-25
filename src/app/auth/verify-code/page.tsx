'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function VerifyCodePage() {
  const length = 6;
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [timer, setTimer] = useState(60);

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus?.();
    }

    const fullCode = newOtp.join('');
    if (fullCode.length === length && !newOtp.includes('')) {
      if (fullCode === '123456') {
        router.push('/auth/reset-password');
      } else {
        alert('Invalid verification code');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus?.();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = [...otp];
    pasted.forEach((char: string, i: number) => {
      if (/^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    inputsRef.current[pasted.length - 1]?.focus?.();

    if (newOtp.join('') === '123456') {
      router.push('/reset-password');
    }
  };

  const handleResendCode = () => {
    alert('Verification code resent to your email!');
    setOtp(Array(length).fill('')); // clear current input
    setTimer(60); // restart countdown
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB]">
      <form className="bg-white p-8 rounded-lg shadow-xl space-y-3 max-w-md">
        <DailyHelpLogo className="h-10 w-auto" />

        <div>
          <h2 className="text-[28px] font-bold">Enter code</h2>
          <p className="text-sm text-[#757C91] font-medium">
            Enter 6 digits code sent to ad***@dailyhelp.com to reset your password.
          </p>
        </div>

        <div onPaste={handlePaste} className="flex gap-2">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el: HTMLInputElement | null) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-center rounded-md text-lg focus:outline-none focus:ring-none bg-[#F9F9FB]"
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={handleResendCode}
          disabled={timer > 0}
          className={`w-full rounded-lg text-sm font-bold ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
        </Button>
      </form>
    </div>
  );
}
