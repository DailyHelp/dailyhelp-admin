'use client';

import { useState } from 'react';
import { TEAM_ROLES } from '@/data/teamMembersDummyData';
import { toast } from 'sonner';

export default function AddMemberForm({ onSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(TEAM_ROLES[0] || 'Admin');
  const [loading, setLoading] = useState(false);

  const isDisabled = !lastName || !email || !role || loading;

  const handleCancel = () => {
    setName('');
    setEmail('');
    setRole(TEAM_ROLES[0] || 'Admin');
    setSendingInvite(true);
    onSuccess?.(); // close modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    try {
      // Simulate request
      await new Promise((res) => setTimeout(res, 800));
      toast.success('Invite sent', { duration: 2500 });
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="px-4 py-4 space-y-3">
          <div className="flex  gap-4 justify-between">
            <div className=" w-1/2">
              <label className="block text-[#757C91] text-sm font-bold mb-1">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=""
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />
            </div>
            <div className=" w-1/2">
              <label className="block text-[#757C91] text-sm font-bold mb-1">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder=""
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#757C91] text-sm font-bold mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>

          <div>
            <label className="block text-[#757C91] text-sm font-bold mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
            >
              {TEAM_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
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
              className={`p-[11px] rounded-xl text-sm font-bold ${isDisabled ? 'bg-[#E5EAE7FF] text-[#A9AFC2] cursor-not-allowed' : 'bg-[#017441] text-white'}`}
            >
              {loading ? 'Sending...' : 'Send invite'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
