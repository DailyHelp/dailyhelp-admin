'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import StatusIcon from '@/assets/status-icon.svg';

const DEFAULT_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'All roles', value: '' },
  { label: 'Super admin', value: 'Super admin' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Customer service', value: 'Customer service' },
];

export interface TeamsStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  options?: Array<{ label: string; value: string }>;
}

export default function TeamsStatusDropdown({
  value,
  onChange,
  className,
  options,
}: TeamsStatusDropdownProps) {
  const items = options && options.length > 0 ? options : DEFAULT_OPTIONS;

  return (
    <div
      className={`relative inline-flex items-center gap-2 rounded-xl border border-[#D6DBE7] bg-white px-3 ${
        className ?? ''
      }`}
    >
      <StatusIcon className="text-[#757C91]" />
      <div className="relative flex-1">
        <select
          className="h-9 w-36 appearance-none bg-transparent pr-6 text-sm font-medium text-[#3B4152] focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value} className="bg-white">
              {item.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none text-[#99A1B3] absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
