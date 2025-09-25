'use client';

// components/UsersTable.jsx
import React from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown } from 'lucide-react'; // icons
import ChatIcon from '@/assets/chat-icon.svg';

export default function JobsUsersTable({
  jobs,
  onSortChange,
  sortConfig,
  onOpenJobDetails,
  onOpenChat,
}) {
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
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('serviceprovider')}>
              <span className="flex items-center gap-2"> Client{getSortIcon('client')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('serviceprovider')}>
              <span className="flex items-center gap-2">
                {' '}
                Service Provider{getSortIcon('serviceprovider')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('reason')}>
              <span className="flex items-center gap-2">Reason {getSortIcon('reason')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('datesubmitted')}>
              <span className="flex items-center gap-2">
                Date submitted {getSortIcon('datesubmitted')}
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
                  <job.client.icon className="rounded-full w-10 h-10 center" />
                  <p>{job.client.name}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-[#3B4152] flex items-center gap-4">
                <job.client.icon className="rounded-full w-10 h-10 center" />
                <div className="space-y-2">
                  <p>{job.serviceProvider.name}</p>
                  <p className="text-sm text-[#757C91]">{job.serviceProvider.role}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-[#3B4152]">{job.reason} </td>
              <td className="px-4 py-4 text-[#3B4152]">{job.timeline.submitted.date}</td>

              <td className="px-4 py-4">
                <JobsStatusBadge status={job.status} />
              </td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => onOpenJobDetails(job)}
                  className="w-full text-sm text-[#017441] capitalize font-medium underline cursor-pointer"
                >
                  View details
                </button>
              </td>
              <td className="px-4 py-4 ">
                <button
                  className="border border-[#D6DBE7] rounded-xl text-center px-[.5rem] py-2"
                  onClick={() => {
                    onOpenChat(job.chat, job); // 👈 pass chat from props
                  }}
                >
                  <ChatIcon className="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
