'use client';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui';

export interface DeleteProps {
  onSuccess?: () => void;
}

export default function Delete({ onSuccess }: DeleteProps) {
  const handleCancel = () => {
    onSuccess?.();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(' Job tip deleted', { duration: 3000 });
    onSuccess?.();
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
              className="p-[11px] rounded-xl text-sm font-bold bg-[#F0443A] text-white cursor-pointer"
            >
              Delete
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
