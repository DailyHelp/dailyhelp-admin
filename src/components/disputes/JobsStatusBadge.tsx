'use client';

// components/StatusBadge.jsx
import React from 'react';
import ProgressIcon from '@/assets/pending-icon.svg';
import CanceledIcon from '@/assets/canceled-icon.svg';
import DisputedIcon from '@/assets/disputed-icon.svg';
import VerifiedIcon from '@/assets/verified-icon.svg';
import PendingIcon from '@/assets/pending-gray-icon.svg';

export const statusStyles: Record<string, string> = {
  Pending: 'bg-[#FFF3EB] text-[#FF6B01] font-medium',
  Resolved: 'bg-[#E6FFF4] text-[#27A535] font-medium',
};

export default function JobsStatusBadge({ status = 'Pending' }: { status?: string }) {
  return (
    <span
      className={`w-fit relative text-xs rounded-sm font-bold flex px-2 py-1 items-center ${
        statusStyles[status] || 'bg-gray-100'
      }`}
    >
      {status}
    </span>
  );
}
