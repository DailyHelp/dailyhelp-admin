'use client';

import { useState } from 'react';
import { TEAM_ROLES } from '@/data/teamMembersDummyData';
import { toast } from 'sonner';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AddMemberForm({ onSuccess }: { onSuccess?: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(TEAM_ROLES[0] || 'Admin');
  const [loading, setLoading] = useState(false);

  const isDisabled = !lastName || !email || !role || loading;

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole(TEAM_ROLES[0] || 'Admin');
    setLoading(false);
    onSuccess?.(); // close modal
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className=" w-1/2">
              <label className="block text-[#757C91] text-sm font-bold mb-1">Last name</label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#757C91] text-sm font-bold mb-1">Email address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={isDisabled}>
              {loading ? 'Sending...' : 'Send invite'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
