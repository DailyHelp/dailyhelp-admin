'use client';

// components/UsersTable.jsx
import React from 'react';
import Button from '@/components/ui/Button';
import type { FeedbackListItem } from '@/types/types';

function getInitials(name?: string) {
  if (!name) return 'FB';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'FB';
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
    return <Icon className="rounded-full w-10 h-10" />;
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF] text-sm font-semibold text-[#3B4152]">
      {initials}
    </span>
  );
}

export interface FeedbackJobsTableProps {
  jobs: FeedbackListItem[];
  onOpenJobDetails: (job: FeedbackListItem) => void;
}

export default function JobsUsersTable({ jobs, onOpenJobDetails }: FeedbackJobsTableProps) {
  return (
    <div className="mx-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91] rounded-2xl">
          <tr>
            <th className="px-6 py-3 cursor-pointer text-left">
              <span className="flex items-center gap-2"> Name</span>
            </th>
            <th className="px-6 py-3 cursor-pointer text-left">
              <span className="flex items-center gap-2"> Title</span>
            </th>
            <th className="px-6 py-3 cursor-pointer text-left">
              <span className="flex items-center gap-2">Date Submitted </span>
            </th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7] py-4 text-sm">
              <td className="px-6 py-4 text-[#3B4152] align-top">
                <div className="flex items-center gap-4">
                  {renderAvatar(job.icon, job.name)}
                  <div>
                    <p>{job.name}</p>
                    <p className="text-[#757C91]">{job.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-[#3B4152] align-top">{job.reportsDetails?.reason}</td>
              <td className="px-6 py-4 text-[#3B4152] align-top">{job.timeline?.submitted?.date}</td>

              <td className="px-6 py-4 align-top">
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
