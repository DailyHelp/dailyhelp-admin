'use client';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui';
import type { AdminJobTip } from '@/features/settings/types';
import { useDeleteAdminJobTip } from '@/features/settings/hooks';

export interface DeleteProps {
  tip?: AdminJobTip | null;
  onSuccess?: () => void;
}

export default function Delete({ tip, onSuccess }: DeleteProps) {
  const deleteJobTipMutation = useDeleteAdminJobTip();
  const isDeleting = deleteJobTipMutation.isPending;

  const handleCancel = () => {
    onSuccess?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tip?.uuid) {
      toast.error('Unable to determine which job tip to delete.', { duration: 3000 });
      return;
    }

    try {
      await deleteJobTipMutation.mutateAsync({ uuid: tip.uuid });
      toast.success('Job tip deleted', { duration: 3000 });
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to delete job tip.';
      toast.error(message, { duration: 3000 });
    }
  };

  return (
    <div>
      <div className="mb- px-5 py-4 text-[#3B4152] space-y-2">
        <p>
          You’re about to delete a job tip. Deleting this job tip will remove it from the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              className="p-[11px] text-sm"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isDeleting}
              className={`p-[11px] rounded-xl text-sm font-bold bg-[#F0443A] text-white ${
                isDeleting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
