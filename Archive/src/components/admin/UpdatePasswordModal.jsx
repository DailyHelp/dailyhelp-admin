'use client';

import { useState } from 'react';
import PasswordIcon from '@/assets/password-icon.svg';
import EyeIcon from '@/assets/eye-icon.svg';
import CheckIcon from '@/assets/check-icon.svg';
import InformationIcon from '@/assets/info-icon.svg';
import { EyeOff } from 'lucide-react';
import ErrorIcon from '@/assets/error-icon.svg';

import { toast } from 'sonner';

export default function UpdatePasswordModal({ onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const correctPassword = '123456789';

  const validations = {
    length: newPassword.length >= 12,
    uppercase: /[A-Z]/.test(newPassword),
    symbolOrNumber: /[\d!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    match: newPassword && newPassword === confirmPassword,
    currentPasswordMatch: currentPassword && currentPassword === correctPassword,
  };

  const allValid = Object.values(validations).every(Boolean);
  const isDisabled = !allValid;

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    // onSuccess(); // ✅ close modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error || currentError || !allValid) {
      return; // prevent submission if errors exist
    }

    setLoading(true);

    try {
      await fakeUpdatePasswordAPI({ currentPassword, newPassword });
      toast.success('Password updated!', { duration: 3000 });
      onSuccess();
    } catch (err) {
      setError('Incorrect current password or server error.');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (condition) =>
    condition ? (
      <CheckIcon className="text-green-600 w-5 h-5" />
    ) : (
      <InformationIcon className="text-red-500 w-5 h-5" />
    );

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full focus:outline-none focus:ring-none"
      >
        <div className="px-4 py-4">
          {/* Current Password Input */}
          <label className="text-[#757C91] text-sm font-bold">Current password</label>
          <div className="relative mb-3 ">
            <PasswordIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => {
                const value = e.target.value;
                setCurrentPassword(value);
                setCurrentError(
                  value && value !== correctPassword ? 'Current password is incorrect' : '',
                );
              }}
              className={`w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none
                ${currentError ? 'border border-red-500 bg-red-50 font-semibold text-[#3B4152]' : 'border border-transparent'}`}
              required
            />
            <button
              type="button"
              className="absolute top-6 transform -translate-y-1/2 right-3 text-gray-500"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
            </button>
            {currentError && (
              <span className="text-red-500 text-xs flex space-x-1">
                <ErrorIcon className="" />
                <p>{currentError}</p>
              </span>
            )}
          </div>

          {/* New Password Input */}
          <label className="text-[#757C91] text-sm font-bold">New password</label>
          <div className="relative mb-3 ">
            <PasswordIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              <li
                className={`flex items-center space-x-1 ${validations.length ? 'text-[#27A535]' : 'text-[#757C91]'}`}
              >
                {getIcon(validations.length)} Must be at least 12 characters long
              </li>
              <li
                className={`flex items-center space-x-1 ${validations.uppercase ? 'text-[#27A535]' : 'text-[#757C91]'}`}
              >
                {getIcon(validations.uppercase)} Must contain 1 uppercase
              </li>
              <li
                className={`flex items-center space-x-1 ${validations.symbolOrNumber ? 'text-[#27A535]' : 'text-[#757C91]'}`}
              >
                {getIcon(validations.symbolOrNumber)} Must contain at least 1 symbol or number 12&#%
              </li>
            </ul>
          </div>

          {/* Confirm Password */}
          <label className="text-[#757C91] text-sm font-bold">Confirm password</label>
          <div className="relative mb-3 space-y-1">
            <PasswordIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);
                setError(value && value !== newPassword ? 'Passwords mismatch' : '');
              }}
              className={`w-full pl-9 p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none focus:ring-none
                ${error ? 'border border-red-500 bg-red-50 font-semibold text-[#3B4152]' : 'border border-transparent'}`}
              required
            />
            <button
              type="button"
              className="absolute top-6 transform -translate-y-1/2 right-3 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <EyeIcon size={18} />}
            </button>
            {error && (
              <span className="text-red-500 text-xs flex space-x-1">
                <ErrorIcon className="" />
                <p>{error}</p>
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4] ">
          <div className="ml-auto space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="p-[11px] rounded-xl bg-[#F1F2F4] border border-[#F1F2F4] text-[#A9AFC2] text-sm font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDisabled}
              className={` p-[11px]  rounded-xl text-[#A9AFC2] text-sm font-bold  ${
                isDisabled
                  ? 'bg-[#E5EAE7FF] cursor-not-allowed'
                  : 'bg-[#017441] text-white cursor-pointer '
              }`}
            >
              Save password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// temporary placeholder for backend call
const fakeUpdatePasswordAPI = ({ currentPassword, newPassword }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentPassword === '123456789') {
        resolve();
      } else {
        reject();
      }
    }, 1500);
  });
};
