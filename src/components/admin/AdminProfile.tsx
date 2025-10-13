'use client';

import { useMemo, useState } from 'react';
import MailIcon from '@/assets/admin-mail-icon.svg';
import RoleIcon from '@/assets/role-icon.svg';
import LockIcon from '@/assets/admin-pw-icon.svg';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Button from '@/components/ui/Button';
import UpdatePasswordModal from './UpdatePasswordModal';
import { useAuthStore } from '@/features/auth/store';

const getDisplayName = (
  fullName?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
) => {
  if (fullName && fullName.trim().length > 0) {
    return fullName;
  }
  const names = [firstName, lastName].filter(Boolean);
  if (names.length > 0) {
    return names.join(' ');
  }
  return email ?? 'Admin';
};

const getInitial = (name: string) => {
  return name.trim() ? name.trim().charAt(0).toUpperCase() : '?';
};

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const { user, roles } = useAuthStore((state) => ({
    user: state.user,
    roles: state.roles,
  }));

  const displayName = useMemo(
    () => getDisplayName(user?.fullName, user?.firstName, user?.lastName, user?.email),
    [user],
  );
  const initial = useMemo(() => getInitial(displayName), [displayName]);
  const primaryRole = roles?.[0]?.name ?? 'Administrator';

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8FA] px-6 py-10">
      <div className="w-full max-w-[520px] rounded-[32px] border border-[#F1F2F4] bg-white p-12 text-center shadow-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#121921] text-3xl font-semibold text-white">
          {initial}
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#121921]">{displayName}</h2>

        <div className="mt-6 space-y-3 text-sm font-medium text-[#3B4152]">
          <div className="flex items-center justify-center gap-2">
            <MailIcon className="" />
            <span>{user?.email ?? '—'}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RoleIcon className="" />
            <span>{primaryRole}</span>
          </div>
        </div>

        <div className="mt-10">
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-2 rounded-full border border-[#017441] bg-transparent px-5 py-3 text-sm font-semibold text-[#017441] transition hover:bg-[#E5F4EE]"
            onClick={() => setOpen(true)}
          >
            <LockIcon className="" />
            Update password
          </Button>
        </div>
      </div>

      <SlideOverModal open={open} onOpenChange={setOpen} title="Update password">
        <UpdatePasswordModal onSuccess={() => setOpen(false)} />
      </SlideOverModal>
    </div>
  );
}
