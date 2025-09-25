'use client';
import { TEAM_ROLES } from '@/data/teamMembersDummyData';
import { toast } from 'sonner';
import { useState } from 'react';
import type { TeamMember } from '@/types/types';
import Button from '@/components/ui/Button';

interface JobDetailsProps {
  usersData: TeamMember[];
  jobs: TeamMember;
  onOpenModal?: (type: string) => void;
  onSuccess?: () => void;
}

export default function JobDetails({ usersData, jobs, onOpenModal, onSuccess }: JobDetailsProps) {
  const [role, setRole] = useState(TEAM_ROLES[0] || 'Admin');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate request to update role
      await new Promise((res) => setTimeout(res, 800));
      toast.success('Role updated successfully', { duration: 2500 });
      onSuccess?.(); // close modal or refresh data
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setRole(jobs?.role || TEAM_ROLES[0] || 'Admin'); // Reset to original role
    onSuccess?.();
  };

  return (
    <div className="h-full ">
      <div className="px-6 py-4">
        <h2 className="text-[#3B4152] font-semibold text-3xl">{jobs.name}</h2>
        <p className="text-[#757C91] text-sm">{jobs.emailaddress}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col h-[90%]">
        <div className="px-6  space-y-3">
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
            <Button type="submit">{loading ? 'Saving...' : 'Save changes'}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
