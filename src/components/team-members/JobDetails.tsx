'use client';
import { toast } from 'sonner';
import { useEffect, useMemo, useState } from 'react';
import type { TeamMember } from '@/types/types';
import Button from '@/components/ui/Button';
import { useUpdateAdminTeamMemberRole } from '@/features/team-members/hooks';

interface JobDetailsProps {
  member: TeamMember;
  roleOptions: Array<{ label: string; value: string }>;
  onSuccess?: () => void;
}

export default function JobDetails({ member, roleOptions, onSuccess }: JobDetailsProps) {
  const initialRole = useMemo(
    () => member.roleUuid ?? roleOptions[0]?.value ?? '',
    [member.roleUuid, roleOptions],
  );
  const [role, setRole] = useState(initialRole);
  const updateRoleMutation = useUpdateAdminTeamMemberRole();

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!member.uuid) {
      toast.error('Unable to update role: team member id is missing.', { duration: 3000 });
      return;
    }
    if (role === initialRole || !role) {
      onSuccess?.();
      return;
    }
    try {
      await updateRoleMutation.mutateAsync({
        uuid: member.uuid,
        payload: {
          roleUuid: role,
          roleUuids: [role],
        },
      });
      toast.success('Role updated successfully', { duration: 2500 });
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update role.';
      toast.error(message, { duration: 3000 });
    }
  };

  const handleCancel = () => {
    setRole(initialRole);
    onSuccess?.();
  };

  const selectedRoleLabel =
    roleOptions.find((option) => option.value === role)?.label ?? member.role ?? '—';

  const isSaveDisabled = !role || role === initialRole || updateRoleMutation.isPending;

  return (
    <div className="h-full ">
      <div className="px-6 py-4">
        <h2 className="text-[#3B4152] font-semibold text-3xl">{member.name}</h2>
        <p className="text-[#757C91] text-sm">{member.emailaddress ?? member.email}</p>
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
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-[#99A1B3] text-xs mt-2">
              Current role: <span className="font-medium text-[#3B4152]">{selectedRoleLabel}</span>
            </p>
          </div>
        </div>

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaveDisabled}>
              {updateRoleMutation.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
