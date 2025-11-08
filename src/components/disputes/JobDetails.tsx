'use client';
import { useState, type ComponentType, type SVGProps } from 'react';
import AcceptIcon from '@/assets/accept-icon.svg';
import CheckedIcon from '@/assets/checked-icon.svg';
import DividerIcon from '@/assets/divider-icon.svg';
import JobsStatusBadge from './JobsStatusBadge';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { normalisePictures } from '@/features/users/utils';

import type { JobItem, ChatThread } from '@/types/types';

function getInitials(name?: string): string {
  if (!name) {
    return 'DH';
  }
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) {
    return 'DH';
  }
  if (parts.length === 1) {
    return parts[0]?.[0]?.toUpperCase() ?? 'D';
  }
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return `${first}${last}`.toUpperCase();
}

function renderAvatar(source: unknown, fallbackName?: string, sizeClass = 'h-14 w-14') {
  const initials = getInitials(fallbackName);

  if (typeof source === 'string' && source.trim().length > 0) {
    return <img src={source} alt={fallbackName ?? 'Avatar'} className={`${sizeClass} rounded-full object-cover`} />;
  }

  if (typeof source === 'function') {
    const Component = source as ComponentType<SVGProps<SVGSVGElement>>;
    return <Component className={`${sizeClass} rounded-full`} />;
  }

  return (
    <span className={`flex ${sizeClass} items-center justify-center rounded-full bg-[#F0F4FF] text-base font-semibold text-[#3B4152]`}>
      {initials}
    </span>
  );
}

function renderDisputeImages(images: unknown) {
  if (!images) {
    return null;
  }

  const entries: unknown[] = [];

  if (Array.isArray(images)) {
    entries.push(...images);
  } else if (typeof images === 'string') {
    const normalised = normalisePictures(images);
    if (normalised.length > 0) {
      entries.push(...normalised);
    } else {
      entries.push(images);
    }
  } else {
    entries.push(images);
  }

  const nodes = entries
    .map((entry, index) => {
      if (typeof entry === 'string' && entry.trim().length > 0) {
        return (
          <img
            key={`${entry}-${index}`}
            src={entry}
            alt="Dispute evidence"
            className="h-12 w-12 rounded-2xl object-cover"
          />
        );
      }

      if (typeof entry === 'function') {
        const Component = entry as ComponentType<SVGProps<SVGSVGElement>>;
        return <Component key={`svg-${index}`} className="h-12 w-12" />;
      }

      return null;
    })
    .filter(Boolean);

  if (nodes.length === 0) {
    return null;
  }

  return <div className="mt-2 flex gap-[2px]">{nodes}</div>;
}

