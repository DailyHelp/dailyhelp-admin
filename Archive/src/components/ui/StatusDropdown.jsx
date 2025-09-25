'use client';
import { ChevronDown } from 'lucide-react';
import StatusIcon from '@/assets/status-icon.svg';

export default function StatusDropdown({ value, onChange }) {
  return (
    <div className="relative inline-block border border-[#D6DBE7] rounded-xl px-3 bg-[#F9F9FB]">
      <StatusIcon className="text-[#757C91] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <select
        className="appearance-none text-[#3B4152] focus:outline-none focus:ring-none py-2 pl-7"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" className="bg-white">
          Status
        </option>
        <option value="Pending" className="bg-white">
          Pending
        </option>
        <option value="Suspended">Suspended</option>
        <option value="Failed">Failed</option>
        <option value="Verified">Verified</option>
      </select>

      {/* Custom icon */}
      <ChevronDown className="text-[#757C91] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
