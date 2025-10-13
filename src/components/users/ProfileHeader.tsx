'use client';

import React from 'react';
import Image from 'next/image';
import StatusBadge from '@/components/users/StatusBadge';
import DateIcon from '@/assets/dob-icon.svg';
import EmailIcon from '@/assets/email2-icon.svg';
import PhoneIcon from '@/assets/phone-icon.svg';
import VerificationIcon from '@/assets/verification-icon.svg';
import Button from '@/components/ui/Button';
import type { UserProfile } from '@/types/types';

function initialsFromName(name: string): string {
  const letters = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '');
  if (letters.length >= 2) {
    return `${letters[0]}${letters[1]}`;
  }
  if (letters.length === 1) {
    return letters[0];
  }
  return 'U';
}

export default function ProfileHeader({
  usersData,
  status,
  onOpenVerfication,
  handleSuspendClick,
}: {
  usersData: UserProfile;
  status: string;
  onOpenVerfication: () => void;
  handleSuspendClick: (u: UserProfile) => void;
}) {
  const initials = initialsFromName(usersData.name);

  const maybeAvatar = usersData.avatar as unknown;
  const AvatarContent = () => {
    if (maybeAvatar && typeof maybeAvatar === 'function') {
      const AvatarComp = maybeAvatar as React.ComponentType<React.SVGProps<SVGSVGElement>>;
      return <AvatarComp className="h-20 w-20 rounded-full object-cover" />;
    }
    if (typeof maybeAvatar === 'string' && maybeAvatar.trim().length > 0) {
      return (
        <Image
          src={maybeAvatar}
          alt={usersData.name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
        />
      );
    }

    return (
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E4F5E7] text-xl font-semibold text-[#017441]">
        {initials}
      </span>
    );
  };

  const statusLabel = status || usersData.status;
  const displayEmail = usersData.email || '—';
  const displayPhone = usersData.phone || '—';
  const displayDob = usersData.dob || '—';
  const displayGender = usersData.gender?.charAt(0)?.toUpperCase() ?? '—';

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 px-5 py-6">
      <div className="flex items-center gap-6">
        <AvatarContent />

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-2xl">
            <h2 className="text-[#0E171A] font-semibold">{usersData.name}</h2>
            <span className="rounded-full border border-[#D6DBE7] px-3 py-1 text-xs font-semibold text-[#47516B]">
              {displayGender}
            </span>
            <StatusBadge status={statusLabel} />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#47516B]">
            <span className="flex items-center gap-2">
              {typeof EmailIcon === 'string' ? (
                <Image src={EmailIcon} alt="Email" width={16} height={16} />
              ) : (
                <EmailIcon className="" />
              )}
              <span className="font-medium">{displayEmail}</span>
            </span>
            <span className="flex items-center gap-2">
              {typeof PhoneIcon === 'string' ? (
                <Image src={PhoneIcon} alt="Phone" width={16} height={16} />
              ) : (
                <PhoneIcon className="" />
              )}
              <span className="font-medium">{displayPhone}</span>
            </span>
            <span className="flex items-center gap-2">
              {typeof DateIcon === 'string' ? (
                <Image src={DateIcon} alt="Date of birth" width={16} height={16} />
              ) : (
                <DateIcon className="" />
              )}
              <span className="font-medium">{displayDob}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onOpenVerfication}
          variant="secondary"
          className="flex items-center gap-2 rounded-full border border-[#D6DBE7] bg-white px-4 py-2 text-sm font-semibold text-[#017441] hover:border-[#017441] hover:bg-[#F3FCF4]"
        >
          {typeof VerificationIcon === 'string' ? (
            <Image src={VerificationIcon} alt="Verification" width={16} height={16} />
          ) : (
            <VerificationIcon className="" />
          )}
          Verification info
        </Button>

        <Button
          onClick={() => handleSuspendClick(usersData)}
          variant="danger"
          className={`rounded-full px-5 py-2 text-sm font-semibold !text-white ${
            statusLabel === 'Suspended'
              ? '!bg-[#0D8941] hover:!bg-[#0a6f34]'
              : '!bg-[#F0443A] hover:!bg-[#d73b2f]'
          }`}
        >
          {statusLabel === 'Suspended' ? 'Reactivate' : 'Suspend'}
        </Button>
      </div>
    </div>
  );
}