export default function JobDetails({
  jobs,
  onOpenModal,
  onOpenChat,
}: {
  jobs: JobItem;
  onOpenModal?: (type: 'refundClient' | 'partialRefund' | 'payProvider') => void;
  onOpenChat: (chat: ChatThread[] | undefined) => void;
}) {
  const [action, setAction] = useState('');
  return (
    <section className="px-6 py-4">
      {/* Header */}
      <div className="space-y-6 border-b border-[#D6DBE7] pb-4">
        <h2 className="text-[#3B4152] text-sm font-bold">{jobs.jobId}</h2>
        <div className="flex items-center gap-20">
          <div className="space-y-2">
            <p className="text-[#757C91] text-sm">Client</p>
            <div className="flex items-center gap-2">
              {renderAvatar(jobs.client?.icon, jobs.client?.name)}
              <p className="text-[#121921] font-bold underline">{jobs.client?.name}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[#757C91] text-sm">Service provider</p>
            <div className="flex items-center gap-2">
              {renderAvatar(jobs.serviceProvider?.icon, jobs.serviceProvider?.name)}
              <div>
                <p className="text-[#121921] font-bold underline">{jobs.serviceProvider?.name}</p>
                <p className="text-[#757C91] text-sm">{jobs.serviceProvider?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration & Status */}
      <div className="space-y-6 border-b border-[#D6DBE7] py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2 text-sm">
            <p className="text-[#757C91] ">Date submitted</p>
            <p className="text-[#3B4152] font-bold ">{jobs.timeline?.submitted?.date ?? '—'}</p>
          </div>

          {jobs.status === 'Resolved' && (
            <div className="space-y-2 text-sm">
              <p className="text-[#757C91] text-sm">Date resolved</p>
              <p className="text-[#3B4152] font-bold ">{jobs.timeline?.resolution?.date ?? '—'}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-[#757C91] text-sm">Status</p>
            <JobsStatusBadge status={jobs.status} />
          </div>
          {jobs.status === 'Pending' && (
            <div className="relative inline-block rounded-2xl border border-[#D6DBE7] bg-[#017441] px-4 text-white">
              <select
                className="appearance-none bg-transparent py-3 text-sm font-bold focus:outline-none focus:ring-0"
                onChange={(e) => {
                  const selected = e.target.value;
                  setAction(selected);
                  if (selected === 'RefundClient') {
                    onOpenModal?.('refundClient');
                  } else if (selected === 'PartialRefund') {
                    onOpenModal?.('partialRefund');
                  } else if (selected === 'PayProvider') {
                    onOpenModal?.('payProvider');
                  }
                  setTimeout(() => setAction(''), 0);
                }}
                value={action}
              >
                <option value="">Resolve dispute</option>
                <option value="RefundClient">Refund client</option>
                <option value="PartialRefund">Partial refund</option>
                <option value="PayProvider">Pay service provider</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>
      </div>
      {/* Amount  */}
      <div className="space-y-3 border-b border-[#D6DBE7] py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">₦{jobs.amount ?? '0'}</h2>
            {jobs.timeline?.accepted && (
              <p className="flex gap-2 text-xs text-[#757C91]">
                <AcceptIcon /> Accepted on {jobs.timeline.accepted.date}{' '}
                {jobs.timeline.accepted.time}
              </p>
            )}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              onOpenChat(jobs.chat);
            }}
            className="rounded-2xl text-[#017441]"
          >
            View Chat
          </Button>
        </div>

        <p className="text-sm text-[#3B4152]">{jobs.jobDesc}</p>

        {jobs.jobInspo && (
          <div className="flex gap-[2px]">
            {(() => {
              if (typeof jobs.jobInspo === 'string') {
                const pictures = normalisePictures(jobs.jobInspo);
                return pictures.map((picture) => (
                  <img
                    key={picture}
                    src={picture}
                    alt="Job inspiration"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ));
              }
              const Inspo = jobs.jobInspo as ComponentType<SVGProps<SVGSVGElement>>;
              return Inspo ? (
                <>
                  <Inspo />
                  <Inspo />
                  <Inspo />
                </>
              ) : null;
            })()}
          </div>
        )}
      </div>
      {/* ✅ Dispute Section */}
      {jobs.status && (
        <div className="space-y-1 border-b border-[#D6DBE7] py-4">
          <h3 className="text-sm font-bold text-[#757C91]">DISPUTE DETAILS</h3>
          <p className="pt-2 text-sm font-bold text-[#3B4152]">
            {jobs.disputeDetails?.issue ?? 'Dispute'}
          </p>
          <p className="text-sm text-[#3B4152]">{jobs.disputeDetails?.description ?? '—'}</p>
          {renderDisputeImages(jobs.disputeDetails?.images)}

          {/* Resolution */}
          {jobs.resolutionDetails && (
            <div className="mt-4 space-y- border-t border-[#D6DBE7] pt-4">
              <h4 className="text-sm font-bold text-[#757C91]">DISPUTE RESOLUTION</h4>
              {(() => {
                if (typeof jobs.resolutionDetails === 'string') {
                  return null;
                }
                const res = jobs.resolutionDetails;
                if (!res) return null;
                const refundAmount =
                  typeof res.refundAmount === 'string' && res.refundAmount.trim().length > 0
                    ? res.refundAmount
                    : undefined;
                return (
                  <>
                    <p className="pt-3 text-sm font-bold text-[#FF6B01]">
                      {res.issue ?? 'Resolution'}
                    </p>
                    {refundAmount ? (
                      <p className="text-xl font-bold pb-1">₦{refundAmount}</p>
                    ) : null}
                    <p className="text-sm text-[#3B4152]">{res.description ?? '—'}</p>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
      {/* Timeline */}
      <div className="py-4">
        <h2 className="text-sm font-bold text-[#3B4152]">JOB TIMELINE</h2>
      </div>

      <div>
        {jobs.timeline?.accepted && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
              <DividerIcon />
            </div>
            <div className="ml-4 flex grow justify-between text-sm">
              <p className="text-[#757C91]">Offer Accepted</p>
              <p className="text-[#121921]">
                {jobs.timeline.accepted.date} {jobs.timeline.accepted.time}
              </p>
            </div>
          </div>
        )}

        {jobs.timeline?.started && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
              <DividerIcon />
            </div>
            <div className="ml-4 flex grow justify-between text-sm">
              <p className="text-[#757C91]">Job Start</p>
              <p className="text-[#121921]">
                {jobs.timeline.started.date} {jobs.timeline.started.time}
              </p>
            </div>
          </div>
        )}

        {jobs.timeline?.submitted && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
              <DividerIcon />
            </div>
            <div className="ml-4 flex grow justify-between text-sm">
              <p className="text-[#757C91]">Dispute</p>
              <p className="text-[#121921]">
                {jobs.timeline.submitted.date} {jobs.timeline.submitted.time}
              </p>
            </div>
          </div>
        )}

        {jobs.timeline?.resolution && (
          <div className="relative flex items-start">
            <div className="flex flex-col items-center">
              <CheckedIcon />
            </div>
            <div className="ml-4 flex grow justify-between text-sm">
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
