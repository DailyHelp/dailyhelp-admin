'use client';

import JobStatusDropdown from '../ui/JobStatusDropdown';
import SearchInput from '../ui/SearchInput';

export default function JobsFiltersBar({ status, setStatus, search, setSearch }) {
  return (
    <div className="flex gap-4 ">
      <JobStatusDropdown value={status} onChange={setStatus} className="w-fit" />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Job ID..."
      />
    </div>
  );
}
