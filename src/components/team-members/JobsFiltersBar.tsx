'use client';

import TeamsStatusDropdown from '../ui/TeamsStatusDropdown';
import SearchInput from '../ui/SearchInput';
import { Plus } from 'lucide-react';

import Button from '@/components/ui/Button';

export default function JobsFiltersBar({
  roleFilter,
  setRoleFilter,
  search,
  setSearch,
  onOpenJobDetails,
  roleOptions,
}: {
  roleFilter: string;
  setRoleFilter: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  onOpenJobDetails: () => void;
  roleOptions: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="flex gap-4 ">
      <TeamsStatusDropdown
        value={roleFilter}
        onChange={setRoleFilter}
        className="w-fit"
        options={roleOptions}
      />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user "
      />

      <Button onClick={() => onOpenJobDetails()} className="flex items-center gap-2">
        <Plus size={18} /> Add member
      </Button>
    </div>
  );
}
