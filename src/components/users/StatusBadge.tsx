'use client';
import React from 'react';
import PendingIcon from '@/assets/pending-icon.svg';
import FailedIcon from '@/assets/failed-icon.svg';
import SuspendIcon from '@/assets/suspend-icon.svg';
import VerifiedIcon from '@/assets/verified-icon.svg';

export const statusStyles: Record<string, string> = {
  Pending: 'bg-[#FFF3EB] text-[#FF6B01] font-medium',
  Failed: 'bg-[#FEF6F6] text-[#F0443A]  font-medium',
  Suspended: 'bg-[#FEF6F6] text-[#F0443A]  font-medium',
  Verified: 'bg-[#E6FFF4] text-[#27A535]  font-medium',
};

export const statusIcons: Record<string, React.ReactNode> = {
  Pending: <PendingIcon className="mr-1 " />,
  Failed: <FailedIcon className="mr-1" />,
  Suspended: <SuspendIcon className="mr-1" />,
  Verified: <VerifiedIcon className="mr-1" />,
};

export interface StatusBadgeProps {
  status: 'Pending' | 'Failed' | 'Suspended' | 'Verified' | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`
        "w-fit relative text-xs rounded-sm font-bold flex px-2 py-1 w-fit pl-6   items-center",
        ${statusStyles[status] || 'bg-gray-100'}
      `}
    >
      <span className="absolute left-2 top-1/4">{statusIcons[status]}</span>

      {status}
    </span>
  );
}
