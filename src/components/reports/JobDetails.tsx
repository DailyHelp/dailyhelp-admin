'use client';

import type { ComponentType, SVGProps } from 'react';
import JobsStatusBadge from './JobsStatusBadge';
import Button from '@/components/ui/Button';
import { normalisePictures } from '@/features/users/utils';
import type { ReportEntry } from '@/types/types';

function getInitials(name?: string) {
  if (!name) return 'DH';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'DH';
  if (parts.length === 1) return parts[0]![0]!.toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function renderAvatar(source: unknown, fallbackName?: string) {
  const initials = getInitials(fallbackName);

  if (typeof source === 'string' && source.trim().length > 0) {
    return (
      <img
        src={source}
        alt={fallbackName ?? 'Avatar'}
        className="h-16 w-16 rounded-full object-cover"
      />
    );
  }

  if (typeof source === 'function') {
    const Icon = source as ComponentType<SVGProps<SVGSVGElement>>;
    return <Icon className="h-16 w-16 rounded-full" />;
  }

  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6ECFF] text-lg font-semibold text-[#37436C]">
      {initials}
    </span>
  );
}

function PersonCard({
  label,
  name,
  role,
  avatar,
}: {
  label: string;
  name?: string;
  role?: string;
  avatar?: unknown;
}) {
  return (
    <div className="flex items-center gap-4">
      {renderAvatar(avatar, name)}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#97A0B8]">
          {label}
        </p>
        <p className="text-base font-semibold text-[#121921] underline underline-offset-4">
          {name ?? '—'}
        </p>
        {role ? <p className="text-sm text-[#757C91]">{role}</p> : null}
      </div>
    </div>
  );
}

export default function JobDetails({
  jobs,
  onRequestResolve,
}: {
  jobs: ReportEntry;
  onRequestResolve: (report: ReportEntry) => void;
}) {
  const attachments = normalisePictures(
    jobs.reportsDetails?.images as unknown as string | string[],
  );

  const isPending = jobs.status?.toLowerCase() === 'pending';

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white px-8 py-8 shadow-[0_24px_60px_rgba(17,25,40,0.08)]">
        <div className="grid gap-8 md:grid-cols-2">
          <PersonCard
            label="Reporter"
            name={jobs.reporter?.name}
            role={jobs.reporter?.service ?? jobs.reporter?.role}
            avatar={jobs.reporter?.icon}
          />
          <PersonCard
            label="Reported party"
            name={jobs.reportedParty?.name}
            role={jobs.reportedParty?.role}
            avatar={jobs.reportedParty?.icon}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#EAECF5] pt-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#97A0B8]">
              Date submitted
            </p>
            <p className="text-base font-semibold text-[#121921]">
              {jobs.timeline?.submitted?.date ?? '—'}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#97A0B8]">
              Status
            </p>
            <JobsStatusBadge status={jobs.status} />
          </div>

          {isPending ? (
            <Button
              onClick={() => onRequestResolve(jobs)}
              className="ml-auto rounded-full bg-[#0D8941] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0a6f33]"
            >
              Mark as resolved
            </Button>
          ) : null}
        </div>

        <div className="mt-10 space-y-4">
          <div>
            {jobs.reason ? (
              <h2 className="text-2xl font-semibold text-[#121921]">{jobs.reason}</h2>
            ) : null}
          </div>

          <p className="text-sm leading-7 text-[#3B4152]">
            {jobs.reportsDetails?.description ?? 'No description provided.'}
          </p>

          {attachments.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {attachments.map((src, idx) => (
                <div key={`${src}-${idx}`} className="overflow-hidden rounded-2xl">
                  <img src={src} alt="Evidence" className="h-[108px] w-[108px] object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
