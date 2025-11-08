'use client';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { useDeleteAdminRole } from '@/features/team-members/hooks';

export default function Delete({
  usersData,
  onSuccess,
}: {
  usersData?: any;
  onSuccess?: () => void;
}) {
  const deleteRoleMutation = useDeleteAdminRole();
  const roleUuid = typeof usersData === 'object' ? usersData?.uuid : undefined;
  const isDeleting = deleteRoleMutation.isPending;

  const handleCancel = () => {
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!roleUuid) {
      toast.error('Unable to determine which role to delete. Please try again.', { duration: 3000 });
      return;
    }

    try {
      await deleteRoleMutation.mutateAsync({ uuid: roleUuid });
      toast.success('Role deleted', { duration: 3000 });
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to delete role.';
      toast.error(message, { duration: 3000 });
    }
  };

  return (
    <div>
      <div className="mb- px-5 py-4 text-[#3B4152] space-y-2">
        <p className="">
          Deleting this role will permanently remove all team members assigned to it. This action
          cannot be undone.
        </p>
        <p className="pt-2">Are you sure you want to proceed?</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>

            <Button type="submit" variant="danger" disabled={isDeleting} className={isDeleting ? 'opacity-60' : ''}>
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
