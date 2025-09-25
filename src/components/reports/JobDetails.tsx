'use client';
import Image from 'next/image';

import JobsStatusBadge from './JobsStatusBadge';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function JobDetails({
  usersData,
  jobs,
  onOpenChat,
  handleSuspendClick,
}: {
  usersData: any;
  jobs: any;
  onOpenChat: (chat: any) => void;
  handleSuspendClick: (user: any) => void;
}) {
  return (
    <section className="px-6 py-4">
      {/* Header */}
      <div className="space-y-6 border-b border-[#D6DBE7] pb-4">
        <div className=" flex items-center gap-20">
          <div className="space-y-2">
            <p className="text-[#757C91] text-sm">Reported</p>
            <div className="flex gap-2 items-center">
              {(() => {
                const Icon = jobs.reporter?.icon as unknown as React.ComponentType<
                  React.SVGProps<SVGSVGElement>
                >;
                return Icon ? <Icon className="rounded-full w-14 h-14" /> : null;
              })()}
              <div>
                <p className="text-[#121921] font-bold underline">{jobs.reporter.name}</p>
                <p className="text-[#757C91] text-sm">{jobs.reporter.service}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[#757C91] text-sm">Reported Party</p>
            <div className="flex gap-2 items-center">
              {(() => {
                const Icon = jobs.reportedParty?.icon as unknown as React.ComponentType<
                  React.SVGProps<SVGSVGElement>
                >;
                return Icon ? <Icon className="rounded-full w-14 h-14" /> : null;
              })()}
              <div>
                <p className="text-[#121921] font-bold underline">{jobs.reportedParty.name}</p>
                <p className="text-[#757C91] text-sm">{jobs.reportedParty.role}</p>
                <p className="text-[#757C91] text-sm">{jobs.reportedParty.service}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration & Status */}
      <div className="space-y-6 border-b border-[#D6DBE7] py-4">
        <div className=" flex items-center justify-between">
          <div className="space-y-2 text-sm">
            <p className="text-[#757C91] ">Date submitted</p>
            <p className="text-[#3B4152] font-bold ">{jobs.timeline?.submitted?.date}</p>
          </div>

          {jobs.status === 'Resolved' && (
            <div className="space-y-2 text-sm">
              <p className="text-[#757C91] text-sm">Date resolved</p>
              <p className="text-[#3B4152] font-bold ">{jobs.timeline.resolution.date}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-[#757C91] text-sm">Status</p>
            <JobsStatusBadge status={jobs.status} />
          </div>
          {jobs.status === 'Pending' && (
            <Button
              onClick={() => handleSuspendClick(usersData)}
              className="px-4 py-3 text-sm rounded-2xl"
            >
              Mark as resolved
            </Button>
          )}
        </div>
      </div>

      {/* ✅ Dispute Section */}

      <div className="space-y-1  py-4">
        <p className="text-lg font-bold text-[#3B4152] pt-2">{jobs.reason}</p>
        <p className="text-[#3B4152] text-sm leading-7">{jobs.reportsDetails?.description}</p>
        <div className="flex gap-2 mt-2">
          {jobs.reportsDetails?.images?.map((src: string, idx: number) => (
            <div key={idx} className="">
              <Image src={src} alt="attachment" width={100} height={100} className="object-cover" />
            </div>
          ))}
        </div>

        {/* <div className="flex gap-[2px] mt-2">
                 <Image
                    src={jobs.reportsDetails.images}
                    alt="attachment"
                    width={100}
                    height={100}
                    className="object-cover"
                />
              </div> */}
      </div>
    </section>
  );
}
