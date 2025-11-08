import type { JobItem } from '@/types/types';
import type { AdminJobListItem } from './types';

const amountFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const JOB_STATUS_API_MAP: Record<string, string> = {
  Pending: 'PENDING',
  'In-progress': 'IN_PROGRESS',
  Ongoing: 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Disputed: 'DISPUTED',
  Completed: 'COMPLETED',
};

export function mapStatusFilterToApi(value: string): string {
  if (!value) {
    return value;
  }
  return JOB_STATUS_API_MAP[value] ?? value.toUpperCase();
}

export function formatJobStatus(status: string | undefined | null): string {
  if (!status) {
    return 'Pending';
  }

  const normalized = status.toString().trim().toUpperCase().replace(/-/g, '_');
  switch (normalized) {
    case 'IN_PROGRESS':
      return 'Ongoing';
    case 'CANCELED':
    case 'CANCELLED':
      return 'Canceled';
    case 'DISPUTED':
      return 'Disputed';
    case 'COMPLETED':
      return 'Completed';
    case 'PENDING':
    default:
      return 'Pending';
  }
}

function formatDate(value?: string | null): string {
  if (!value) {
    return '—';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '—';
  }

  const day = parsed.toLocaleString('en-US', { day: '2-digit' });
  const month = parsed.toLocaleString('en-US', { month: 'short' });
  const year = parsed.toLocaleString('en-US', { year: 'numeric' });
  return `${day} ${month}, ${year}`;
}

function formatTime(value?: string | null): string {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return parsed.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatAmount(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '0';
  }
  return amountFormatter.format(value);
}

export function mapAdminJobToJobItem(job: AdminJobListItem): JobItem {
  const requestor = job.requestor ?? job.customer ?? null;
  const customerName =
    requestor?.fullname ||
    [requestor?.firstname, requestor?.lastname].filter(Boolean).join(' ') ||
    requestor?.email ||
    '—';

  const serviceProviderName =
    [job.serviceProvider?.firstname, job.serviceProvider?.lastname].filter(Boolean).join(' ') ||
    job.serviceProvider?.email ||
    '—';

  const timeline: JobItem['timeline'] = {};

  if (job.acceptedAt) {
    timeline.accepted = {
      date: formatDate(job.acceptedAt),
      time: formatTime(job.acceptedAt),
    };
  }

  const startSource = job.startDate ?? job.createdAt;
  if (startSource) {
    timeline.started = {
      date: formatDate(startSource),
      time: formatTime(startSource),
    };
  }

  if (job.endDate) {
    timeline.ended = {
      date: formatDate(job.endDate),
      time: formatTime(job.endDate),
    };
  }

  const displayId = job.requestId ?? job.code ?? job.uuid;
  const jobIdValue =
    displayId && displayId.toString().startsWith('#') ? displayId.toString() : `#${displayId}`;

  return {
    jobId: jobIdValue,
    jobUuid: job.uuid,
    requestId: job.requestId ?? undefined,
    jobCode: job.code,
    client: {
      name: customerName,
      email: requestor?.email ?? undefined,
      uuid: requestor?.uuid,
      icon: requestor?.picture ?? undefined,
    },
    serviceProvider: {
      name: serviceProviderName,
      role: job.serviceProvider?.serviceCategory ?? undefined,
      icon: (job.serviceProvider?.picture ?? undefined) as string | undefined,
      uuid: job.serviceProvider?.uuid,
    },
    amount: formatAmount(job.price),
    status: formatJobStatus(job.status),
    jobDesc: job.description ?? '',
    timeline,
  } as JobItem;
}
