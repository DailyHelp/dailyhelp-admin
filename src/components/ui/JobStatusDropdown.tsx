'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import StatusIcon from '@/assets/status-icon.svg';

const DEFAULT_STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Status', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'In-progress', value: 'In-progress' },
  { label: 'Canceled', value: 'Canceled' },
  { label: 'Disputed', value: 'Disputed' },
  { label: 'Completed', value: 'Completed' },
];

export interface JobStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  options?: Array<{ label: string; value: string }>;
}

export default function JobStatusDropdown({
  value,
  onChange,
  className,
  options,
}: JobStatusDropdownProps) {
  const items = options && options.length > 0 ? options : DEFAULT_STATUS_OPTIONS;

  return (
    <div
      className={`relative inline-flex items-center gap-2 rounded-xl border border-[#D6DBE7] bg-white px-3 ${
        className ?? ''
      }`}
    >
      {typeof StatusIcon === 'string' ? (
        <Image src={StatusIcon} alt="Status" width={16} height={16} />
      ) : (
        <StatusIcon className="text-[#99A1B3]" />
      )}
      <select
        className="h-9 appearance-none bg-transparent pr-6 text-sm font-medium text-[#3B4152] focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value} className="bg-white">
            {item.label}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none text-[#99A1B3]" />
    </div>
  );
}
