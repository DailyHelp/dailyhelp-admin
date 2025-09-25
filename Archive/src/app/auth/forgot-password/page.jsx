'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import EmailIcon from '@/assets/email-icon.svg';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const isDisabled = !email;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending code
    console.log('Sending reset code to:', email);
    router.push('/auth/verify-code');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <DailyHelpLogo className="h-10 w-auto" />
        <div className="mb-4">
          <h2 className="text-[28px] font-bold ">Forgot Password?</h2>
          <p className="text-sm text-[#757C91] font-medium">
            Enter your admin email address, and a 6-digit code will be sent to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="" className="text-[#757C91] text-sm font-bold">
            Email address
          </label>

          <div className="relative mb-3 space-y-1">
            <EmailIcon className="absolute left-3 top-[25px] transform -translate-y-1/2 w-5 h-5 text-black" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full p-[11px]  rounded-lg text-[#A9AFC2] text-sm font-bold cursor-pointer
                    ${isDisabled ? 'bg-[#E5EAE7FF] cursor-not-allowed' : 'bg-[#017441] text-white '}`}
          >
            Send code
          </button>

          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="w-full my-6 text-sm text-[#017441] font-bold hover:underline cursor-pointer"
          >
            Return to login
          </button>
        </form>
      </div>
    </div>
  );
}
