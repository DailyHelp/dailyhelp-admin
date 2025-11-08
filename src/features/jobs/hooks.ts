import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchAdminJobs } from './api';
import type { AdminJobsResponse, FetchAdminJobsParams } from './types';

export function useAdminJobs(filters: FetchAdminJobsParams, options?: { enabled?: boolean }) {
  return useQuery<AdminJobsResponse, Error>({
    queryKey: ['admin-jobs', filters],
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
    queryFn: () => fetchAdminJobs(filters),
  });
}
