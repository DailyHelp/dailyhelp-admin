'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';

export default function ResolutionModal({
  usersData,
  onSuccess,
}: {
  usersData: any;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<string>(usersData.status);
  const [reason, setReason] = useState<string>('');
  // ✅ Only require reason if suspending

  const handleCancel = () => {
    setReason('');
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // toggle status
    const newStatus = status === 'Pending' ? 'Resolved' : 'Pending';
    setStatus(newStatus);
    usersData.status = newStatus;

    toast.success('Report resolved', { duration: 3000 });

    setReason('');
    onSuccess?.(); // close modal
  };

  return (
    <div>
      <p className="mb- px-5 py-4 text-[#3B4152]">
        You’re about to mark this report as resolved. This action will close the case and update its
        status in the system. The involved users will no longer be able to take further action
        through this report.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>

            <Button type="submit">Resolve</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
