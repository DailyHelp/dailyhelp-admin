'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import StatusIcon from '@/assets/status-icon.svg';

export interface WalletStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function WalletStatusDropdown({
  value,
  onChange,
  className,
}: WalletStatusDropdownProps) {
  return (
    <div
      className={`relative inline-block border border-[#D6DBE7] rounded-xl px-3 bg-[#F9F9FB] ${className ?? ''}`}
    >
      <StatusIcon className="text-[#757C91] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <select
        className="appearance-none w-32 text-[#3B4152] text-sm focus:outline-none focus:ring-none py-2 pl-7"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" className="bg-white">
          Status
        </option>
        <option value="Pending" className="bg-white">
          Pending
        </option>
        <option value="Successful" className="bg-white">
          Successful
        </option>
        <option value="Failed" className="bg-white">
          Failed
        </option>
      </select>

      {/* Custom icon */}
      <ChevronDown className="text-[#757C91] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
