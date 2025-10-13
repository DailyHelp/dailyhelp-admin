'use client';
import React from 'react';
import ProgressIcon from '@/assets/pending-icon.svg';
import CanceledIcon from '@/assets/canceled-icon.svg';
import DisputedIcon from '@/assets/disputed-icon.svg';
import VerifiedIcon from '@/assets/verified-icon.svg';
import PendingIcon from '@/assets/pending-gray-icon.svg';
import Image from 'next/image';

type NormalizedStatus = 'Pending' | 'In-progress' | 'Canceled' | 'Disputed' | 'Completed';

const STATUS_META: Record<NormalizedStatus, { className: string; icon: React.ReactNode }> = {
  Pending: {
    className: 'bg-[#F5F7FB] text-[#5B6475]',
    icon:
      typeof PendingIcon === 'string' ? (
        <Image src={PendingIcon} alt="Pending" width={14} height={14} />
      ) : (
        <PendingIcon className="h-3.5 w-3.5" />
      ),
  },
  'In-progress': {
    className: 'bg-[#FFF3EB] text-[#FF8A32]',
    icon:
      typeof ProgressIcon === 'string' ? (
        <Image src={ProgressIcon} alt="In progress" width={14} height={14} />
      ) : (
        <ProgressIcon className="h-3.5 w-3.5" />
      ),
  },
  Canceled: {
    className: 'bg-[#FEF1F1] text-[#EA3829]',
    icon:
      typeof CanceledIcon === 'string' ? (
        <Image src={CanceledIcon} alt="Canceled" width={14} height={14} />
      ) : (
        <CanceledIcon className="h-3.5 w-3.5" />
      ),
  },
  Disputed: {
    className: 'bg-[#FEF1F1] text-[#EA3829]',
    icon:
      typeof DisputedIcon === 'string' ? (
        <Image src={DisputedIcon} alt="Disputed" width={14} height={14} />
      ) : (
        <DisputedIcon className="h-3.5 w-3.5" />
      ),
  },
  Completed: {
    className: 'bg-[#E6FFF4] text-[#0D8941]',
    icon:
      typeof VerifiedIcon === 'string' ? (
        <Image src={VerifiedIcon} alt="Completed" width={14} height={14} />
      ) : (
        <VerifiedIcon className="h-3.5 w-3.5" />
      ),
  },
};

function normalizeStatus(rawStatus?: string): NormalizedStatus {
  if (!rawStatus) {
    return 'Pending';
  }

  const lowered = rawStatus.toLowerCase();
  if (lowered.includes('progress')) {
    return 'In-progress';
  }
  if (lowered.includes('cancel')) {
    return 'Canceled';
  }
  if (lowered.includes('disput')) {
    return 'Disputed';
  }
  if (lowered.includes('complete')) {
    return 'Completed';
  }
  return 'Pending';
}

export interface JobsStatusBadgeProps {
  status?: string;
  className?: string;
}

export default function JobsStatusBadge({ status, className }: JobsStatusBadgeProps) {
  const normalized = normalizeStatus(status);
  const meta = STATUS_META[normalized];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.className} ${className ?? ''}`}
    >
      <span>{meta.icon}</span>
      {normalized}
    </span>
  );
}
