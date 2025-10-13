'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import StatusIcon from '@/assets/status-icon.svg';

export interface JobStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function JobStatusDropdown({ value, onChange, className }: JobStatusDropdownProps) {
  return (
    <div
      className={`relative inline-flex items-center gap-2 rounded-xl border border-[#D6DBE7] bg-white px-3 ${
        className ?? ''
      }`}
    >
      {typeof StatusIcon === 'string' ? (
        <Image src={StatusIcon} alt="Status" width={16} height={16} />
      ) : (
        <StatusIcon className=" text-[#99A1B3]" />
      )}
      <select
        className="h-9 w-32 appearance-none bg-transparent text-sm font-medium text-[#3B4152] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" className="bg-white">
          Status
        </option>
        <option value="Pending" className="bg-white">
          Pending
        </option>
        <option value="In-progress" className="bg-white">
          In-progress
        </option>
        <option value="Canceled">Canceled</option>
        <option value="Disputed">Disputed</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Custom icon */}
      <ChevronDown className=" text-[#99A1B3]" />
    </div>
  );
}
