'use client';
import AcceptIcon from '@/assets/accept-icon.svg';
import CheckedIcon from '@/assets/checked-icon.svg';
import DividerIcon from '@/assets/divider-icon.svg';
import JobsStatusBadge from './JobsStatusBadge';
import type { UserProfile, JobItem, ChatThread } from '@/types/types';
import Button from '@/components/ui/Button';

export default function JobDetails({
  usersData,
  jobs,
  onOpenChat,
}: {
  usersData: UserProfile;
  jobs: JobItem;
  onOpenChat: (chat: ChatThread[] | undefined) => void;
}) {
  return (
    <section className="px-6 py-4">
      {/* Header */}
      <div className="space-y-6 border-b border-[#D6DBE7] pb-4">
        <h2 className="text-[#3B4152] text-sm font-bold">{jobs.jobId}</h2>
        <div className="relative flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {(() => {
              const Icon = jobs.serviceProvider?.icon as unknown as React.ComponentType<
                React.SVGProps<SVGSVGElement>
              >;
              return Icon ? <Icon className="rounded-full w-14 h-14" /> : null;
            })()}
            {(() => {
              const Badge = jobs.serviceProvider?.badgeIcon as unknown as React.ComponentType<
                React.SVGProps<SVGSVGElement>
              >;
              return Badge ? <Badge className="absolute top-8 left-9" /> : null;
            })()}
            <div className="space-y-1">
              <p className="text-[#121921] font-bold">{jobs.serviceProvider?.name}</p>
              <p className="text-[#757C91] text-sm">{jobs.serviceProvider?.role}</p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              onOpenChat(usersData.chat); // 👈 pass chat from props
            }}
            className="rounded-2xl text-[#017441]"
          >
            View Chat
          </Button>
        </div>
      </div>

      {/* Amount + Status */}
      <div className="space-y-3 border-b border-[#D6DBE7] py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">₦{jobs.amount}</h2>
            {jobs.timeline?.accepted && (
              <p className="flex text-xs gap-2 text-[#757C91]">
                <AcceptIcon /> Accepted on {jobs.timeline.accepted.date}{' '}
                {jobs.timeline.accepted.time}
              </p>
            )}
          </div>
          <JobsStatusBadge status={jobs.status} />
        </div>

        {/* Status reason */}
        {jobs.statusReason && (
          <p className="bg-[#FEF6F6] text-[#F0443A] text-sm rounded-xl flex px-2 py-1 w-fit items-center">
            {jobs.statusReason}
          </p>
        )}

        {/* Description */}
        <p className="text-[#3B4152] text-sm">{jobs.jobDesc}</p>

        {/* Inspo Images */}
        {jobs.jobInspo && (
          <div className="flex gap-[2px]">
            {(() => {
              const Inspo = jobs.jobInspo as unknown as React.ComponentType<
                React.SVGProps<SVGSVGElement>
              >;
              return (
                <>
                  <Inspo />
                  <Inspo />
                  <Inspo />
                </>
              );
            })()}
          </div>
        )}
      </div>
      {/* ✅ Dispute Section */}
      {jobs.status === 'Disputed' && (
        <div className="space-y-1 border-b border-[#D6DBE7] py-4">
          <h3 className="text-[#757C91] font-bold text-sm">DISPUTE DETAILS</h3>
          <p className="text-sm font-bold text-[#3B4152] pt-2">{jobs.disputeDetails?.issue}</p>
          <p className="text-[#3B4152] text-sm">{jobs.disputeDetails?.description}</p>
          {jobs.disputeDetails?.images && (
            <div className="flex gap-[2px] mt-2">
              {(() => {
                const Img = jobs.disputeDetails?.images as unknown as React.ComponentType<
                  React.SVGProps<SVGSVGElement>
                >;
                return Img ? (
                  <>
                    <Img className="w-12 h-12" />
                    <Img className="w-12 h-12" />
                    <Img className="w-12 h-12" />
                    <Img className="w-12 h-12" />
                  </>
                ) : null;
              })()}
            </div>
          )}

          {/* Resolution */}
          {jobs.resolutionDetails && (
            <div className="space-y- border-t border-[#D6DBE7] mt-4 pt-4">
              <h4 className="text-[#757C91] font-bold text-sm ">DISPUTE RESOLUTION</h4>
              {(() => {
                const res =
                  typeof jobs.resolutionDetails === 'object'
                    ? (jobs.resolutionDetails as any)
                    : undefined;
                return (
                  <>
                    <p className="text-sm font-bold text-[#FF6B01] pt-3">{res?.issue}</p>
                    <p className="text-xl font-bold pb-1">₦{res?.refundAmount}</p>
                    <p className="text-[#3B4152] text-sm">{res?.description}</p>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
      {/* Timeline */}
      <div className="py-4">
        <h2 className="text-[#3B4152] text-sm font-bold">JOB TIMELINE</h2>
      </div>

      <div className="">
        {/* Offer Accepted */}
        {jobs.timeline?.accepted && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
              <DividerIcon />
            </div>
            <div className="ml-4 text-sm flex justify-between grow">
              <p className="text-[#757C91]">Offer Accepted</p>
              <p className="text-[#121921]">
                {jobs.timeline.accepted.date} {jobs.timeline.accepted.time}
              </p>
            </div>
          </div>
        )}

        {/* Job Start */}
        {jobs.timeline?.started && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
              <DividerIcon />
            </div>
            <div className="ml-4 text-sm flex justify-between grow">
              <p className="text-[#757C91]">Job Start</p>
              <p className="text-[#121921]">
                {jobs.timeline.started.date} {jobs.timeline.started.time}
              </p>
            </div>
          </div>
        )}

        {/* Job End */}
        {jobs.timeline?.ended && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
              <DividerIcon />
            </div>
            <div className="ml-4 text-sm flex justify-between grow">
              <p className="text-[#757C91]">Job End</p>
              <p className="text-[#121921]">
                {jobs.timeline.ended.date} {jobs.timeline.ended.time}
              </p>
            </div>
          </div>
        )}

        {/* Job End */}
        {jobs.timeline?.resolution && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
            </div>
            <div className="ml-4 text-sm flex justify-between grow">
              <p className="text-[#757C91]">Resolution</p>
              <p className="text-[#121921]">
                {jobs.timeline.resolution.date} {jobs.timeline.resolution.time}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
