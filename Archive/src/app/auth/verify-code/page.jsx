'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';

export default function VerifyCodePage() {
  const length = 6;
  const router = useRouter();
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const [timer, setTimer] = useState(60);

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
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

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    inputsRef.current[pasted.length - 1]?.focus();

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
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-center rounded-md text-lg focus:outline-none focus:ring-none bg-[#F9F9FB]"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleResendCode}
          disabled={timer > 0}
          className={`w-full p-[11px]  rounded-lg text-[#A9AFC2] text-sm font-bold cursor-pointer
            ${timer > 0 ? 'bg-[#E5EAE7FF] cursor-not-allowed' : 'bg-[#017441] text-white '}`}
        >
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
        </button>
      </form>
    </div>
  );
}
