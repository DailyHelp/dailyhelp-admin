'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import PasswordIcon from '@/assets/password-icon.svg'
import EyeIcon from '@/assets/eye-icon.svg'
import CheckIcon from '@/assets/check-icon.svg'
import InformationIcon from '@/assets/info-icon.svg'
import { EyeOff } from 'lucide-react';
import ErrorIcon from '@/assets/error-icon.svg'

import { toast } from 'sonner';



export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordError, setPasswordError] = useState('');


  
    const validations = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      symbolOrNumber: /[\d!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password && password === confirmPassword,
    };
  
    const allValid = Object.values(validations).every(Boolean);
    const isDisabled = !allValid;

  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validations.match) {
        setPasswordError('Passwords mismatch');
      } else if (allValid) {
        setPasswordError('');
        toast.success('Password reset completed!');
        router.push('/auth/login');
      }
      
    };
  
    const getIcon = (condition) =>
      condition ? (
        <CheckIcon className="text-green-600 w-5 h-5" />
      ) : (
        <InformationIcon className="text-red-500 w-5 h-5" />
      );

      function validateConfirmPassword(value) {
        setConfirmPassword(value);
        if (value && value !== password) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      }
      
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-[40px] rounded-3xl shadow-md  w-full max-w-md"
        >
          <DailyHelpLogo className="h-10 w-auto " />
  
          <div className='mb-4'>
            <h2 className="text-2xl font-bold ">Reset password</h2>
            <p className="text-sm text-[#757C91]">
            Protect your account by creating a strong password            
            </p>
          </div>
  
          {/* Password Input */}
          <label className="text-[#757C91] text-sm font-bold">
              New password
            </label>
          <div className="relative mb-3 ">
            
                <PasswordIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none"
              required
            />
            <button
              type="button"
              className="absolute top-6 transform -translate-y-1/2 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
            </button>

            {/* Requirements */}
           <ul className="space-y-1 text-xs bg-[#F9F9FB] p-2 rounded-lg my-1">
            <li className={`flex items-center space-x-1 ${validations.length ? 'text-[#27A535]' : 'text-[#757C91]'}`}>
              {getIcon(validations.length)} Must be at least 12 characters long
            </li>
            <li className={`flex items-center space-x-1 ${validations.uppercase ? 'text-[#27A535]' : 'text-[#757C91]'}`}>
              {getIcon(validations.uppercase)} Must contain 1 uppercase
            </li>
            <li className={`flex items-center space-x-1 ${validations.symbolOrNumber ? 'text-[#27A535]' : 'text-[#757C91]'}`}>
              {getIcon(validations.symbolOrNumber)} Must contain at least 1 symbol or number 12&#%
            </li>
            
          </ul>
          </div>
           
  
          {/* Confirm Password */}
          <label className="text-[#757C91] text-sm font-bold">
              Confirm password
            </label>
          <div className="relative mb-3 space-y-1">
          <PasswordIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => validateConfirmPassword(e.target.value)}
              className={`w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none
                ${passwordError ? 'border border-red-500 bg-red-50 font-semibold text-[#3B4152]' : 'border border-transparent'}`}
              required
            />
            <button
              type="button"
              className="absolute top-6 transform -translate-y-1/2 right-3 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <EyeIcon size={18} />}
            </button>
            {passwordError && <span className="text-red-500 text-xs flex space-x-1"><ErrorIcon className=''/><p>{passwordError}</p></span>}

          </div>

         
  
          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full p-[11px]  rounded-lg text-[#A9AFC2] text-sm font-bold  ${
                isDisabled
               ? 'bg-[#E5EAE7FF] cursor-not-allowed' : 'bg-[#017441] text-white cursor-pointer '}`}
          >
            Reset Password
          </button>
        </form>
      </div>
    );
  }
