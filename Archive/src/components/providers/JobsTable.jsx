'use client';

// components/UsersTable.jsx
import React from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown } from 'lucide-react'; // icons

export default function JobsUsersTable({ jobs, onSortChange, sortConfig, onOpenJobDetails }) {
  const router = useRouter();

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey)
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronsUpDown size={16} />
    ) : (
      <ChevronsUpDown size={16} />
    );
  };

  const handleSort = (columnKey) => {
    let direction = 'asc';
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
            <th className="px-6 py-3   cursor-pointer" onClick={() => handleSort('jobid')}>
              <span className="flex items-center gap-2">job id {getSortIcon('jobid')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('serviceprovider')}>
              <span className="flex items-center gap-2">
                {' '}
                Service Provider{getSortIcon('serviceprovider')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('amount')}>
              <span className="flex items-center gap-2">Amount {getSortIcon('amount')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('startdate')}>
              <span className="flex items-center gap-2">Start date {getSortIcon('startdate')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('enddate')}>
              <span className="flex items-center gap-2">end date {getSortIcon('enddate')}</span>
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
                <div>
                  <p>{job.serviceProvider.name}</p>
                  <p className="text-sm text-[#757C91]">{job.serviceProvider.role}</p>
                </div>
              </td>
              <td className="px-4 py-2 text-[#3B4152]">{job.amount} NGN </td>
              <td className="px-4 py-2 text-[#3B4152]">{job.timeline.started.date}</td>
              <td className="px-4 py-2 text-[#3B4152]">{job.timeline.ended.date}</td>

              <td className="px-4 py-2">
                <JobsStatusBadge status={job.status} />
              </td>
              <td className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => onOpenJobDetails(job)}
                  className="w-full text-sm text-[#017441] capitalize font-medium underline cursor-pointer"
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
