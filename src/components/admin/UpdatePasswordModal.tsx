'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import PasswordIcon from '@/assets/password-icon.svg';
import ErrorIcon from '@/assets/error-icon.svg';
import CheckIcon from '@/assets/check-icon.svg';
import InformationIcon from '@/assets/info-icon.svg';
import { Eye, EyeOff } from 'lucide-react';
import { Button, IconButton, Input } from '@/components/ui';
import { changePassword } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import type { ApiError } from '@/lib/api-client';

const MIN_LENGTH = 6;

const validationRules = [
  {
    id: 'length',
    test: (value: string) => value.length >= MIN_LENGTH,
    label: `Must be at least ${MIN_LENGTH} characters long`,
  },
  {
    id: 'uppercase',
    test: (value: string) => /[A-Z]/.test(value),
    label: 'Must contain 1 uppercase letter',
  },
  {
    id: 'symbolOrNumber',
    test: (value: string) => /[\d!@#$%^&*(),.?":{}|<>]/.test(value),
    label: 'Must contain at least 1 symbol or number 12&#%',
  },
] as const;

export interface UpdatePasswordModalProps {
  onSuccess: () => void;
}

export default function UpdatePasswordModal({ onSuccess }: UpdatePasswordModalProps) {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const validations = useMemo(
    () =>
      validationRules.map((rule) => ({
        id: rule.id,
        label: rule.label,
        valid: rule.test(newPassword),
      })),
    [newPassword],
  );

  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit =
    validations.every((rule) => rule.valid) && passwordsMatch && currentPassword.trim().length > 0;

  const mutation = useMutation({
    mutationFn: () => {
      if (!accessToken) {
        throw new Error('You need to be signed in to update your password.');
      }

      return changePassword({
        token: accessToken,
        oldPassword: currentPassword,
        newPassword,
      });
    },
    onSuccess: () => {
      toast.success('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      onSuccess();
    },
    onError: (err: ApiError | Error) => {
      const message = err.message || 'Unable to update password. Please try again.';
      toast.error(message);
    },
  });

  const resetState = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setError('Please satisfy all password requirements.');
      return;
    }
    setError('');
    mutation.mutate();
  };

  const handleCancel = () => {
    resetState();
    onSuccess();
  };

  const renderPasswordField = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    isVisible,
    toggleVisibility,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    isVisible: boolean;
    toggleVisibility: () => void;
  }) => (
    <div>
      <label className="text-sm font-semibold text-[#757C91]" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        <PasswordIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B0B8C9]" />
        <Input
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="pl-12 text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] bg-[#F5F7FB] border border-transparent hover:border-[#D6DBE7] focus:bg-white focus:border-[#017441]"
          required
        />
        <IconButton
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0 text-[#757C91]"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </IconButton>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="space-y-6">
        {renderPasswordField({
          id: 'current-password',
          label: 'Current password',
          value: currentPassword,
          onChange: setCurrentPassword,
          placeholder: 'Enter current password',
          isVisible: showCurrent,
          toggleVisibility: () => setShowCurrent((prev) => !prev),
        })}

        <div>
          {renderPasswordField({
            id: 'new-password',
            label: 'New password',
            value: newPassword,
            onChange: setNewPassword,
            placeholder: 'Enter new password',
            isVisible: showNew,
            toggleVisibility: () => setShowNew((prev) => !prev),
          })}

          <ul className="mt-3 space-y-2 rounded-xl bg-[#EEF2FA] p-3 text-xs font-semibold">
            {validations.map((rule) => (
              <li
                key={rule.id}
                className={clsx(
                  'flex items-center gap-2',
                  rule.valid ? 'text-[#017441]' : 'text-[#B0B8C9]',
                )}
              >
                {rule.valid ? (
                  <CheckIcon className="h-4 w-4 text-[#017441]" />
                ) : (
                  <InformationIcon className="h-4 w-4 text-[#B0B8C9]" />
                )}
                {rule.label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {renderPasswordField({
            id: 'confirm-password',
            label: 'Confirm password',
            value: confirmPassword,
            onChange: (value) => {
              setConfirmPassword(value);
              if (error) {
                setError('');
              }
            },
            placeholder: 'Re-enter password',
            isVisible: showConfirm,
            toggleVisibility: () => setShowConfirm((prev) => !prev),
          })}

          {confirmPassword && !passwordsMatch && (
            <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#F0443A]">
              <ErrorIcon className="h-4 w-4" />
              Password mismatch
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#F0443A]">
          <ErrorIcon className="h-4 w-4" />
          {error}
        </p>
      )}

      <div className="mt-auto flex items-center justify-end gap-3 border-t border-[#F1F2F4] pt-5">
        <Button
          type="button"
          onClick={handleCancel}
          variant="secondary"
          className="rounded-full px-6 text-sm font-semibold"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!canSubmit || mutation.isPending}
          className="rounded-full px-6 text-sm font-semibold"
        >
          {mutation.isPending ? 'Saving...' : 'Save password'}
        </Button>
      </div>
    </form>
  );
}
