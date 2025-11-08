'use client';

import type { ComponentType, SVGProps } from 'react';
import type { FeedbackListItem } from '@/types/types';

function getInitials(name?: string) {
  if (!name) return 'FB';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'FB';
  if (parts.length === 1) return parts[0]![0]!.toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function renderAvatar(source: unknown, name?: string) {
  const initials = getInitials(name);

  if (typeof source === 'string' && source.trim().length > 0) {
    return (
      <img
        src={source}
        alt={name ?? 'User avatar'}
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

export default function JobDetails({ job }: { job: FeedbackListItem }) {
  const submittedDate = job.timeline?.submitted?.date ?? '—';
  const submittedTime = job.timeline?.submitted?.time;

  return (
    <section className="space-y-6 px-6 py-6">
      <div className="flex items-center gap-4">
        {renderAvatar(job.icon, job.name)}
        <div className="space-y-1">
          <p className="text-lg font-semibold text-[#121921]">{job.name ?? 'Anonymous user'}</p>
          {job.email ? <p className="text-sm text-[#757C91]">{job.email}</p> : null}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#97A0B8]">Submitted on</p>
          <p className="text-sm font-semibold text-[#121921]">
            {submittedDate}
            {submittedTime ? ` • ${submittedTime}` : ''}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-[#EAECF5] bg-[#F9FAFF] px-4 py-5">
          <p className="text-base font-semibold text-[#121921]">
            {job.reportsDetails?.reason ?? 'Feedback'}
          </p>
          <p className="text-sm leading-6 text-[#3B4152]">
            {job.reportsDetails?.description ?? 'No additional comments provided.'}
          </p>
        </div>
      </div>
    </section>
  );
}
