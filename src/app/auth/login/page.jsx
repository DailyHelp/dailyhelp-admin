'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import EmailIcon from '@/assets/email-icon.svg'
import PasswordIcon from '@/assets/password-icon.svg'
import ErrorIcon from '@/assets/error-icon.svg'


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const isDisabled = !email || !password;

  const handleLogin = (e) => {
    e.preventDefault();
  const correctEmail = 'admin@dailyhelp.com';
  const correctPassword = '123456789';

  if (email !== correctEmail && password !== correctPassword) {
    setEmailError('Incorrect email address');
    setPasswordError('Incorrect password');
  } else if (email !== correctEmail) {
    setEmailError('Incorrect email address');
    setPasswordError('');
  } else if (password !== correctPassword) {
    setEmailError('');
    setPasswordError('Incorrect password');
  } else {
    setEmailError('');
    setPasswordError('');
    router.push('/dashboard');
  }

};
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleLogin} className="bg-white p-[40px] rounded-3xl shadow-md  space-y-1">
        <DailyHelpLogo className="h-10 w-auto"/>

        <div className='mb-4 '>
        <h2 className="text-[28px] font-bold ">Welcome to DailyHelp Admin</h2>
        <p className='text-sm text-[#757C91] font-medium'>Enter your login credentials to continue</p>
        </div>

       <label htmlFor="" className='text-[#757C91] text-sm font-bold'>Email address</label>
       <div className="relative mb-3 space-y-1">
        <EmailIcon className="absolute left-3 top-[25px] transform -translate-y-1/2 w-5 h-5 text-black" />
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none 
                ${emailError ? 'border border-red-500 bg-red-50 font-semibold text-[#3B4152]' : 'border border-transparent'}`}
            required
        />
        {emailError && <span className="text-red-500 text-xs flex space-x-1"><ErrorIcon className=''/><p>{emailError}</p></span>}
        </div>

       
       <label htmlFor="" className='text-[#757C91] text-sm font-bold'>Password</label>
       <div className="relative mb-3 space-y-1">
        <PasswordIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none 
                ${passwordError ? 'border border-red-500 bg-red-50 font-semibold text-[#3B4152]' : 'border border-transparent'}`}
            required
        />
        {passwordError && <span className="text-red-500 text-xs flex space-x-1"><ErrorIcon className=''/><p>{passwordError}</p></span>}

        </div>


       <button
        type="submit"
        disabled={isDisabled}
        className={`w-full p-[11px]  rounded-lg text-[#A9AFC2] text-sm font-bold cursor-pointer
          ${isDisabled ? 'bg-[#E5EAE7FF] cursor-not-allowed' : 'bg-[#017441] text-white '}`}
      >
        Login
      </button>

        <button
          type="button"
          onClick={() => router.push('/auth/forgot-password')}
          className="w-full my-6 text-sm text-[#017441] font-bold hover:underline cursor-pointer"
        >
          Forgot Password?
        </button>
      </form>

    </div>
  );
}
