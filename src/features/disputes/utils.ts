import type { JobItem } from '@/types/types';
import type { AdminJobDisputeListItem } from './types';

const amountFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const DISPUTE_STATUS_API_MAP: Record<string, string> = {
  Pending: 'PENDING',
  'In-progress': 'IN_PROGRESS',
  Resolved: 'RESOLVED',
};

export function mapDisputeStatusFilterToApi(value: string): string {
  if (!value) {
    return value;
  }
  return DISPUTE_STATUS_API_MAP[value] ?? value.toUpperCase();
}

export function formatDisputeStatus(status: string | undefined | null): string {
  if (!status) {
    return 'Pending';
  }

  const normalized = status.toString().trim().toUpperCase().replace(/-/g, '_');
  switch (normalized) {
    case 'IN_PROGRESS':
      return 'In-progress';
    case 'RESOLVED':
      return 'Resolved';
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
    return '';
  }
  return amountFormatter.format(value);
}

function buildName(
  participant:
    | AdminJobDisputeListItem['customer']
    | AdminJobDisputeListItem['serviceProvider']
    | AdminJobDisputeListItem['submittedBy']
    | AdminJobDisputeListItem['submittedFor'],
): string | undefined {
  if (!participant) {
    return undefined;
  }

  const fullname =
    (participant as { fullname?: string } | undefined)?.fullname ??
    [participant.firstname, participant.lastname]
      .filter((part): part is string => Boolean(part && part.trim().length > 0))
      .join(' ');

  if (fullname && fullname.trim().length > 0) {
    return fullname;
  }

  return participant.email ?? undefined;
}

export function mapAdminJobDisputeToJobItem(dispute: AdminJobDisputeListItem): JobItem {
  const disputeJob = dispute.job ?? dispute.disputeJob ?? null;

  const jobIdSource = disputeJob?.code ?? dispute.code ?? dispute.requestId ?? dispute.uuid;
  const jobId =
    jobIdSource && jobIdSource.toString().startsWith('#')
      ? jobIdSource.toString()
      : `#${jobIdSource ?? '—'}`;

  const clientRef = dispute.customer ?? dispute.submittedBy ?? null;
  const providerRef = dispute.serviceProvider ?? dispute.submittedFor ?? null;

  const amount = formatAmount(disputeJob?.price ?? null);
  const displayAmount = amount || '0';

  const resolutionRefund =
    dispute.resolution?.refundAmount ?? dispute.resolutionRefundAmount ?? null;
  const resolutionDetails =
    dispute.resolution || resolutionRefund !== null
      ? {
          issue: dispute.resolution?.action ?? dispute.resolutionAction ?? undefined,
          description: dispute.resolution?.note ?? dispute.resolutionNote ?? undefined,
          refundAmount:
            resolutionRefund !== null && resolutionRefund !== undefined
              ? formatAmount(resolutionRefund)
              : undefined,
        }
      : undefined;

  const timeline: JobItem['timeline'] = {};

  const acceptedAt = disputeJob?.acceptedAt;
  if (acceptedAt) {
    timeline.accepted = {
      date: formatDate(acceptedAt),
      time: formatTime(acceptedAt),
    };
  }

  const startedAt = disputeJob?.startDate;
  if (startedAt) {
    timeline.started = {
      date: formatDate(startedAt),
      time: formatTime(startedAt),
    };
  }

  const endedAt = disputeJob?.endDate;
  if (endedAt) {
    timeline.ended = {
      date: formatDate(endedAt),
      time: formatTime(endedAt),
    };
  }

  const submittedAt = dispute.submittedAt ?? dispute.createdAt;
  if (submittedAt) {
    timeline.submitted = {
      date: formatDate(submittedAt),
      time: formatTime(submittedAt),
    };
  }

  const resolutionAt = dispute.resolution?.resolvedAt ?? dispute.resolvedAt;
  if (resolutionAt) {
    timeline.resolution = {
      date: formatDate(resolutionAt),
      time: formatTime(resolutionAt),
    };
  }

  const disputePictures = dispute.pictures;
  const disputeDesc = dispute.description ?? disputeJob?.description ?? '';

  return {
    jobId,
    jobUuid: disputeJob?.uuid ?? undefined,
    jobCode: disputeJob?.code ?? dispute.code ?? undefined,
    requestId: dispute.requestId ?? undefined,
    client: {
      name: buildName(clientRef) ?? '—',
      email: clientRef?.email ?? undefined,
      uuid: clientRef?.uuid ?? undefined,
      icon: clientRef?.picture ?? undefined,
    },
    serviceProvider: {
      name: buildName(providerRef) ?? '—',
      role: providerRef?.serviceCategory ?? undefined,
      uuid: providerRef?.uuid ?? undefined,
      icon: providerRef?.picture ?? undefined,
    },
    amount: displayAmount,
    status: formatDisputeStatus(dispute.status),
    reason: dispute.reason ?? dispute.category ?? '—',
    jobDesc: disputeDesc ?? '',
    disputeDetails: {
      issue: dispute.reason ?? dispute.category ?? 'Dispute',
      description: dispute.description ?? '',
      images: disputePictures ?? undefined,
    },
    resolutionDetails,
    timeline,
  } as JobItem;
}
