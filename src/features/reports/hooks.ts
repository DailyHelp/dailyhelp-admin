import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAdminReports, resolveAdminReport } from './api';
import type { AdminReportsResponse, FetchAdminReportsParams } from './types';

export function useAdminReports(filters: FetchAdminReportsParams) {
  return useQuery<AdminReportsResponse, Error>({
    queryKey: ['admin-reports', filters],
    queryFn: () => fetchAdminReports(filters),
    placeholderData: keepPreviousData,
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (uuid: string) => resolveAdminReport(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
    },
  });
}
