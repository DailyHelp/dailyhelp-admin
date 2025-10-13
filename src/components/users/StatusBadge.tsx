'use client';

import React from 'react';
import PendingIcon from '@/assets/pending-icon.svg';
import FailedIcon from '@/assets/failed-icon.svg';
import SuspendIcon from '@/assets/suspend-icon.svg';
import VerifiedIcon from '@/assets/verified-icon.svg';
import Image from 'next/image';
import type { AdminCustomerStatus } from '@/features/users/types';

type SupportedStatus =
  | AdminCustomerStatus
  | 'PENDING'
  | 'Pending'
  | 'FAILED'
  | 'Failed'
  | 'Suspended'
  | 'Verified';

interface StatusMeta {
  label: string;
  className: string;
  icon: React.ReactNode;
}

const STATUS_META: Record<string, StatusMeta> = {
  VERIFIED: {
    label: 'Verified',
    className: 'bg-[#E6FFF4] text-[#0D8941]',
    icon:
      typeof VerifiedIcon === 'string' ? (
        <Image src={VerifiedIcon} alt="Verified" width={14} height={14} />
      ) : (
        <VerifiedIcon className="h-3.5 w-3.5" />
      ),
  },
  SUSPENDED: {
    label: 'Suspended',
    className: 'bg-[#FFF1F0] text-[#EA3829]',
    icon:
      typeof SuspendIcon === 'string' ? (
        <Image src={SuspendIcon} alt="Suspended" width={14} height={14} />
      ) : (
        <SuspendIcon className="h-3.5 w-3.5" />
      ),
  },
  UNVERIFIED: {
    label: 'Pending',
    className: 'bg-[#FFF5E6] text-[#E98306]',
    icon:
      typeof PendingIcon === 'string' ? (
        <Image src={PendingIcon} alt="Pending" width={14} height={14} />
      ) : (
        <PendingIcon className="h-3.5 w-3.5" />
      ),
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-[#FFF1F0] text-[#EA3829]',
    icon:
      typeof FailedIcon === 'string' ? (
        <Image src={FailedIcon} alt="Failed" width={14} height={14} />
      ) : (
        <FailedIcon className="h-3.5 w-3.5" />
      ),
  },
};

function normalizeStatus(status: SupportedStatus): StatusMeta {
  const base = String(status).toUpperCase();
  if (STATUS_META[base]) {
    return STATUS_META[base];
  }

  if (base === 'PENDING') {
    return STATUS_META.UNVERIFIED;
  }

  if (base === 'FAILED') {
    return STATUS_META.FAILED;
  }

  return STATUS_META.UNVERIFIED;
}

export interface StatusBadgeProps {
  status: SupportedStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const meta = normalizeStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.className} ${className ?? ''}`}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
}
