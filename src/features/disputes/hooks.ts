import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchAdminJobDisputes } from './api';
import type { AdminJobDisputesResponse, FetchAdminJobDisputesParams } from './types';

export function useAdminJobDisputes(filters: FetchAdminJobDisputesParams) {
  return useQuery<AdminJobDisputesResponse, Error>({
    queryKey: ['admin-job-disputes', filters],
    queryFn: () => fetchAdminJobDisputes(filters),
    placeholderData: keepPreviousData,
  });
}
