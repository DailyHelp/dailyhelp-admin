'use client';

import React from 'react';

const STATUS_META: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-[#FFF3EB] text-[#FF6B01]' },
  FAILED: { label: 'Failed', className: 'bg-[#FEF6F6] text-[#F0443A]' },
  SUCCESS: { label: 'Successful', className: 'bg-[#E6FFF4] text-[#27A535]' },
  SUCCESSFUL: { label: 'Successful', className: 'bg-[#E6FFF4] text-[#27A535]' },
};

export default function WalletsStatusBadge({ status }: { status: string }) {
  const key = status?.toUpperCase?.() ?? '';
  const meta = STATUS_META[key] ?? { label: status || '—', className: 'bg-gray-100 text-[#47516B]' };

  return (
    <span className={`flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}>
      {meta.label}
    </span>
  );
}
