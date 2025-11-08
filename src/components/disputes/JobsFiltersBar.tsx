'use client';

import JobStatusDropdown from '../ui/JobStatusDropdown';

export default function JobsFiltersBar({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (s: string) => void;
}) {
  return (
    <div className="flex gap-4">
      <JobStatusDropdown value={status} onChange={setStatus} className="w-fit" />
    </div>
  );
}
