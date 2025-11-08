'use client';

import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import JobsStatusBadge from './JobsStatusBadge';
import type { JobItem, SortConfig, JobSortKey } from '@/types/types';

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

function formatAmountDisplay(value?: string) {
  if (!value) {
    return '₦0';
  }

  return value.trim().startsWith('₦') ? value : `₦${value}`;
}

export type JobsTableSortConfig = SortConfig<JobSortKey>;

export interface JobsTableProps {
  jobs: JobItem[];
  onSortChange: (cfg: JobsTableSortConfig) => void;
  sortConfig: JobsTableSortConfig;
  onOpenJobDetails: (job: JobItem) => void;
}

export default function JobsUsersTable({
  jobs,
  onSortChange,
  sortConfig,
  onOpenJobDetails,
}: JobsTableProps) {
  const getSortIcon = (columnKey: JobSortKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    }
    return <ChevronsUpDown size={16} className="text-[#017441]" />;
  };

  const handleSort = (columnKey: JobSortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSortChange({ key: columnKey, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-left">
        <thead className="bg-[#F5F6FA] text-xs font-semibold uppercase text-[#757C91]">
          <tr>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('jobId')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                Job ID {getSortIcon('jobId')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('client')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                Client {getSortIcon('client')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('serviceProvider')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                Service Provider {getSortIcon('serviceProvider')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('amount')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                Amount {getSortIcon('amount')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('startDate')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                Start Date {getSortIcon('startDate')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('endDate')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                End Date {getSortIcon('endDate')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('status')}
                className="flex items-center gap-2 text-left font-semibold uppercase text-[#47516B]"
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase text-[#47516B]">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-[#3B4152]">
          {jobs.map((job) => {
            const clientAvatarSource = job.client?.icon as unknown;
            const providerAvatarSource = job.serviceProvider?.icon as unknown;
            const amountDisplay = formatAmountDisplay(job.amount);

            return (
              <tr key={job.jobId} className="border-b border-[#EAECF5] last:border-0">
                <td className="px-6 py-5 font-medium text-[#1E2538]">{job.jobId}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {renderAvatar(clientAvatarSource, job.client?.name)}
                    <div className="flex flex-col">
                      <span className="font-medium text-[#1E2538]">{job.client?.name ?? '—'}</span>
                      {job.client?.email && (
                        <span className="text-xs text-[#757C91]">{job.client.email}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {renderAvatar(providerAvatarSource, job.serviceProvider?.name)}
                    <div className="flex flex-col">
                      <span className="font-medium text-[#1E2538]">
                        {job.serviceProvider?.name ?? '—'}
                      </span>
                      {job.serviceProvider?.role && (
                        <span className="text-xs text-[#757C91]">{job.serviceProvider.role}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#1E2538]">{amountDisplay}</td>
                <td className="px-6 py-5 text-[#47516B]">
                  {job.timeline?.started?.date ?? '-'}
                </td>
                <td className="px-6 py-5 text-[#47516B]">{job.timeline?.ended?.date ?? '-'}</td>
                <td className="px-6 py-5">
                  <JobsStatusBadge status={job.status} />
                </td>
                <td className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => onOpenJobDetails(job)}
                    className="text-sm font-semibold text-[#017441] underline-offset-4 transition-colors hover:text-[#015c3a] hover:underline"
                  >
                    View details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
