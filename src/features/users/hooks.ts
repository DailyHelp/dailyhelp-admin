import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchAdminCustomers,
  fetchAdminCustomerById,
  fetchAdminCustomerJobs,
  fetchAdminJobTimeline,
  fetchAdminJobDispute,
  fetchConversationHistory,
  fetchCustomerWallet,
} from './api';
import type {
  AdminCustomer,
  AdminCustomerJobsResponse,
  AdminCustomersResponse,
  FetchAdminCustomerJobsParams,
  FetchAdminCustomersParams,
  AdminJobTimelineResponse,
  AdminJobDisputeResponse,
  AdminConversationHistoryResponse,
  FetchConversationHistoryParams,
  AdminCustomerWalletResponse,
  FetchCustomerWalletParams,
} from './types';

export function useAdminCustomers(filters: FetchAdminCustomersParams) {
  return useQuery<AdminCustomersResponse, Error>({
    queryKey: ['admin-customers', filters],
    queryFn: () => fetchAdminCustomers(filters),
    placeholderData: keepPreviousData,
  });
}

export function useAdminCustomerJobs(
  customerUuid: string | undefined,
  filters: FetchAdminCustomerJobsParams,
  options?: { enabled?: boolean },
) {
  return useQuery<AdminCustomerJobsResponse, Error>({
    queryKey: ['admin-customer-jobs', customerUuid, filters],
    queryFn: () => {
      if (!customerUuid) {
        throw new Error('Customer id is required');
      }
      return fetchAdminCustomerJobs(customerUuid, filters);
    },
    placeholderData: keepPreviousData,
    enabled: Boolean(customerUuid) && (options?.enabled ?? true),
  });
}

export function useAdminCustomer(uuid: string | undefined, options?: { enabled?: boolean }) {
  return useQuery<AdminCustomer | null, Error>({
    queryKey: ['admin-customer', uuid],
    enabled: Boolean(uuid) && (options?.enabled ?? true),
    queryFn: () => {
      if (!uuid) {
        return Promise.resolve(null);
      }
      return fetchAdminCustomerById(uuid);
    },
  });
}

export function useAdminJobTimeline(jobUuid: string | undefined, options?: { enabled?: boolean }) {
  return useQuery<AdminJobTimelineResponse, Error>({
    queryKey: ['admin-job-timeline', jobUuid],
    enabled: Boolean(jobUuid) && (options?.enabled ?? true),
    queryFn: () => {
      if (!jobUuid) {
        throw new Error('Job id is required');
      }
      return fetchAdminJobTimeline(jobUuid);
    },
  });
}

export function useAdminJobDispute(jobUuid: string | undefined, options?: { enabled?: boolean }) {
  return useQuery<AdminJobDisputeResponse, Error>({
    queryKey: ['admin-job-dispute', jobUuid],
    enabled: Boolean(jobUuid) && (options?.enabled ?? true),
    queryFn: () => {
      if (!jobUuid) {
        throw new Error('Job id is required');
      }
      return fetchAdminJobDispute(jobUuid);
    },
  });
}

export function useConversationHistory(
  params: FetchConversationHistoryParams,
  options?: { enabled?: boolean },
) {
  return useInfiniteQuery<AdminConversationHistoryResponse, Error>({
    enabled: Boolean(params.customerUuid) && (options?.enabled ?? true),
    initialPageParam: 1,
    queryKey: ['conversation-history', params],
    queryFn: ({ pageParam }) =>
      fetchConversationHistory({ ...params, page: pageParam as number, limit: params.limit }),
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.pagination;
      if (!pagination) {
        return undefined;
      }
      const nextPage = pagination.page + 1;
      return nextPage <= pagination.pages ? nextPage : undefined;
    },
  });
}

export function useCustomerWallet(
  customerUuid: string | undefined,
  params: FetchCustomerWalletParams,
  options?: { enabled?: boolean },
) {
  return useQuery<AdminCustomerWalletResponse, Error>({
    queryKey: ['admin-customer-wallet', customerUuid, params],
    enabled: Boolean(customerUuid) && (options?.enabled ?? true),
    queryFn: () => {
      if (!customerUuid) {
        throw new Error('customerUuid is required');
      }
      return fetchCustomerWallet(customerUuid, params);
    },
    placeholderData: keepPreviousData,
  });
}
