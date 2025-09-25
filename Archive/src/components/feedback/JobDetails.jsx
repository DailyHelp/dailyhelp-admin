'use client';
import Image from 'next/image';

import JobsStatusBadge from './JobsStatusBadge';
import { ChevronDown } from 'lucide-react';

export default function JobDetails({
  value,
  onChange,
  usersData,
  jobs,
  onOpenChat,
  handleSuspendClick,
}) {
  return (
    <section className="px-6 py-4">
      {/* Header */}
      <div className="space-y-6  pb-4">
        <div className=" flex items-center gap-20">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <jobs.icon className="rounded-full w-14 h-14" />
              <div>
                <p className="text-[#121921] font-bold ">{jobs.name}</p>
                <p className="text-[#757C91] text-sm">{jobs.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 ">
        <h2 className="text-lg text-[#3B4152] font-bold">{jobs.reportsDetails.reason}</h2>
        <p className="text-sm text-[#3B4152] leading-6">{jobs.reportsDetails.description}</p>
      </div>
    </section>
  );
}
