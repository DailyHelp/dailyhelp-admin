'use client';

// components/UsersTable.jsx
import React from 'react';
import Button from '@/components/ui/Button';
import type { FeedbackListItem } from '@/types/types';

export interface FeedbackJobsTableProps {
  jobs: FeedbackListItem[];
  onOpenJobDetails: (job: FeedbackListItem) => void;
}

export default function JobsUsersTable({ jobs, onOpenJobDetails }: FeedbackJobsTableProps) {
  return (
    <div className="mx-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91]  rounded-2xl">
          <tr>
            <th className="px-6 py-3  cursor-pointer">
              <span className="flex items-center gap-2"> Name</span>
            </th>
            <th className="px-6 py-3  cursor-pointer">
              <span className="flex items-center gap-2"> Title</span>
            </th>
            <th className="px-6 py-3 cursor-pointer">
              <span className="flex items-center gap-2">Date Submitted </span>
            </th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7] py-4 text-sm">
              <td className="px-4 py-3 text-[#3B4152]">
                <div className="flex items-center gap-4 ">
                  {(() => {
                    const Icon = job.icon as unknown as React.ComponentType<
                      React.SVGProps<SVGSVGElement>
                    >;
                    return Icon ? <Icon className="rounded-full w-10 h-10 center" /> : null;
                  })()}
                  <div>
                    <p>{job.name}</p>
                    <p className="text-[#757C91]">{job.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-[#3B4152]">{job.reportsDetails?.reason} </td>
              <td className="px-4 py-4 text-[#3B4152]">{job.timeline?.submitted?.date}</td>

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
