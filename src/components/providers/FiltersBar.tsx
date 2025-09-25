'use client';

import StatusDropdown from '../ui/StatusDropdown';
import SearchInput from '../ui/SearchInput';

export interface ProvidersFiltersBarProps {
  status: string;
  setStatus: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

export default function FiltersBar({
  status,
  setStatus,
  search,
  setSearch,
}: ProvidersFiltersBarProps) {
  return (
    <div className="flex gap-4 ">
      <StatusDropdown value={status} onChange={setStatus} />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user"
      />
    </div>
  );
}
