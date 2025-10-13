'use client';
import React from 'react';
import JobStatusDropdown from '../ui/JobStatusDropdown';
import SearchInput from '../ui/SearchInput';
import Button from '@/components/ui/Button';

export interface JobsFiltersBarProps {
  status: string;
  setStatus: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

export default function JobsFiltersBar({
  status,
  setStatus,
  search,
  setSearch,
}: JobsFiltersBarProps) {
  return (
    <div className="flex items-center gap-3">
      <JobStatusDropdown value={status} onChange={setStatus} className="w-fit" />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Job ID..."
      />
    </div>
  );
}
