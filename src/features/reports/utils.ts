import type { ReportEntry } from '@/types/types';
import type { AdminReportListItem, AdminReportParticipant } from './types';

const amountFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const REPORT_STATUS_API_MAP: Record<string, string> = {
  Pending: 'PENDING',
  Resolved: 'RESOLVED',
};

export function mapReportStatusFilterToApi(value: string): string {
  if (!value) {
    return value;
  }
  return REPORT_STATUS_API_MAP[value] ?? value.toUpperCase();
}

export function formatReportStatus(status: string | undefined | null): string {
  if (!status) {
    return 'Pending';
  }

  const normalized = status.toString().trim().toUpperCase().replace(/-/g, '_');
  switch (normalized) {
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

function formatAmount(value: number | null | undefined): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return amountFormatter.format(value);
}

function buildName(participant: AdminReportParticipant | null | undefined): string | undefined {
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

  return participant.email ?? participant.phone ?? undefined;
}

function buildRole(
  participant: AdminReportParticipant | null | undefined,
  fallbackType?: 'client' | 'serviceProvider' | 'requestor',
): string | undefined {
  if (!participant) {
    return undefined;
  }
  if (participant.role && participant.role.trim().length > 0) {
    return participant.role;
  }
  if (participant.type && participant.type.trim().length > 0) {
    return participant.type;
  }
  if (participant.serviceCategory && participant.serviceCategory.trim().length > 0) {
    return participant.serviceCategory;
  }
  if (fallbackType === 'client') {
    return 'Client';
  }
  if (fallbackType === 'serviceProvider') {
    return 'Service Provider';
  }
  return participant.email ? 'User' : undefined;
}

function normaliseAttachments(source: string | string[] | null | undefined): string[] {
  if (!source) {
    return [];
  }
  if (Array.isArray(source)) {
    return source.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }
  const trimmed = source.trim();
  if (!trimmed) {
    return [];
  }
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
      }
    } catch (error) {
      // ignore parse errors
    }
  }
  return trimmed
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function mapAdminReportToReportEntry(report: AdminReportListItem): ReportEntry {
  const jobInfo = report.job ?? report.dispute ?? null;
  const requestor =
    report.requestor ??
    report.customer ??
    jobInfo?.requestor ??
    (report as unknown as { requestor?: AdminReportParticipant })?.requestor ??
    null;
  const provider =
    report.serviceProvider ??
    jobInfo?.serviceProvider ??
    (report as unknown as { provider?: AdminReportParticipant })?.provider ??
    null;
  const submittedBy = report.submittedBy ?? null;

  let reporterSource: AdminReportParticipant | null =
    report.reporter ?? report.reportedUser ?? report.victim ?? report.offender ?? null;
  let reportedSource: AdminReportParticipant | null =
    report.reportedParty ?? report.reportedUser ?? report.offender ?? report.victim ?? null;

  if (submittedBy?.uuid) {
    if (requestor?.uuid && submittedBy.uuid === requestor.uuid) {
      reporterSource = requestor;
      reportedSource = provider ?? reportedSource ?? null;
    } else if (provider?.uuid && submittedBy.uuid === provider.uuid) {
      reporterSource = provider;
      reportedSource = requestor ?? reportedSource ?? null;
    }
  }

  if (!reporterSource) {
    reporterSource = submittedBy ?? requestor ?? provider ?? reportedSource ?? null;
  }

  if (!reportedSource) {
    if (reporterSource && reporterSource.uuid && requestor?.uuid === reporterSource.uuid) {
      reportedSource = provider ?? report.reportedParty ?? report.offender ?? report.reportedUser ?? null;
    } else if (reporterSource && reporterSource.uuid && provider?.uuid === reporterSource.uuid) {
      reportedSource = requestor ?? report.reportedParty ?? report.victim ?? report.reportedUser ?? null;
    } else {
      reportedSource =
        (reporterSource && reporterSource.uuid === requestor?.uuid ? provider : null) ??
        (reporterSource && reporterSource.uuid === provider?.uuid ? requestor : null) ??
        provider ??
        requestor ??
        report.reportedParty ??
        report.reportedUser ??
        report.offender ??
        report.victim ??
        null;
    }
  }

  const jobIdSource = jobInfo?.code ?? report.code ?? jobInfo?.uuid ?? report.uuid;
  const jobId =
    jobIdSource && jobIdSource.toString().startsWith('#')
      ? jobIdSource.toString()
      : `#${jobIdSource ?? '—'}`;

  const amount = formatAmount(jobInfo?.price ?? report.amount ?? null);
  const attachments = normaliseAttachments(report.attachments ?? report.pictures ?? null);

  const clientPerson = requestor
    ? {
        name: buildName(requestor),
        role: buildRole(requestor, 'client'),
        icon: requestor.picture ?? undefined,
        uuid: requestor.uuid,
      }
    : undefined;

  const providerPerson = provider
    ? {
        name: buildName(provider),
        role: buildRole(provider, 'serviceProvider'),
        icon: provider.picture ?? undefined,
        uuid: provider.uuid,
      }
    : undefined;

  return {
    jobId,
    uuid: report.uuid,
    reporter: {
      name: buildName(reporterSource),
      role: buildRole(
        reporterSource,
        reporterSource?.uuid && reporterSource.uuid === requestor?.uuid
          ? 'client'
          : reporterSource?.uuid && reporterSource.uuid === provider?.uuid
          ? 'serviceProvider'
          : undefined,
      ),
      service: reporterSource?.serviceCategory ?? undefined,
      icon: reporterSource?.picture ?? undefined,
      uuid: reporterSource?.uuid,
    },
    reportedParty: {
      name: buildName(reportedSource),
      role: buildRole(
        reportedSource,
        reportedSource?.uuid && reportedSource.uuid === requestor?.uuid
          ? 'client'
          : reportedSource?.uuid && reportedSource.uuid === provider?.uuid
          ? 'serviceProvider'
          : undefined,
      ),
      icon: reportedSource?.picture ?? undefined,
      uuid: reportedSource?.uuid,
    },
    amount,
    reason: report.reason ?? report.category ?? '',
    status: formatReportStatus(report.status),
    reportsDetails: {
      description: report.description ?? jobInfo?.description ?? '',
      images: attachments,
    },
    timeline: {
      submitted: {
        date: formatDate(report.createdAt ?? report.updatedAt),
        time: formatTime(report.createdAt ?? report.updatedAt),
      },
      resolution:
        report.resolvedAt || report.status === 'RESOLVED'
          ? {
              date: formatDate(report.resolvedAt ?? undefined),
              time: formatTime(report.resolvedAt ?? undefined),
            }
          : undefined,
    },
    chat: [],
    client: clientPerson,
    serviceProvider: providerPerson,
  };
}
