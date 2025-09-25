'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';

import type { UserProfile } from '@/types/types';

export interface SuspendProps {
  usersData: UserProfile;
  onSuccess?: () => void;
}

export default function Suspend({ usersData, onSuccess }: SuspendProps) {
  const [status, setStatus] = useState<string>(usersData.status);
  const [reason, setReason] = useState<string>('');
  const isDisabled = reason.trim() === '' && status !== 'Suspended';
  // ✅ Only require reason if suspending

  const handleCancel = () => {
    setReason('');
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // toggle status
    const newStatus = status === 'Suspended' ? 'Verified' : 'Suspended';
    setStatus(newStatus);
    usersData.status = newStatus;

    toast.success(newStatus === 'Suspended' ? 'User suspended' : 'User reactivated', {
      duration: 3000,
    });

    setReason('');
    onSuccess?.(); // close modal
  };

  const isSuspending = status !== 'Suspended'; // if active → suspend, else reactivate

  return (
    <div>
      <p className="mb- px-5 py-4 text-[#3B4152]">
        {isSuspending
          ? 'You’re about to suspend this client, which will block their access to the platform and prevent them from requesting or booking any services.'
          : 'This user was previously suspended and is about to be reactivated. Once reactivated, they will be able to log in, access their account, and use all features available to them.'}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="px-5">
          {isSuspending && (
            <>
              <label htmlFor="reason" className="mb-2 text-[#757C91] font-bold">
                Reason
              </label>
              <Textarea
                id="reason"
                value={reason}
                placeholder="Enter reason for suspending user"
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                cols={40}
                className="p-2 bg-[#F9F9FB] text-[#3B4152] font-bold rounded-lg w-full mb-4 focus:outline-none focus:ring-none placeholder:text-[#A9AFC2] placeholder:font-bold"
              />
            </>
          )}
        </div>

        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>

            <Button type="submit" disabled={isDisabled}>
              {isSuspending ? 'Suspend Client' : 'Reactivate Client'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
