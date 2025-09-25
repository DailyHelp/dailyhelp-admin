'use client';

// components/UsersTable.jsx
import React, { useEffect, useRef, useState } from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown, Pencil, Trash2 } from 'lucide-react'; // icons

export default function JobsUsersTable({
  jobs,
  onSortChange,
  sortConfig,
  onOpenJobDetails,
  onSelectionChange,
  onEdit,
  onDelete,
  handleSuspendClick,
}) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const headerCheckboxRef = useRef(null);

  const toggleRow = (jobId) => {
    const next = new Set(selectedIds);
    if (next.has(jobId)) next.delete(jobId);
    else next.add(jobId);
    setSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  };

  const allSelected = jobs.length > 0 && jobs.every((j) => selectedIds.has(j.jobId));
  const selectedCountOnPage = jobs.filter((j) => selectedIds.has(j.jobId)).length;

  const toggleAllCurrentPage = () => {
    const next = new Set(selectedIds);
    if (allSelected) {
      jobs.forEach((j) => next.delete(j.jobId));
    } else {
      jobs.forEach((j) => next.add(j.jobId));
    }
    setSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  };

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = selectedCountOnPage > 0 && !allSelected;
    }
  }, [selectedCountOnPage, allSelected]);

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
            <th className="px-4 py-3   cursor-pointer" onClick={() => handleSort('name')}>
              <span className="flex items-center gap-3">
                <label className="inline-flex items-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAllCurrentPage}
                    className="sr-only peer"
                  />
                  <span className="h-5 w-5 rounded-md border-[1.5px] border-[#D6DBE7] grid place-items-center peer-checked:bg-[#017441] peer-checked:border-[#017441]">
                    {allSelected && (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {selectedCountOnPage > 0 && !allSelected && (
                      <span className="w-3 h-0.5 bg-[#017441]"></span>
                    )}
                  </span>
                </label>
                <span className="flex items-center gap-2">name {getSortIcon('name')}</span>
              </span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('emailaddress')}>
              <span className="flex items-center gap-2">
                {' '}
                email address{getSortIcon('emailaddress')}
              </span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('role')}>
              <span className="flex items-center gap-2">role {getSortIcon('role')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('date')}>
              <span className="flex items-center gap-2">date added{getSortIcon('date')}</span>
            </th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7]">
              <td className="px-4 py-5 text-[#3B4152]">
                <label className="inline-flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(job.jobId)}
                    onChange={() => toggleRow(job.jobId)}
                    className="sr-only peer"
                  />
                  <span className="h-5 w-5 rounded-md border-[1.5px] border-[#D6DBE7] grid place-items-center peer-checked:bg-[#017441] peer-checked:border-[#017441]">
                    {selectedIds.has(job.jobId) && (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <p>{job.name}</p>
                  {job.status === 'Pending' && <JobsStatusBadge status={job.status} />}
                </label>
              </td>
              <td className="px-4 py-2 text-[#3B4152]">{job.email} </td>
              {/* <td className="px-4 py-2 text-[#3B4152]">{job.timeline.added.date}</td> */}
              <td className="px-4 py-2 text-[#3B4152]">{job.role} </td>
              <td className="px-4 py-2 text-[#3B4152]">{job.date} </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    aria-label="Edit member"
                    onClick={() => {
                      onEdit?.(job);
                      onOpenJobDetails(job);
                    }}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-[#D6DBE7] text-[#7C8397] hover:bg-[#F9F9FB]"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    aria-label="Delete member"
                    onClick={() => {
                      onDelete?.(job);
                      handleSuspendClick(job);
                    }}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-[#D6DBE7] text-[#7C8397] hover:bg-[#F9F9FB]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
