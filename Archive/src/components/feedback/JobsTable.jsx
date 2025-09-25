'use client';

// components/UsersTable.jsx
import React from 'react';
import { ChevronsUpDown } from 'lucide-react'; // icons

export default function JobsUsersTable({
  jobs,
  onSortChange,
  sortConfig,
  onOpenJobDetails,
  onOpenChat,
}) {
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
                  <job.icon className="rounded-full w-10 h-10 center" />
                  <div>
                    <p>{job.name}</p>
                    <p className="text-[#757C91]">{job.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-[#3B4152]">{job.reportsDetails.reason} </td>
              <td className="px-4 py-4 text-[#3B4152]">{job.timeline.submitted.date}</td>

              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => onOpenJobDetails(job)}
                  className="w-full text-sm text-[#017441] capitalize font-medium underline cursor-pointer"
                >
                  View details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
