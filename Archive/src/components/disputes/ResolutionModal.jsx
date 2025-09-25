'use client';
import { useState } from 'react';
import { toast } from 'sonner';
// ✅ Centralized config (no switch/case)

export const modalContent = {
  refundClient: {
    title: 'Refund Client',
    description:
      'You’re about to issue a full refund to the client. The service provider will not receive payment for this job. This action will close the dispute and notify both parties.',
    confirmLabel: 'Confirm refund',
    requireReason: true,
    requireAmount: false,
  },
  partialRefund: {
    title: 'Partial refund',
    description:
      'You’re about to issue a partial refund to the client. Please confirm the refund amount and provide a short note explaining the resolution. The remaining amount will be paid to the service provider.',
    confirmLabel: 'Confirm partial refund',
    requireReason: true,
    requireAmount: true,
  },
  payProvider: {
    title: 'Pay provider',
    description:
      'You’re about to pay the service provider the full job amount. The client will not receive a refund. This will mark the dispute as resolved and notify both parties.',
    confirmLabel: 'Confirm payment',
    requireReason: true,
    requireAmount: false,
  },
};
export default function ResolutionModal({ type, usersData, onSuccess }) {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(''); // only for partial refund

  const config = modalContent[type] || {};

  const isDisabled =
    (config.requireReason && reason.trim() === '') ||
    (config.requireAmount && amount.trim() === '');

  const handleCancel = () => {
    setReason('');
    setAmount('');
    onSuccess?.(); // close modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // here you can also update jobsData if needed
    toast.success('Dispute resolved', { duration: 3000 });

    setReason('');
    setAmount('');
    onSuccess?.(); // close modal
  };

  return (
    <div>
      <p className="px-5 py-2 text-[#3B4152]">{config.description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="px-5 space-y-4 font-semibold">
          {/* Partial refund amount */}
          {config.requireAmount && (
            <div>
              <label htmlFor="amount" className="mb-2 text-[#757C91]  block">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₦ 0.00"
                className="p-2 bg-[#F9F9FB] text-[#3B4152]  rounded-lg w-full focus:outline-none placeholder:text-[#A9AFC2] "
              />
            </div>
          )}
          {/* Reason (optional/required) */}
          {config.requireReason && (
            <div>
              <label htmlFor="reason" className=" text-[#757C91]  block">
                Resolution note
              </label>
              <textarea
                id="reason"
                value={reason}
                placeholder="Enter a detailed reason for this decision"
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="my-2 p-2 bg-[#F9F9FB] text-[#3B4152] font-bold rounded-lg w-full focus:outline-none placeholder:text-[#A9AFC2]  rounded-xl"
              />
            </div>
          )}
        </div>

        {/* Footer buttons */}
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
              disabled={isDisabled}
              className={`p-[11px] rounded-xl text-sm font-bold ${
                isDisabled
                  ? 'bg-[#E5EAE7FF] text-[#A9AFC2] cursor-not-allowed'
                  : 'bg-[#017441] text-white cursor-pointer'
              }`}
            >
              {config.confirmLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
