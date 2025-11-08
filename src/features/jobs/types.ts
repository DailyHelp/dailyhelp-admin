import type { PaginationMeta } from '@/features/users/types';

export type AdminJobStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DISPUTED'
  | 'CANCELED'
  | string;

export interface AdminJobCustomer {
  uuid?: string;
  firstname?: string | null;
  lastname?: string | null;
  fullname?: string | null;
  email?: string | null;
  phone?: string | null;
  picture?: string | null;
}

export interface AdminJobServiceProvider {
  uuid?: string;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  picture?: string | null;
  tier?: string | null;
  serviceCategory?: string | null;
}

export interface AdminJobListItem {
  uuid: string;
  requestId?: string | null;
  code: string;
  status: AdminJobStatus;
  price: number | null;
  tip?: number | null;
  createdAt: string;
  startDate?: string | null;
  endDate?: string | null;
  acceptedAt?: string | null;
  description?: string | null;
  pictures?: string[] | string | null;
  requestor?: AdminJobCustomer | null;
  customer?: AdminJobCustomer | null;
  serviceProvider?: AdminJobServiceProvider | null;
}

export interface AdminJobsResponse {
  status: boolean;
  data: AdminJobListItem[];
  pagination: PaginationMeta;
}

export interface FetchAdminJobsParams {
  page?: number;
  limit?: number;
  status?: AdminJobStatus;
  search?: string;
}
