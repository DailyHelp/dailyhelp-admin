'use client';

import React from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { ChevronsUpDown } from 'lucide-react';
import type { JobItem, SortConfig, JobSortKey } from '@/types/types';

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
  const renderSortIcon = (columnKey: JobSortKey) => {
    const isActive = sortConfig.key === columnKey;
    return (
      <ChevronsUpDown
        size={16}
        className={isActive ? 'text-[#017441]' : 'text-[#C0C5D6]'}
      />
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
    <div className="overflow-hidden rounded-3xl border border-[#EAECF5] bg-white">
      <table className="w-full min-w-[720px] border-collapse" role="table" aria-label="User jobs table">
        <thead className="bg-[#F5F6FA] text-xs font-semibold uppercase text-[#757C91]">
          <tr>
            <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('jobId')}>
              <span className="flex items-center gap-2 text-[#47516B]">
                Job Id {renderSortIcon('jobId')}
              </span>
            </th>
            <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('serviceProvider')}>
              <span className="flex items-center gap-2 text-[#47516B]">
                Service Provider
                {renderSortIcon('serviceProvider')}
              </span>
            </th>
            <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('amount')}>
              <span className="flex items-center gap-2 text-[#47516B]">
                Amount
                {renderSortIcon('amount')}
              </span>
            </th>
            <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('startDate')}>
              <span className="flex items-center gap-2 text-[#47516B]">
                Start Date
                {renderSortIcon('startDate')}
              </span>
            </th>
            <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('endDate')}>
              <span className="flex items-center gap-2 text-[#47516B]">
                End Date
                {renderSortIcon('endDate')}
              </span>
            </th>
            <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('status')}>
              <span className="flex items-center gap-2 text-[#47516B]">
                Status
                {renderSortIcon('status')}
              </span>
            </th>
            <th className="px-6 py-4 text-[#47516B]">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-[#3B4152]">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#EAECF5] last:border-0">
              <td className="px-6 py-5">
                <p className="font-semibold text-[#1E2538]">#{job.jobId}</p>
              </td>
              <td className="px-6 py-5">
                <div className="space-y-0.5">
                  <p className="font-medium text-[#1E2538]">{job.serviceProvider?.name ?? '—'}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#99A1B3]">
                    {job.serviceProvider?.role ?? '—'}
                  </p>
                </div>
              </td>
              <td className="px-6 py-5 font-semibold text-[#1E2538]">
                {job.amount ? `₦${job.amount}` : '—'}
              </td>
              <td className="px-6 py-5 text-[#47516B]">
                {job.timeline?.started?.date ?? '—'}
              </td>
              <td className="px-6 py-5 text-[#47516B]">
                {job.timeline?.ended?.date ?? '—'}
              </td>

              <td className="px-6 py-5">
                <JobsStatusBadge status={job.status} />
              </td>
              <td className="px-6 py-5">
                <button
                  type="button"
                  onClick={() => onOpenJobDetails(job)}
                  className="text-sm font-semibold text-[#017441] underline-offset-4 transition-colors hover:text-[#015c3a] hover:underline"
                >
                  View more
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
