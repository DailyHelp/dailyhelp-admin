'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Suspend({ usersData, onSuccess }) {
  const [status, setStatus] = useState(usersData.status);
  const [reason, setReason] = useState('');
  const isDisabled = reason.trim() === '' && status !== 'Suspended';
  // ✅ Only require reason if suspending

  const handleCancel = () => {
    setReason('');
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e) => {
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
              <textarea
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
            <button
              type="button"
              onClick={handleCancel}
              className="p-[11px] rounded-xl bg-[#F1F2F4] border border-[#DADBDEFF] text-[#A9AFC2] text-sm font-bold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isDisabled}
              className={`p-[11px] rounded-xl text-sm font-bold ${
                isSuspending
                  ? isDisabled
                    ? 'bg-[#E5EAE7FF] text-[#A9AFC2] cursor-not-allowed'
                    : 'bg-[#017441] text-white cursor-pointer'
                  : 'bg-[#017441] text-white cursor-pointer'
              }`}
            >
              {isSuspending ? 'Suspend Client' : 'Reactivate Client'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
