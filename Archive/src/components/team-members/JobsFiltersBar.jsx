'use client';

import TeamsStatusDropdown from '../ui/TeamsStatusDropdown';
import SearchInput from '../ui/SearchInput';
import { Plus } from 'lucide-react';

export default function JobsFiltersBar({
  jobs,
  status,
  setStatus,
  search,
  setSearch,
  onOpenJobDetails,
}) {
  return (
    <div className="flex gap-4 ">
      <TeamsStatusDropdown value={status} onChange={setStatus} className="w-fit" />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user "
      />

      <button
        className="flex items-center gap-2 text-sm bg-[#017441] text-white font-semibold py-2 px-3 rounded-xl"
        onClick={() => onOpenJobDetails()}
      >
        <Plus size={18} />
        Add member
      </button>
    </div>
  );
}
