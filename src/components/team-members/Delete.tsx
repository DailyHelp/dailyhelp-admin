'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';

export default function Delete({
  usersData,
  onSuccess,
}: {
  usersData?: any;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<string>(usersData?.status ?? '');
  const [reason, setReason] = useState<string>('');
  // ✅ Only require reason if suspending

  const handleCancel = () => {
    setReason('');
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // toggle status
    if (usersData && typeof usersData === 'object') {
      const newStatus = status === 'Pending' ? 'Resolved' : 'Pending';
      setStatus(newStatus);
      if ('status' in usersData) {
        usersData.status = newStatus;
      }
    }

    toast.success(' Role deleted', { duration: 3000 });

    setReason('');
    onSuccess?.(); // close modal
  };

  return (
    <div>
      <div className="mb- px-5 py-4 text-[#3B4152] space-y-2">
        <p className="">
          Deleting this role will permanently remove all team members assigned to it. This action
          cannot be undone.
        </p>
        <p className="pt-2">Are you sure you want to proceed?</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>

            <Button type="submit" variant="danger">
              Delete
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
