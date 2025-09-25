'use client';

import React from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { ChevronsUpDown } from 'lucide-react'; // icons
import type { JobItem, SortConfig, JobSortKey } from '@/types/types';
import Button from '@/components/ui/Button';

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
    <div className="mx-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91]  rounded-2xl">
          <tr>
            <th className="px-6 py-3   cursor-pointer" onClick={() => handleSort('jobId')}>
              <span className="flex items-center gap-2">job id {getSortIcon('jobId')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('client')}>
              <span className="flex items-center gap-2"> Client{getSortIcon('client')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('serviceProvider')}>
              <span className="flex items-center gap-2">
                {' '}
                Service Provider{getSortIcon('serviceProvider')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('amount')}>
              <span className="flex items-center gap-2">Amount {getSortIcon('amount')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('startDate')}>
              <span className="flex items-center gap-2">Start date {getSortIcon('startDate')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('endDate')}>
              <span className="flex items-center gap-2">end date {getSortIcon('endDate')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('status')}>
              <span className="flex items-center gap-2">status{getSortIcon('status')}</span>
            </th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7]">
              <td className="px-4 py-6 text-[#3B4152]">
                <span className="flex items-center gap-3">{job.jobId}</span>
              </td>
              <td className="px-4 py-2 text-[#3B4152]">
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = job.client?.icon as unknown as React.ComponentType<
                      React.SVGProps<SVGSVGElement>
                    >;
                    return Icon ? <Icon className="rounded-full w-10 h-10 center" /> : null;
                  })()}
                  <p>{job.client?.name}</p>
                </div>
              </td>
              <td className="px-4 py-2 text-[#3B4152] flex items-center gap-4">
                {(() => {
                  const Icon = job.serviceProvider?.icon as unknown as React.ComponentType<
                    React.SVGProps<SVGSVGElement>
                  >;
                  return Icon ? <Icon className="rounded-full w-10 h-10 center" /> : null;
                })()}
                <div className="">
                  <p>{job.serviceProvider?.name}</p>
                  <p className="text-sm text-[#757C91]">{job.serviceProvider?.role}</p>
                </div>
              </td>
              <td className="px-4 py-2 text-[#3B4152]">{job.amount} NGN </td>
              <td className="px-4 py-2 text-[#3B4152]">{job.timeline?.started?.date}</td>
              <td className="px-4 py-2 text-[#3B4152]">{job.timeline?.ended?.date}</td>

              <td className="px-4 py-2">
                <JobsStatusBadge status={job.status} />
              </td>
              <td className="px-4 py-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onOpenJobDetails(job)}
                  className="!bg-transparent !border-0 w-full text-sm text-[#017441] capitalize font-medium underline cursor-pointer"
                >
                  View details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
