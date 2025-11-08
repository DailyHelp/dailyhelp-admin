'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type { AdminJobsResponse, FetchAdminJobsParams } from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }
  params.append(key, String(value));
}

export async function fetchAdminJobs(filters: FetchAdminJobsParams): Promise<AdminJobsResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'status', filters.status);
  appendParam(params, 'search', filters.search);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminJobsResponse>(`/jobs${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch jobs.');
  }

  return response;
}
