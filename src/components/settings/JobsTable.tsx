'use client';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { IconButton } from '@/components/ui';
import type { SettingsCategoryItem } from '@/types/types';
import PlaceholderIcon from '@/assets/service-icon.svg';

export interface JobsUsersTableProps {
  jobs: SettingsCategoryItem[];
  onOpenJobDetails: (item: SettingsCategoryItem) => void;
}

export default function JobsUsersTable({ jobs, onOpenJobDetails }: JobsUsersTableProps) {
  return (
    <div className="border-t border-[#D6DBE7] overflow-x-auto">
      <table className="w-1/2 min-w-[560px] text-left border-collapse" role="table" aria-label="Settings categories table">
        <tbody className="bg-white">
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b border-[#D6DBE7]">
              <td className="px-4 py-3 text-[#3B4152] flex items-center gap-4">
                {job.iconMissing ? (
                  <div className="h-[35px] w-[35px] rounded-full bg-[#F1F2F4] flex items-center justify-center text-[#A9AFC2]">
                    <PlaceholderIcon className="h-5 w-5" />
                  </div>
                ) : (
                  <Image
                    src={job.icon ?? '/settings-icon1.png'}
                    alt="Category icon"
                    width={35}
                    height={35}
                    className="object-cover rounded-full"
                    unoptimized
                  />
                )}
                <div>
                  <p className="text-[#3B4152] text-[14px]">{job.category}</p>
                  <p className="text-[#757C91] text-sm">
                    {job?.subCategoryCount ?? job?.subCategories?.length ?? 0} subcategories
                  </p>
                </div>
              </td>
              <td className=" py-2">
                <div className="">
                  <IconButton
                    aria-label="Edit category"
                    onClick={() => onOpenJobDetails(job)}
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
