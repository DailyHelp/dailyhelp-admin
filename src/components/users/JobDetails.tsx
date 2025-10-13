'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Calendar, MessageCircle } from 'lucide-react';
import JobsStatusBadge from './JobsStatusBadge';
import type { UserProfile, JobItem } from '@/types/types';
import Button from '@/components/ui/Button';
import { useAdminJobDispute, useAdminJobTimeline } from '@/features/users/hooks';

interface TimelineEntry {
  label: string;
  timestamp: string;
}

function formatDateTime(value?: string | null): string {
  if (!value) {
    return '—';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toTitle(value?: string | null): string {
  if (!value) {
    return '';
  }
  return value
    .toString()
    .toLowerCase()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

function normalisePictures(pictures?: string | string[] | null): string[] {
  if (!pictures) {
    return [];
  }
  if (Array.isArray(pictures)) {
    return pictures.filter(Boolean);
  }

  const trimmed = pictures.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string' && Boolean(item));
      }
    } catch (error) {
      // fall back to comma-separated approach below
    }
  }

  return trimmed
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function JobDetails({
  usersData,
  jobs,
  onOpenChat,
}: {
  usersData: UserProfile;
  jobs: JobItem;
  onOpenChat: (context: { providerUuid?: string; customerUuid: string; job: JobItem }) => void;
}) {
  const jobUuid = jobs.jobUuid;
  const { data: timelineResponse } = useAdminJobTimeline(jobUuid, { enabled: Boolean(jobUuid) });
  const { data: disputeResponse } = useAdminJobDispute(jobUuid, { enabled: Boolean(jobUuid) });

  const timelineItems = useMemo<TimelineEntry[]>(() => {
    const events = timelineResponse?.data ?? [];
    if (events.length > 0) {
      return events
        .filter((event) => event.createdAt)
        .map((event) => ({
          label: toTitle(event.event) || 'Update',
          timestamp: event.createdAt ?? '',
        }))
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }

    const manual: TimelineEntry[] = [];
    if (jobs.timeline?.accepted?.date) {
      manual.push({
        label: 'Offer Accepted',
        timestamp: `${jobs.timeline.accepted.date} ${jobs.timeline.accepted.time ?? ''}`.trim(),
      });
    }
    if (jobs.timeline?.started?.date) {
      manual.push({
        label: 'Job Start',
        timestamp: `${jobs.timeline.started.date} ${jobs.timeline.started.time ?? ''}`.trim(),
      });
    }
    if (jobs.timeline?.ended?.date) {
      manual.push({
        label: 'Job End',
        timestamp: `${jobs.timeline.ended.date} ${jobs.timeline.ended.time ?? ''}`.trim(),
      });
    }
    if (jobs.timeline?.resolution?.date) {
      manual.push({
        label: 'Resolution',
        timestamp: `${jobs.timeline.resolution.date} ${jobs.timeline.resolution.time ?? ''}`.trim(),
      });
    }
    return manual;
  }, [jobs.timeline, timelineResponse]);

  const dispute = disputeResponse?.data ?? null;

  const amountDisplay = jobs.amount ? `₦${jobs.amount}` : '₦0';
  const acceptedDisplay = jobs.timeline?.accepted
    ? `${jobs.timeline.accepted.date} ${jobs.timeline.accepted.time ?? ''}`.trim()
    : undefined;

  const providerAvatar = jobs.serviceProvider?.icon as string | undefined;
  const providerInitial = jobs.serviceProvider?.name?.[0]?.toUpperCase() ?? 'P';
  const disputePictures = normalisePictures(dispute?.pictures);

  return (
    <section className="space-y-6 px-6 py-6">
      <header className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#99A1B3]">
              Request ID
            </p>
            <p className="text-lg font-semibold text-[#0E171A]">
              #{jobs.requestId ?? jobs.jobId}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() =>
              onOpenChat({
                providerUuid: jobs.serviceProvider?.uuid,
                customerUuid: usersData.id,
                job: jobs,
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-[#D6DBE7] bg-white px-4 py-2 text-sm font-semibold text-[#017441] hover:border-[#017441] hover:bg-[#F3FCF4]"
          >
            <MessageCircle className="h-4 w-4" /> View chat
          </Button>
        </div>

        <div className="rounded-3xl border border-[#EAECF5] bg-[#F8FAFC] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-[#0E171A]">{amountDisplay}</p>
              {acceptedDisplay ? (
                <p className="flex items-center gap-2 text-xs font-medium text-[#99A1B3]">
                  <Calendar className="h-4 w-4" /> Accepted on {acceptedDisplay}
                </p>
              ) : null}
            </div>
            <JobsStatusBadge status={jobs.status} />
          </div>
        </div>

        <div className="rounded-3xl border border-[#EAECF5] bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            {providerAvatar ? (
              <Image
                src={providerAvatar}
                alt={jobs.serviceProvider?.name ?? ''}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F4FF] text-sm font-semibold text-[#47516B]">
                {providerInitial}
              </span>
            )}

            <div>
              <p className="text-base font-semibold text-[#0E171A]">{jobs.serviceProvider?.name ?? '—'}</p>
              <p className="text-sm font-medium uppercase tracking-wide text-[#99A1B3]">
                {jobs.serviceProvider?.role ?? '—'}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#99A1B3]">Payment</p>
            <p className="text-sm text-[#47516B]">
              {jobs.jobDesc && jobs.jobDesc.trim().length > 0
                ? jobs.jobDesc
                : 'No additional payment details provided.'}
            </p>
          </div>
        </div>
      </header>

      {dispute ? (
        <section className="space-y-4 rounded-3xl border border-[#FFE1D6] bg-[#FFFAFA] px-5 py-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#EA3829]">
              Dispute details
            </p>
            <p className="text-sm font-semibold text-[#0E171A]">{dispute.category ?? 'Dispute reported'}</p>
            {dispute.description ? (
              <p className="text-sm text-[#47516B]">{dispute.description}</p>
            ) : null}
            {dispute.status ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3EB] px-3 py-1 text-xs font-semibold text-[#FF8A32]">
                {toTitle(dispute.status)}
              </span>
            ) : null}
          </div>

          {disputePictures.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {disputePictures.map((picture) => (
                <Image
                  key={picture}
                  src={picture}
                  alt="Dispute evidence"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              ))}
            </div>
          ) : null}

          {(dispute.resolutionAction || dispute.resolutionNote) && (
            <div className="rounded-2xl border border-[#FFE1D6] bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#FF8A32]">
                Dispute resolution
              </p>
              {dispute.resolutionAction ? (
                <p className="mt-1 text-sm font-semibold text-[#FF6B01]">
                  {toTitle(dispute.resolutionAction)}
                </p>
              ) : null}
              {dispute.resolutionRefundAmount ? (
                <p className="text-lg font-semibold text-[#0E171A]">
                  ₦{dispute.resolutionRefundAmount.toLocaleString('en-NG')}
                </p>
              ) : null}
              {dispute.resolutionNote ? (
                <p className="text-sm text-[#47516B]">{dispute.resolutionNote}</p>
              ) : null}
            </div>
          )}
        </section>
      ) : null}

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#99A1B3]">Job timeline</h3>
        {timelineItems.length === 0 ? (
          <p className="text-sm text-[#757C91]">No timeline events available.</p>
        ) : (
          <ul className="relative space-y-4">
            {timelineItems.map((item, index) => (
              <li key={`${item.label}-${index}`} className="relative flex items-center justify-between gap-4 pl-8">
                <span className="absolute left-1 top-1.5 flex flex-col items-center">
                  <span className="h-3 w-3 rounded-full bg-[#0D8941]" />
                  {index !== timelineItems.length - 1 ? (
                    <span className="mt-1 block h-8 w-px bg-[#EAECF5]" />
                  ) : null}
                </span>
                <span className="text-sm font-semibold text-[#0E171A]">{item.label}</span>
                <span className="text-xs font-medium text-[#99A1B3]">{formatDateTime(item.timestamp)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
