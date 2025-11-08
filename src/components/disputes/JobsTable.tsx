'use client';

import React from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { ChevronsUpDown } from 'lucide-react'; // icons
import ChatIcon from '@/assets/chat-icon.svg';
import Button from '@/components/ui/Button';
import type { JobItem, SortConfig, JobSortKey } from '@/types/types';

export type DisputesJobsTableSortConfig = SortConfig<JobSortKey>;

export interface DisputesJobsTableProps {
  jobs: JobItem[];
  onSortChange: (cfg: DisputesJobsTableSortConfig) => void;
  sortConfig: DisputesJobsTableSortConfig;
  onOpenJobDetails: (job: JobItem) => void;
  onOpenChat: (chat: any, job: JobItem) => void;
}

function getInitials(name?: string): string {
  if (!name) {
    return 'DH';
  }
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) {
    return 'DH';
  }
  if (parts.length === 1) {
    return parts[0]?.[0]?.toUpperCase() ?? 'D';
  }
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return `${first}${last}`.toUpperCase();
}

function renderAvatar(source: unknown, fallbackName?: string) {
  const initials = getInitials(fallbackName);

  if (typeof source === 'string' && source.trim().length > 0) {
    return (
      <img
        src={source}
        alt={fallbackName ?? 'Avatar'}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  if (typeof source === 'function') {
    const Component = source as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    return <Component className="h-10 w-10 rounded-full" />;
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF] text-sm font-semibold text-[#3B4152]">
      {initials}
    </span>
  );
}

export default function JobsUsersTable({
  jobs,
  onSortChange,
  sortConfig,
  onOpenJobDetails,
  onOpenChat,
}: DisputesJobsTableProps) {
  const getSortIcon = (columnKey: JobSortKey) => {
    if (sortConfig.key !== columnKey)
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronsUpDown size={16} />
    ) : (
      <ChevronsUpDown size={16} />
    );
  };

  const handleSort = (columnKey: JobSortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSortChange({ key: columnKey, direction });
  };

  return (
    <div className="mx-6 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left border-collapse" role="table" aria-label="Disputes table">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91]  rounded-2xl">
          <tr>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('client')}>
              <span className="flex items-center gap-2"> Client{getSortIcon('client')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('serviceProvider')}>
              <span className="flex items-center gap-2">
                {' '}
                Service Provider{getSortIcon('serviceProvider')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('reason')}>
              <span className="flex items-center gap-2">Reason {getSortIcon('reason')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('dateSubmitted')}>
              <span className="flex items-center gap-2">
                Date submitted {getSortIcon('dateSubmitted')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('status')}>
              <span className="flex items-center gap-2">status{getSortIcon('status')}</span>
            </th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7] py-4 text-sm">
              <td className="px-4 py-3 text-[#3B4152]">
                <div className="flex items-center gap-4">
                  {renderAvatar(job.client?.icon, job.client?.name)}
                  <p>{job.client?.name}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-[#3B4152] flex items-center gap-4">
                {renderAvatar(job.serviceProvider?.icon, job.serviceProvider?.name)}
                <div className="space-y-2">
                  <p>{job.serviceProvider?.name}</p>
                  <p className="text-sm text-[#757C91]">{job.serviceProvider?.role}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-[#3B4152]">{(job as any).reason ?? '—'} </td>
              <td className="px-4 py-4 text-[#3B4152]">{job.timeline?.submitted?.date ?? '—'}</td>

              <td className="px-4 py-4">
                <JobsStatusBadge status={job.status} />
              </td>
              <td className="px-4 py-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onOpenJobDetails(job)}
                  className="!bg-transparent !border-0 w-full text-sm text-[#017441] capitalize font-medium underline cursor-pointer"
                >
                  View details
                </Button>
              </td>
              <td className="px-4 py-4 ">
                <Button
                  variant="icon"
                  className="border border-[#D6DBE7] rounded-xl text-center px-[.5rem] py-2 !bg-transparent"
                  onClick={() => {
                    onOpenChat(job.chat, job); // 👈 pass chat from props
                  }}
                >
                  <ChatIcon className="" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
