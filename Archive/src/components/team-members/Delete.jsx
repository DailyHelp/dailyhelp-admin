'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Delete({ usersData, onSuccess }) {
  const [status, setStatus] = useState(usersData.status);
  const [reason, setReason] = useState('');
  // ✅ Only require reason if suspending

  const handleCancel = () => {
    setReason('');
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // toggle status
    const newStatus = status === 'Pending' ? 'Resolved' : 'Pending';
    setStatus(newStatus);
    usersData.status = newStatus;

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
            <button
              type="button"
              onClick={handleCancel}
              className="p-[11px] rounded-xl bg-[#F1F2F4] border border-[#DADBDEFF] text-[#017441] text-sm font-bold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="p-[11px] rounded-xl text-sm font-bold bg-[#F0443A] text-white cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
