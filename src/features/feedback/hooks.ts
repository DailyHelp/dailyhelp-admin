import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchAdminFeedbacks } from './api';
import type { AdminFeedbacksResponse, FetchAdminFeedbacksParams } from './types';

export function useAdminFeedbacks(filters: FetchAdminFeedbacksParams) {
  return useQuery<AdminFeedbacksResponse, Error>({
    queryKey: ['admin-feedbacks', filters],
    queryFn: () => fetchAdminFeedbacks(filters),
    placeholderData: keepPreviousData,
  });
}
