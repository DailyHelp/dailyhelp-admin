'use client';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { IconButton } from '@/components/ui';
import type { SettingsCategoryItem } from '@/types/types';

export interface JobsUsersTableProps {
  jobs: SettingsCategoryItem[];
  onOpenJobDetails: (item: SettingsCategoryItem) => void;
  onEdit?: (item: SettingsCategoryItem) => void;
}

export default function JobsUsersTable({ jobs, onOpenJobDetails, onEdit }: JobsUsersTableProps) {
  return (
    <div className="border-t border-[#D6DBE7] overflow-x-auto">
      <table className="w-1/2 min-w-[560px] text-left border-collapse" role="table" aria-label="Settings categories table">
        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7]">
              <td className="px-4 py-3 text-[#3B4152] flex items-center gap-4">
                <Image
                  src={job.icon}
                  alt="attachment"
                  width={35}
                  height={35}
                  className="object-cover"
                />
                <div>
                  <p className="text-[#3B4152] text-[14px]">{job.category}</p>
                  <p className="text-[#757C91] text-sm">
                    {job?.subCategories?.length ?? 0} subcategories
                  </p>
                </div>
              </td>
              <td className=" py-2">
                <div className="">
                  <IconButton
                    aria-label="Edit member"
                    onClick={() => {
                      onEdit?.(job);
                      onOpenJobDetails(job);
                    }}
                    className="h-9 text-[#757C91]"
                  >
                    <Pencil size={16} />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
