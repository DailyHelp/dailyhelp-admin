'use client';

import { apiRequest } from '@/lib/api-client';
import type { ApiError } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type {
  AdminCustomer,
  AdminCustomersResponse,
  FetchAdminCustomersParams,
  AdminCustomerJobsResponse,
  FetchAdminCustomerJobsParams,
  AdminJobTimelineResponse,
  AdminJobDisputeResponse,
  AdminConversationHistoryResponse,
  FetchConversationHistoryParams,
  AdminCustomerWalletResponse,
  FetchCustomerWalletParams,
} from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    return;
  }
  params.append(key, String(value));
}

export async function fetchAdminCustomers(
  filters: FetchAdminCustomersParams,
): Promise<AdminCustomersResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'search', filters.search);
  appendParam(params, 'status', filters.status);

  const path = params.size > 0 ? `/customers?${params.toString()}` : '/customers';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminCustomersResponse>(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch customers.');
  }

  return response;
}

export async function suspendUser(uuid: string, reason: string): Promise<void> {
  if (!uuid) {
    throw new Error('User id is required');
  }

  const token = useAuthStore.getState().accessToken;
  await apiRequest(`/users/${uuid}/suspend`, {
    method: 'POST',
    json: { reason },
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function reactivateUser(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('User id is required');
  }

  const token = useAuthStore.getState().accessToken;
  await apiRequest(`/users/${uuid}/reactivate`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function fetchAdminJobTimeline(jobUuid: string): Promise<AdminJobTimelineResponse> {
  if (!jobUuid) {
    throw new Error('Job id is required');
  }

  const token = useAuthStore.getState().accessToken;
  try {
    return await apiRequest<AdminJobTimelineResponse>(`/jobs/${jobUuid}/timelines`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 404) {
      return { status: true, data: [] };
    }
    throw error;
  }
}

export async function fetchAdminJobDispute(jobUuid: string): Promise<AdminJobDisputeResponse> {
  if (!jobUuid) {
    throw new Error('Job id is required');
  }

  const token = useAuthStore.getState().accessToken;
  try {
    return await apiRequest<AdminJobDisputeResponse>(`/jobs/${jobUuid}/dispute`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 404) {
      return { status: true, data: null };
    }
    throw error;
  }
}

export async function fetchConversationHistory(
  params: FetchConversationHistoryParams,
): Promise<AdminConversationHistoryResponse> {
  if (!params.customerUuid) {
    throw new Error('customerUuid is required');
  }

  const search = new URLSearchParams();
  appendParam(search, 'page', params.page);
  appendParam(search, 'limit', params.limit);
  appendParam(search, 'providerUuid', params.providerUuid);
  appendParam(search, 'customerUuid', params.customerUuid);

  const token = useAuthStore.getState().accessToken;
  return apiRequest<AdminConversationHistoryResponse>(
    `/conversations/history?${search.toString()}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
}

export async function fetchCustomerWallet(
  uuid: string,
  params: FetchCustomerWalletParams,
): Promise<AdminCustomerWalletResponse> {
  if (!uuid) {
    throw new Error('customerUuid is required');
  }

  const search = new URLSearchParams();
  appendParam(search, 'page', params.page);
  appendParam(search, 'limit', params.limit);
  appendParam(search, 'status', params.status);

  const token = useAuthStore.getState().accessToken;
  return apiRequest<AdminCustomerWalletResponse>(
    `/customers/${uuid}/wallet?${search.toString()}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
}

export async function fetchAdminCustomerById(uuid: string): Promise<AdminCustomer | null> {
  if (!uuid) {
    return null;
  }

  const response = await fetchAdminCustomers({ page: 1, limit: 1, search: uuid });
  if (!response.data || response.data.length === 0) {
    return null;
  }

  const [first] = response.data;
  if (first.uuid === uuid) {
    return first;
  }

  return null;
}

export async function fetchAdminCustomerJobs(
  customerUuid: string,
  filters: FetchAdminCustomerJobsParams,
): Promise<AdminCustomerJobsResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'status', filters.status);
  appendParam(params, 'search', filters.search);

  const path =
    params.size > 0
      ? `/customers/${customerUuid}/jobs?${params.toString()}`
      : `/customers/${customerUuid}/jobs`;
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminCustomerJobsResponse>(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch customer jobs.');
  }

  return response;
}
