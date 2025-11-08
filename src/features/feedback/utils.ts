import type { FeedbackListItem } from '@/types/types';
import type { AdminFeedbackItem } from './types';

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

function buildName(user: AdminFeedbackItem['user']): string | undefined {
  if (!user) {
    return undefined;
  }
  if (user.fullname && user.fullname.trim().length > 0) {
    return user.fullname.trim();
  }
  const parts = [user.firstname, user.lastname].filter(
    (part): part is string => Boolean(part && part.trim().length > 0),
  );
  if (parts.length > 0) {
    return parts.join(' ');
  }
  return user.email ?? undefined;
}

export function mapAdminFeedbackToFeedbackItem(feedback: AdminFeedbackItem): FeedbackListItem {
  const feedbackUser = feedback.user ?? feedback.author ?? feedback.feedbackUser ?? null;
  const jobRef = feedback.job ?? feedback.order ?? null;

  const jobIdSource = jobRef?.code ?? jobRef?.requestId ?? jobRef?.uuid ?? feedback.uuid;
  const jobId = jobIdSource
    ? jobIdSource.toString().startsWith('#')
      ? jobIdSource.toString()
      : `#${jobIdSource}`
    : '#—';

  const reason =
    feedback.title?.trim() || feedback.subject?.trim() ||
    (feedback.userType ? `${feedback.userType} feedback` : 'Feedback');

  const description = feedback.message ?? feedback.description ?? '';

  return {
    jobId,
    name: buildName(feedbackUser) ?? '—',
    email: feedbackUser?.email ?? undefined,
    icon: feedbackUser?.picture ?? undefined,
    reportsDetails: {
      reason,
      description,
    },
    timeline: {
      submitted: {
        date: formatDate(feedback.createdAt ?? feedback.updatedAt),
        time: formatTime(feedback.createdAt ?? feedback.updatedAt),
      },
    },
  };
}
