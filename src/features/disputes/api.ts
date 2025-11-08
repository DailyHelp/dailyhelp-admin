'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type { AdminJobDisputesResponse, FetchAdminJobDisputesParams } from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }
  params.append(key, String(value));
}

export async function fetchAdminJobDisputes(
  filters: FetchAdminJobDisputesParams,
): Promise<AdminJobDisputesResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'status', filters.status);
  appendParam(params, 'search', filters.search);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminJobDisputesResponse>(`/jobs/disputes${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch job disputes.');
  }

  return response;
}
