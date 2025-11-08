'use client';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import type { TeamMember } from '@/types/types';
import { useDeleteAdminTeamMember } from '@/features/team-members/hooks';

interface ResolutionModalProps {
  member: TeamMember | null;
  onSuccess: () => void;
}

export default function ResolutionModal({ member, onSuccess }: ResolutionModalProps) {
  const deleteMemberMutation = useDeleteAdminTeamMember();
  const isRemoving = deleteMemberMutation.isPending;
  const memberUuid = member?.uuid;

  const handleCancel = () => {
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!memberUuid) {
      toast.error('Unable to determine which team member to remove. Please try again.', {
        duration: 3000,
      });
      return;
    }

    try {
      await deleteMemberMutation.mutateAsync({ uuid: memberUuid });
      toast.success('Team member removed', { duration: 3000 });
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to remove team member.';
      toast.error(message, { duration: 3000 });
    }

    // success handled above
  };

  return (
    <div>
      <p className="mb- px-5 py-4 text-[#3B4152]">
        Removing {member?.name ?? 'this team member'} will immediately revoke their access to the
        admin panel and any assigned permissions. This action cannot be undone.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>

            <Button type="submit" variant="danger" disabled={!member || isRemoving} className={isRemoving ? 'opacity-60' : ''}>
              {isRemoving ? 'Removing…' : 'Remove'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
