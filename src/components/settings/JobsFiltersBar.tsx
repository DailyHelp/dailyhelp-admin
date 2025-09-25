'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';

export interface JobsFiltersBarProps {
  jobs?: unknown[];
  status?: string;
  setStatus?: (s: string) => void;
  search?: string;
  setSearch?: (s: string) => void;
  onOpenJobDetails: () => void;
}

export default function JobsFiltersBar({
  jobs,
  status,
  setStatus,
  search,
  setSearch,
  onOpenJobDetails,
}: JobsFiltersBarProps) {
  return (
    <div className="flex gap-4 ">
      <Button
        className="flex items-center gap-2 text-sm bg-[#017441] text-white font-semibold py-2 px-3 rounded-xl"
        onClick={() => onOpenJobDetails()}
      >
        <Plus size={18} />
        Add Category
      </Button>
    </div>
  );
}
