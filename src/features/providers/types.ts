import type { PaginationMeta, WalletTransaction } from '@/features/users/types';

export enum AdminProviderStatus {
  SUSPENDED = 'SUSPENDED',
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export interface AdminProvider {
  uuid: string;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  picture?: string | null;
  tier?: string | null;
  serviceCategory?: string | null;
  category?: string | null;
  primaryCategory?: string | null;
  status?: AdminProviderStatus | string;
  createdAt?: string | null;
  gender?: string | null;
  dob?: string | null;
  nin?: string | null;
  bvn?: string | null;
  address?: string | null;
  passport?: string | null;
}

export interface AdminProvidersResponse {
  status: boolean;
  data: AdminProvider[];
  pagination: PaginationMeta;
}

export interface FetchAdminProvidersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminProviderStatus | string;
}

export interface AdminProviderReviewCustomer {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}

export interface AdminProviderReview {
  uuid: string;
  rating?: number | null;
  comment?: string | null;
  review?: string | null;
  createdAt?: string | null;
  jobCode?: string | null;
  customer?: AdminProviderReviewCustomer | null;
}

export interface AdminProviderReviewsResponse {
  status: boolean;
  data: AdminProviderReview[];
  pagination: PaginationMeta;
}

export interface FetchAdminProviderReviewsParams {
  page?: number;
  limit?: number;
}

export interface AdminProviderJobCustomer {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  picture?: string;
}

export interface AdminProviderJob {
  uuid: string;
  requestId?: string | null;
  code: string;
  status: string;
  price: number | null;
  tip: number | null;
  createdAt: string;
  startDate?: string | null;
  endDate?: string | null;
  acceptedAt?: string | null;
  description?: string | null;
  pictures?: string[] | string | null;
  customer?: AdminProviderJobCustomer | null;
}

export interface AdminProviderJobsResponse {
  status: boolean;
  data: AdminProviderJob[];
  pagination: PaginationMeta;
}

export interface FetchAdminProviderJobsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface AdminProviderAnalyticsRevenue {
  earnings?: number;
  tips?: number;
  commission?: number;
  jobPayment?: number;
  otherIncome?: number;
  deductions?: number;
}

export interface AdminProviderAnalyticsOffers {
  total?: number;
  accepted?: number;
  declined?: number;
  cancelled?: number;
  cancelledByClient?: number;
  declinedByClient?: number;
}

export interface AdminProviderAnalyticsJobs {
  total?: number;
  completed?: number;
  canceled?: number;
  disputed?: number;
}

export interface AdminProviderAnalyticsData {
  revenue?: AdminProviderAnalyticsRevenue | null;
  jobs?: AdminProviderAnalyticsJobs | null;
  offers?: AdminProviderAnalyticsOffers | null;
}

export interface AdminProviderAnalyticsResponse {
  status: boolean;
  data: AdminProviderAnalyticsData | null;
}

export type AdminProviderAnalyticsFilter =
  | 'TODAY'
  | 'CURRENT_WEEK'
  | 'LAST_WEEK'
  | 'THIS_MONTH'
  | 'THIS_YEAR'
  | 'ALL_TIME'
  | 'CUSTOM';

export interface FetchAdminProviderAnalyticsParams {
  filter?: AdminProviderAnalyticsFilter;
  startDate?: string;
  endDate?: string;
}

export interface AdminProviderWalletResponse {
  status: boolean;
  data: {
    wallet: {
      totalBalance: number;
      availableBalance: number;
      pendingBalance?: number;
    };
    transactions: WalletTransaction[];
    pagination: PaginationMeta;
  };
}

export interface FetchProviderWalletParams {
  page?: number;
  limit?: number;
  status?: string;
}
