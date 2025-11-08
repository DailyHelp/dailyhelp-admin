'use client';

// components/StatusBadge.jsx
import React from 'react';
import ProgressIcon from '@/assets/pending-icon.svg';
import CanceledIcon from '@/assets/canceled-icon.svg';
import DisputedIcon from '@/assets/disputed-icon.svg';
import VerifiedIcon from '@/assets/verified-icon.svg';
import PendingIcon from '@/assets/pending-gray-icon.svg';

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; icon: React.ReactNode | null }
> = {
  pending: {
    label: 'Pending',
    className: 'bg-[#F2F3F5] text-[#757C91]',
    icon: <PendingIcon className="mr-1" />,
  },
  in_progress: {
    label: 'In-progress',
    className: 'bg-[#FFF3EB] text-[#FF6B01]',
    icon: <ProgressIcon className="mr-1" />,
  },
  ongoing: {
    label: 'Ongoing',
    className: 'bg-[#FFF3EB] text-[#FF6B01]',
    icon: <ProgressIcon className="mr-1" />,
  },
  canceled: {
    label: 'Canceled',
    className: 'bg-[#FEF6F6] text-[#F0443A]',
    icon: <CanceledIcon className="mr-1" />,
  },
  cancelled: {
    label: 'Canceled',
    className: 'bg-[#FEF6F6] text-[#F0443A]',
    icon: <CanceledIcon className="mr-1" />,
  },
  disputed: {
    label: 'Disputed',
    className: 'bg-[#FEF6F6] text-[#F0443A]',
    icon: <DisputedIcon className="mr-1" />,
  },
  completed: {
    label: 'Completed',
    className: 'bg-[#E6FFF4] text-[#27A535]',
    icon: <VerifiedIcon className="mr-1" />,
  },
};

function normalizeStatus(value: string | undefined): string {
  if (!value) {
    return 'pending';
  }
  return value.toString().trim().toLowerCase().replace(/\s+/g, '_');
}

export default function JobsStatusBadge({ status = 'Pending' }: { status?: string }) {
  const normalized = normalizeStatus(status);
  const config = STATUS_CONFIG[normalized] ?? STATUS_CONFIG.pending;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
