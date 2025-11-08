'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useCreateAdminTeamMember } from '@/features/team-members/hooks';

interface AddMemberFormProps {
  onSuccess?: () => void;
  roleOptions: Array<{ label: string; value: string }>;
}

export default function AddMemberForm({ onSuccess, roleOptions }: AddMemberFormProps) {
  const defaultRole = useMemo(() => roleOptions[0]?.value ?? '', [roleOptions]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(defaultRole);
  const createTeamMemberMutation = useCreateAdminTeamMember();

  useEffect(() => {
    setRole((prev) => (prev ? prev : defaultRole));
  }, [defaultRole]);

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedEmail = email.trim();
  const isDisabled =
    !trimmedLastName || !trimmedFirstName || !trimmedEmail || !role || createTeamMemberMutation.isPending;

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole(defaultRole);
    onSuccess?.(); // close modal
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    try {
      await createTeamMemberMutation.mutateAsync({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        roleUuid: role,
        roleUuids: role ? [role] : undefined,
      });
      toast.success('Team member invited', { duration: 2500 });
      onSuccess?.();
      setFirstName('');
      setLastName('');
      setEmail('');
      setRole(defaultRole);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create team member.';
      toast.error(message, { duration: 3000 });
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
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
              {createTeamMemberMutation.isPending ? 'Sending...' : 'Send invite'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
