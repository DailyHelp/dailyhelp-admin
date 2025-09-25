'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import type { UserProfile } from '@/types/types';

export default function Suspend({
  usersData,
  onSuccess,
}: {
  usersData: UserProfile;
  onSuccess?: () => void;
}) {
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
                placeholder="Enter reason for suspending user"
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="mb-4"
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
