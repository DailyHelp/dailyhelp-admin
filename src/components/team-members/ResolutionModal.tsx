'use client';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import type { TeamMember } from '@/types/types';

interface ResolutionModalProps {
  usersData: TeamMember[];
  onSuccess: () => void;
}

export default function ResolutionModal({ usersData, onSuccess }: ResolutionModalProps) {
  const handleCancel = () => {
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success(' Team members removed', { duration: 3000 });

    onSuccess?.(); // close modal
  };

  return (
    <div>
      <p className="mb- px-5 py-4 text-[#3B4152]">
        Removing this team member will immediately revoke their access to the admin panel and any
        assigned permissions. This action cannot be undone.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>

            <Button type="submit" variant="danger">
              Remove
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
