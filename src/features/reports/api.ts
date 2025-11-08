'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type { AdminReportsResponse, FetchAdminReportsParams } from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }
  params.append(key, String(value));
}

export async function fetchAdminReports(
  filters: FetchAdminReportsParams,
): Promise<AdminReportsResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'status', filters.status);
  appendParam(params, 'search', filters.search);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminReportsResponse>(`/reports${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch reports.');
  }

  return response;
}

export async function resolveAdminReport(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('Report id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/reports/${uuid}/resolve`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
