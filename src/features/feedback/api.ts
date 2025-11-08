'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type { AdminFeedbacksResponse, FetchAdminFeedbacksParams } from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }
  params.append(key, String(value));
}

export async function fetchAdminFeedbacks(
  filters: FetchAdminFeedbacksParams,
): Promise<AdminFeedbacksResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'userType', filters.userType);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminFeedbacksResponse>(`/feedbacks${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch feedback.');
  }

  return response;
}
