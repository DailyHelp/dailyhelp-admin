'use client';

// components/StatusBadge.jsx
import React from 'react';

export const statusStyles = {
  Pending: 'bg-[#FFF3EB] text-[#FF6B01] font-medium',
  Failed: 'bg-[#FEF6F6] text-[#F0443A]  font-medium',
  Successful: 'bg-[#E6FFF4] text-[#27A535]  font-medium',
};

export default function WalletsStatusBadge({ status }) {
  return (
    <span
      className={`
        "w-fit relative text-xs rounded-sm font-bold flex px-2 py-1 w-fit  items-center",
        ${statusStyles[status]} || "bg-gray-100 "
      `}
    >
      {status}
    </span>
  );
}
