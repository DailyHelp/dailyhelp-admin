'use client';

import SlideOverModal from '@/components/ui/SlideOverModal';
import AddRoleForm from '@/components/team-members/AddRoleForm';
import type { Role } from '@/types/types';
import { mapRolePermissionsToKeys } from '@/features/team-members/permission-helpers';

export default function EditRoleSlideOver({
  open,
  onOpenChange,
  role,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
}) {
  const initialTitle = role?.title || '';
  const fallbackSelectedKeys = mapRolePermissionsToKeys(role);
  const initialSelectedKeys = role?.permissionCodes?.length
    ? role.permissionCodes
    : fallbackSelectedKeys;

  return (
    <SlideOverModal open={open} onOpenChange={onOpenChange} title="Edit role">
      <AddRoleForm
        initialTitle={initialTitle}
        initialSelectedKeys={initialSelectedKeys}
        submitLabel="Save changes"
        roleUuid={role?.uuid}
        onSuccess={() => onOpenChange?.(false)}
      />
    </SlideOverModal>
  );
}
