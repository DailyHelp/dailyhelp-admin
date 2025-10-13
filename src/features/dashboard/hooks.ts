import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchDashboardSummary } from './api';
import type { AdminDashboardFilterDto, DashboardSummary } from './types';

export function useDashboardSummary(filters: AdminDashboardFilterDto) {
  return useQuery<DashboardSummary, Error>({
    queryKey: ['dashboard-summary', filters],
    queryFn: () => fetchDashboardSummary(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
