'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import type { ProviderProfile } from '@/types/types';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';

export interface ProvidersSuspendProps {
  usersData: ProviderProfile;
  onSuccess?: () => void;
}

export default function Suspend({ usersData, onSuccess }: ProvidersSuspendProps) {
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

    toast.success(newStatus === 'Suspended' ? 'Provider suspended' : 'Provider reactivated', {
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
          ? 'You’re about to suspend this service provider. While suspended, they will be unable to log in, receive job offers, or communicate with clients on the platform.'
          : 'You’re about to reactivate this service provider. Once reactivated, they will regain access to the platform and be able to receive job offers and communicate with clients.'}
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
                placeholder="Enter reason for suspending provider"
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
              {isSuspending ? 'Suspend' : 'Reactivate'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
