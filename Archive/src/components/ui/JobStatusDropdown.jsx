'use client';
import { ChevronDown } from 'lucide-react';
import StatusIcon from '@/assets/status-icon.svg';

export default function JobStatusDropdown({ value, onChange }) {
  return (
    <div className="relative inline-block border border-[#D6DBE7] rounded-xl px-3 bg-[#F9F9FB]">
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
        <option value="InProgress" className="bg-white">
          InProgress
        </option>
        <option value="Canceled">Canceled</option>
        <option value="Disputed">Disputed</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Custom icon */}
      <ChevronDown className="text-[#757C91] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
