'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import StatusIcon from '@/assets/status-icon.svg';

export interface StatusDropdownOption {
  label: string;
  value: string;
}

export interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  options?: StatusDropdownOption[];
  placeholder?: string;
}

const defaultOptions: StatusDropdownOption[] = [
  { value: '', label: 'All status' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Suspended', label: 'Suspended' },
  { value: 'Failed', label: 'Failed' },
  { value: 'Verified', label: 'Verified' },
];

export default function StatusDropdown({
  value,
  onChange,
  className,
  options = defaultOptions,
  placeholder,
}: StatusDropdownProps) {
  return (
    <div
      className={`relative inline-block border border-[#D6DBE7] rounded-xl px-3 bg-[#F9F9FB] ${className ?? ''}`}
    >
      <StatusIcon className="text-[#757C91] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <select
        className="appearance-none text-[#3B4152] focus:outline-none focus:ring-none py-2 pl-7"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder ? (
          <option value="" className="bg-white">
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white">
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom icon */}
      <ChevronDown className="text-[#757C91] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
