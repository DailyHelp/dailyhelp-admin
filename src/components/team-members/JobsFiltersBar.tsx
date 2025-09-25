'use client';

import TeamsStatusDropdown from '../ui/TeamsStatusDropdown';
import SearchInput from '../ui/SearchInput';
import { Plus } from 'lucide-react';

import type { TeamMember } from '@/types/types';
import Button from '@/components/ui/Button';

export default function JobsFiltersBar({
  jobs,
  status,
  setStatus,
  search,
  setSearch,
  onOpenJobDetails,
}: {
  jobs: TeamMember[];
  status: string;
  setStatus: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  onOpenJobDetails: () => void;
}) {
  return (
    <div className="flex gap-4 ">
      <TeamsStatusDropdown value={status} onChange={setStatus} className="w-fit" />
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
