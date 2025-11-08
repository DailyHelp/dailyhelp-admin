'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type {
  AdminProvider,
  AdminProvidersResponse,
  AdminProviderReviewsResponse,
  AdminProviderJobsResponse,
  AdminProviderAnalyticsResponse,
  AdminProviderWalletResponse,
  FetchAdminProvidersParams,
  FetchAdminProviderReviewsParams,
  FetchAdminProviderJobsParams,
  FetchAdminProviderAnalyticsParams,
  FetchProviderWalletParams,
} from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }
  params.append(key, String(value));
}

function getAuthHeaders() {
  const token = useAuthStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export async function fetchAdminProviders(
  filters: FetchAdminProvidersParams,
): Promise<AdminProvidersResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'search', filters.search);
  appendParam(params, 'status', filters.status);

  const path = params.size > 0 ? `/providers?${params.toString()}` : '/providers';

  const response = await apiRequest<AdminProvidersResponse>(path, {
    headers: getAuthHeaders(),
  });

  if (!response.status) {
    throw new Error('Unable to fetch service providers.');
  }

  return response;
}

export async function fetchAdminProviderById(uuid: string): Promise<AdminProvider | null> {
  if (!uuid) {
    return null;
  }

  const response = await fetchAdminProviders({ page: 1, limit: 1, search: uuid });
  if (!response.data || response.data.length === 0) {
    return null;
  }

  const match = response.data.find((provider) => provider.uuid === uuid);
  return match ?? response.data[0] ?? null;
}

export async function fetchAdminProviderReviews(
  uuid: string,
  params: FetchAdminProviderReviewsParams,
): Promise<AdminProviderReviewsResponse> {
  if (!uuid) {
    throw new Error('Provider id is required');
  }

  const search = new URLSearchParams();
  appendParam(search, 'page', params.page);
  appendParam(search, 'limit', params.limit);

  const query = search.size > 0 ? `?${search.toString()}` : '';
  const response = await apiRequest<AdminProviderReviewsResponse>(
    `/providers/${uuid}/reviews${query}`,
    {
      headers: getAuthHeaders(),
    },
  );

  if (!response.status) {
    throw new Error('Unable to fetch provider reviews.');
  }

  return response;
}

export async function fetchAdminProviderJobs(
  uuid: string,
  filters: FetchAdminProviderJobsParams,
): Promise<AdminProviderJobsResponse> {
  if (!uuid) {
    throw new Error('Provider id is required');
  }

  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'status', filters.status);
  appendParam(params, 'search', filters.search);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const response = await apiRequest<AdminProviderJobsResponse>(
    `/providers/${uuid}/jobs${query}`,
    {
      headers: getAuthHeaders(),
    },
  );

  if (!response.status) {
    throw new Error('Unable to fetch provider jobs.');
  }

  return response;
}

export async function fetchAdminProviderAnalytics(
  uuid: string,
  filters: FetchAdminProviderAnalyticsParams,
): Promise<AdminProviderAnalyticsResponse> {
  if (!uuid) {
    throw new Error('Provider id is required');
  }

  const params = new URLSearchParams();
  appendParam(params, 'filter', filters.filter);
  appendParam(params, 'startDate', filters.startDate);
  appendParam(params, 'endDate', filters.endDate);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  return apiRequest<AdminProviderAnalyticsResponse>(`/providers/${uuid}/analytics${query}`, {
    headers: getAuthHeaders(),
  });
}

export async function fetchProviderWallet(
  uuid: string,
  params: FetchProviderWalletParams,
): Promise<AdminProviderWalletResponse> {
  if (!uuid) {
    throw new Error('Provider id is required');
  }

  const search = new URLSearchParams();
  appendParam(search, 'page', params.page);
  appendParam(search, 'limit', params.limit);
  appendParam(search, 'status', params.status);

  const query = search.size > 0 ? `?${search.toString()}` : '';
  return apiRequest<AdminProviderWalletResponse>(`/providers/${uuid}/wallet${query}`, {
    headers: getAuthHeaders(),
  });
}

export async function suspendProvider(uuid: string, reason: string): Promise<void> {
  if (!uuid) {
    throw new Error('Provider id is required');
  }

  await apiRequest(`/users/${uuid}/suspend`, {
    method: 'POST',
    json: { reason },
    headers: getAuthHeaders(),
  });
}

export async function reactivateProvider(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('Provider id is required');
  }

  await apiRequest(`/users/${uuid}/reactivate`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
}
