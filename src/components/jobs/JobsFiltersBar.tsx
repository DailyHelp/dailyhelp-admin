'use client';

import JobStatusDropdown from '../ui/JobStatusDropdown';
import SearchInput from '../ui/SearchInput';

export interface JobsFiltersBarProps {
  status: string;
  setStatus: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  className?: string;
}

export default function JobsFiltersBar({
  status,
  setStatus,
  search,
  setSearch,
  className,
}: JobsFiltersBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ''}`}>
      <JobStatusDropdown value={status} onChange={setStatus} className="w-[130px]" />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Job ID..."
        className="min-w-[220px] max-w-[260px]"
      />
    </div>
  );
}
