'use client';

// components/StatusBadge.jsx
import React from 'react';
import ProgressIcon from '@/assets/pending-icon.svg';
import CanceledIcon from '@/assets/canceled-icon.svg';
import DisputedIcon from '@/assets/disputed-icon.svg';
import VerifiedIcon from '@/assets/verified-icon.svg';
import PendingIcon from '@/assets/pending-gray-icon.svg';

export const statusStyles = {
  Pending: 'bg-[#F9F9FB] text-[#757C91] font-medium',
  InProgress: 'bg-[#FFF3EB] text-[#FF6B01] font-medium',
  Canceled: 'bg-[#FEF6F6] text-[#F0443A]  font-medium',
  Disputed: 'bg-[#FEF6F6] text-[#F0443A]  font-medium',
  Completed: 'bg-[#E6FFF4] text-[#27A535]  font-medium',
};

export const statusIcons = {
  Pending: <PendingIcon className="mr-1 " />,
  InProgress: <ProgressIcon className="mr-1 " />,
  Canceled: <CanceledIcon className="mr-1" />,
  Disputed: <DisputedIcon className="mr-1" />,
  Completed: <VerifiedIcon className="mr-1" />,
};

export default function JobsStatusBadge({ status }) {
  return (
    <span
      className={`
        "w-fit relative text-xs rounded-sm font-bold flex px-2 py-1 w-fit pl-6 items-center",
        ${statusStyles[status]} || "bg-gray-100 "
      `}
    >
      <span className="absolute left-2 top-1/4">{statusIcons[status]}</span>

      {status}
    </span>
  );
}
