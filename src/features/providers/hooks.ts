import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  fetchAdminProviderById,
  fetchAdminProviderReviews,
  fetchAdminProviderJobs,
  fetchAdminProviderAnalytics,
  fetchProviderWallet,
  fetchAdminProviders,
} from './api';
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

export function useAdminProviders(filters: FetchAdminProvidersParams) {
  return useQuery<AdminProvidersResponse, Error>({
    queryKey: ['admin-providers', filters],
    queryFn: () => fetchAdminProviders(filters),
    placeholderData: keepPreviousData,
  });
}

export function useAdminProvider(uuid: string | undefined, options?: { enabled?: boolean }) {
  return useQuery<AdminProvider | null, Error>({
    queryKey: ['admin-provider', uuid],
    enabled: Boolean(uuid) && (options?.enabled ?? true),
    queryFn: () => {
      if (!uuid) {
        return Promise.resolve(null);
      }
      return fetchAdminProviderById(uuid);
    },
  });
}

export function useAdminProviderReviews(
  uuid: string | undefined,
  params: FetchAdminProviderReviewsParams,
  options?: { enabled?: boolean },
) {
  return useQuery<AdminProviderReviewsResponse, Error>({
    queryKey: ['admin-provider-reviews', uuid, params],
    enabled: Boolean(uuid) && (options?.enabled ?? true),
    placeholderData: keepPreviousData,
    queryFn: () => {
      if (!uuid) {
        throw new Error('Provider id is required');
      }
      return fetchAdminProviderReviews(uuid, params);
    },
  });
}

export function useAdminProviderJobs(
  uuid: string | undefined,
  filters: FetchAdminProviderJobsParams,
  options?: { enabled?: boolean },
) {
  return useQuery<AdminProviderJobsResponse, Error>({
    queryKey: ['admin-provider-jobs', uuid, filters],
    enabled: Boolean(uuid) && (options?.enabled ?? true),
    placeholderData: keepPreviousData,
    queryFn: () => {
      if (!uuid) {
        throw new Error('Provider id is required');
      }
      return fetchAdminProviderJobs(uuid, filters);
    },
  });
}

export function useAdminProviderAnalytics(
  uuid: string | undefined,
  filters: FetchAdminProviderAnalyticsParams,
  options?: { enabled?: boolean },
) {
  return useQuery<AdminProviderAnalyticsResponse, Error>({
    queryKey: ['admin-provider-analytics', uuid, filters],
    enabled: Boolean(uuid) && (options?.enabled ?? true),
    queryFn: () => {
      if (!uuid) {
        throw new Error('Provider id is required');
      }
      return fetchAdminProviderAnalytics(uuid, filters);
    },
  });
}

export function useProviderWallet(
  uuid: string | undefined,
  params: FetchProviderWalletParams,
  options?: { enabled?: boolean },
) {
  return useQuery<AdminProviderWalletResponse, Error>({
    queryKey: ['admin-provider-wallet', uuid, params],
    enabled: Boolean(uuid) && (options?.enabled ?? true),
    placeholderData: keepPreviousData,
    queryFn: () => {
      if (!uuid) {
        throw new Error('Provider id is required');
      }
      return fetchProviderWallet(uuid, params);
    },
  });
}
