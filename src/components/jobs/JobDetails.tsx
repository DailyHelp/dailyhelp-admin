'use client';
import type { ComponentType, SVGProps } from 'react';
import AcceptIcon from '@/assets/accept-icon.svg';
import CheckedIcon from '@/assets/checked-icon.svg';
import JobsStatusBadge from './JobsStatusBadge';
import type { JobItem } from '@/types/types';
import Button from '@/components/ui/Button';

export default function JobDetails({
  jobs,
  onOpenChat,
  onSuccess,
}: {
  jobs: JobItem;
  onOpenChat: (job: JobItem) => void;
  onSuccess?: () => void;
}) {
  const rawClientIcon = jobs.client?.icon;
  const ClientIcon =
    rawClientIcon && typeof rawClientIcon === 'function'
      ? (rawClientIcon as unknown as ComponentType<SVGProps<SVGSVGElement>>)
      : null;

  const rawProviderIcon = jobs.serviceProvider?.icon;
  const ProviderIcon =
    rawProviderIcon && typeof rawProviderIcon === 'function'
      ? (rawProviderIcon as unknown as ComponentType<SVGProps<SVGSVGElement>>)
      : null;

  const formatCurrency = (value?: string) => {
    if (!value) return '₦0';
    const trimmed = value.trim();
    return trimmed.startsWith('₦') ? trimmed : `₦${trimmed}`;
  };

  const formatDateOnly = (value?: string) => {
    if (!value) {
      return '—';
    }
    const normalized = value.trim();
    if (!normalized || normalized === '-') {
      return '—';
    }
    return normalized;
  };

  const formatDateTime = (point?: { date?: string; time?: string }) => {
    if (!point) return '—';
    const parts = [point.date, point.time]
      .map((part) => part?.trim())
      .filter((part) => part && part !== '-');
    return parts.length > 0 ? parts.join(', ') : '—';
  };

  const timelineSteps = [
    jobs.timeline?.accepted && {
      key: 'accepted',
      label: 'Offer Accepted',
      value: formatDateTime(jobs.timeline.accepted),
    },
    jobs.timeline?.started && {
      key: 'started',
      label: 'Job Start',
      value: formatDateTime(jobs.timeline.started),
    },
    jobs.disputeDetails &&
      jobs.timeline?.submitted && {
        key: 'dispute',
        label: 'Dispute',
        value: formatDateTime(jobs.timeline.submitted),
      },
    jobs.timeline?.ended &&
      jobs.timeline.ended.date &&
      jobs.timeline.ended.date.trim() !== '-' && {
        key: 'ended',
        label: 'Job End',
        value: formatDateTime(jobs.timeline.ended),
      },
    jobs.timeline?.resolution &&
      jobs.timeline.resolution.date &&
      jobs.timeline.resolution.date.trim() !== '-' && {
        key: 'resolution',
        label: 'Resolution',
        value: formatDateTime(jobs.timeline.resolution),
      },
  ].filter(Boolean) as Array<{ key: string; label: string; value: string }>;

  const inspoItems = (() => {
    if (!jobs.jobInspo) return [];
    const rawIcons = Array.isArray(jobs.jobInspo) ? jobs.jobInspo : [jobs.jobInspo];
    const icons = rawIcons.filter(Boolean).slice(0, 5) as Array<
      string | ComponentType<SVGProps<SVGSVGElement>>
    >;
    return icons
      .map((icon, index) => {
        if (!icon) return null;
        if (typeof icon === 'string') {
          return (
            <img
              key={`inspo-${index}`}
              src={icon}
              alt="Job inspiration"
              className="h-16 w-16 rounded-2xl object-cover"
            />
          );
        }

        const InspoComponent = icon as unknown as ComponentType<SVGProps<SVGSVGElement>>;
        return <InspoComponent key={`inspo-${index}`} className="h-16 w-16 rounded-2xl" />;
      })
      .filter(Boolean);
  })();

  const disputeImages = (() => {
    const images = jobs.disputeDetails?.images;
    if (!images) return [];
    const baseImages = Array.isArray(images) ? images : Array.from({ length: 4 }, () => images);
    const entries = baseImages.slice(0, 5);
    return entries
      .map((img, index) => {
        if (!img) return null;
        if (typeof img === 'string') {
          return (
            <img
              key={`dispute-${index}`}
              src={img}
              alt="Dispute evidence"
              className="h-16 w-16 rounded-2xl object-cover"
            />
          );
        }

        const ImgComponent = img as unknown as ComponentType<SVGProps<SVGSVGElement>>;
        return <ImgComponent key={`dispute-${index}`} className="h-16 w-16 rounded-2xl" />;
      })
      .filter(Boolean);
  })();

  const resolutionDetails =
    typeof jobs.resolutionDetails === 'object' ? jobs.resolutionDetails : undefined;

  return (
    <section className="px-6 py-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#121921]">{jobs.jobId}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-center gap-4">
              {ClientIcon ? (
                <ClientIcon className="h-16 w-16 rounded-full" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F4FF] text-lg font-semibold text-[#3B4152]">
                  {jobs.client?.name?.[0] ?? 'C'}
                </span>
              )}
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
                  Client
                </p>
                <p className="text-lg font-semibold text-[#121921] underline underline-offset-4">
                  {jobs.client?.name ?? '—'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {ProviderIcon ? (
                <ProviderIcon className="h-16 w-16 rounded-full" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F4FF] text-lg font-semibold text-[#3B4152]">
                  {jobs.serviceProvider?.name?.[0] ?? 'S'}
                </span>
              )}
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
                  Service provider
                </p>
                <p className="text-lg font-semibold text-[#121921] underline underline-offset-4">
                  {jobs.serviceProvider?.name ?? '—'}
                </p>
                {jobs.serviceProvider?.role && (
                  <p className="text-sm text-[#757C91]">{jobs.serviceProvider.role}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="grid gap-6 border-t border-[#EDF1FF] pt-6 md:grid-cols-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
              Start date
            </p>
            <p className="text-base font-semibold text-[#1E2538]">
              {formatDateOnly(jobs.timeline?.started?.date)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
              End date
            </p>
            <p className="text-base font-semibold text-[#1E2538]">
              {formatDateOnly(jobs.timeline?.ended?.date)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
              Status
            </p>
            <JobsStatusBadge status={jobs.status} />
          </div>
          <div className="flex items-start justify-end md:justify-start">
            <Button
              variant="secondary"
              onClick={() => onOpenChat(jobs)}
              className="rounded-full border border-[#017441] bg-white px-5 py-2 text-sm font-semibold text-[#017441] shadow-none transition-colors hover:bg-[#F3FCF4]"
            >
              View chat
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6 border-t border-[#EDF1FF] pt-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
              Amount
            </p>
            <h3 className="text-2xl font-semibold text-[#121921]">{formatCurrency(jobs.amount)}</h3>
            {jobs.timeline?.accepted && (
              <p className="flex items-center gap-2 text-sm text-[#757C91]">
                <AcceptIcon className="h-4 w-4" />
                Accepted on {formatDateTime(jobs.timeline.accepted)}
              </p>
            )}
          </div>

          {jobs.statusReason && (
            <span className="inline-flex items-center rounded-2xl border border-[#F8B4B0] bg-[#FEF6F6] px-3 py-1 text-sm font-medium text-[#F0443A]">
              {jobs.statusReason}
            </span>
          )}

          {jobs.jobDesc && <p className="text-sm leading-6 text-[#3B4152]">{jobs.jobDesc}</p>}

          {inspoItems.length > 0 && <div className="flex gap-2">{inspoItems}</div>}
        </div>

        {/* Dispute */}
        {jobs.disputeDetails && (
          <div className="space-y-6 border-t border-[#EDF1FF] pt-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
                Dispute details
              </p>
              <p className="text-base font-semibold text-[#1E2538]">
                {jobs.disputeDetails.issue}
              </p>
              <p className="text-sm leading-6 text-[#3B4152]">{jobs.disputeDetails.description}</p>
            </div>
            {disputeImages.length > 0 && <div className="flex gap-2">{disputeImages}</div>}

            {resolutionDetails && (
              <div className="space-y-3 rounded-2xl border border-[#FFE3D1] bg-[#FFF7EE] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#FF6B01]">
                  Dispute resolution
                </p>
                <p className="text-base font-semibold text-[#FF6B01]">{resolutionDetails.issue}</p>
                {resolutionDetails.refundAmount && (
                  <p className="text-xl font-semibold text-[#121921]">
                    {formatCurrency(resolutionDetails.refundAmount)}
                  </p>
                )}
                <p className="text-sm leading-6 text-[#3B4152]">{resolutionDetails.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-6 border-t border-[#EDF1FF] pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#97A0B8]">
            Job timeline
          </h3>
          {timelineSteps.length === 0 ? (
            <p className="text-sm text-[#757C91]">No timeline events available.</p>
          ) : (
            <div className="space-y-6">
              {timelineSteps.map((step, index) => (
                <div key={step.key} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <CheckedIcon className="h-4 w-4 text-[#3B4152]" />
                    {index < timelineSteps.length - 1 && (
                      <span className="mt-2 h-12 w-px bg-[#D6DBE7]" />
                    )}
                  </div>
                  <div className="flex flex-1 justify-between text-sm">
                    <p className="font-medium text-[#3B4152]">{step.label}</p>
                    <p className="text-[#757C91]">{step.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
