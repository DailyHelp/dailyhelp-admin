'use client';

import React from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { ChevronsUpDown } from 'lucide-react';
import ChatIcon from '@/assets/chat-icon.svg';
import type { ReportEntry, SortConfig, JobSortKey } from '@/types/types';
import Button from '@/components/ui/Button';

export type ReportsJobsTableSortConfig = SortConfig<JobSortKey>;

export interface ReportsJobsTableProps {
  jobs: ReportEntry[];
  onSortChange: (cfg: ReportsJobsTableSortConfig) => void;
  sortConfig: ReportsJobsTableSortConfig;
  onOpenJobDetails: (job: ReportEntry) => void;
  onOpenChat: (context: {
    job: ReportEntry;
    providerUuid?: string;
    customerUuid?: string;
  }) => void;
}

function getInitials(name?: string) {
  if (!name) return 'DH';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'DH';
  if (parts.length === 1) return parts[0]![0]!.toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
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
    const Icon = source as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    return <Icon className="h-10 w-10 rounded-full" />;
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
}: ReportsJobsTableProps) {
  const getSortIcon = (columnKey: JobSortKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    }
    return <ChevronsUpDown size={16} />;
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
      <table
        className="w-full min-w-[720px] border-collapse text-left"
        role="table"
        aria-label="Reports table"
      >
        <thead className="rounded-2xl bg-gray-50 text-xs uppercase text-[#757C91]">
          <tr>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('client')}>
              <span className="flex items-center gap-2">
                Reporter {getSortIcon('client')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('serviceProvider')}>
              <span className="flex items-center gap-2">
                Reported Party {getSortIcon('serviceProvider')}
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
              <span className="flex items-center gap-2">Status {getSortIcon('status')}</span>
            </th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white">
          {jobs.map((job) => {
            const providerUuid = job.serviceProvider?.uuid ?? job.reportedParty?.uuid;
            const customerUuid = job.client?.uuid ?? job.reporter?.uuid;
            const canOpenChat = Boolean(providerUuid && customerUuid);

            return (
              <tr key={job.jobId} className="border-b border-[#D6DBE7] py-4 text-sm">
              <td className="px-4 py-3 text-[#3B4152]">
                <div className="flex items-center gap-4">
                  {renderAvatar(job.reporter?.icon, job.reporter?.name)}
                  <div className="space-y-1 capitalize">
                    <p>{job.reporter?.name ?? '—'}</p>
                    {job.reporter?.service || job.reporter?.role ? (
                      <p className="text-sm text-[#757C91]">
                        {job.reporter?.service ?? job.reporter?.role}
                      </p>
                    ) : null}
                  </div>
                </div>
              </td>
              <td className="flex items-center gap-4 px-4 py-4 text-[#3B4152]">
                {renderAvatar(job.reportedParty?.icon, job.reportedParty?.name)}
                <div className="space-y-1 capitalize">
                  <p>{job.reportedParty?.name ?? '—'}</p>
                  {job.reportedParty?.role ? (
                    <p className="text-sm text-[#757C91]">{job.reportedParty.role}</p>
                  ) : null}
                </div>
              </td>
              <td className="px-4 py-4 text-[#3B4152]">{job.reason ?? '—'}</td>
              <td className="px-4 py-4 text-[#3B4152]">{job.timeline?.submitted?.date ?? '—'}</td>
              <td className="px-4 py-4">
                <JobsStatusBadge status={job.status} />
              </td>
              <td className="px-4 py-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onOpenJobDetails(job)}
                  className="w-full cursor-pointer !border-0 !bg-transparent text-sm font-medium capitalize text-[#017441] underline"
                >
                  View details
                </Button>
              </td>
              <td className="px-4 py-4">
                <Button
                  variant="icon"
                  className="rounded-xl border border-[#D6DBE7] px-[.5rem] py-2 !bg-transparent"
                  disabled={!canOpenChat}
                  onClick={() => {
                    if (!canOpenChat) return;
                    onOpenChat({ job, providerUuid, customerUuid });
                  }}
                >
                  <ChatIcon />
                </Button>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
