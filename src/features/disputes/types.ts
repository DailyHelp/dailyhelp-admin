import type { PaginationMeta } from '@/features/users/types';

export interface AdminJobDisputeParticipant {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  picture?: string;
  serviceCategory?: string;
}

export interface AdminJobDisputeJobInfo {
  uuid?: string;
  code?: string;
  requestId?: string | null;
  price?: number | null;
  description?: string | null;
  acceptedAt?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface AdminJobDisputeResolutionInfo {
  action?: string | null;
  note?: string | null;
  refundAmount?: number | null;
  providerAmount?: number | null;
  commissionAmount?: number | null;
  resolvedAt?: string | null;
}

export interface AdminJobDisputeListItem {
  uuid: string;
  code?: string;
  requestId?: string | null;
  status?: string | null;
  category?: string | null;
  reason?: string | null;
  description?: string | null;
  pictures?: string | string[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  submittedAt?: string | null;
  resolvedAt?: string | null;
  customer?: AdminJobDisputeParticipant | null;
  serviceProvider?: AdminJobDisputeParticipant | null;
  submittedBy?: AdminJobDisputeParticipant | null;
  submittedFor?: AdminJobDisputeParticipant | null;
  job?: AdminJobDisputeJobInfo | null;
  disputeJob?: AdminJobDisputeJobInfo | null;
  resolution?: AdminJobDisputeResolutionInfo | null;
  resolutionAction?: string | null;
  resolutionNote?: string | null;
  resolutionRefundAmount?: number | null;
}

export interface AdminJobDisputesResponse {
  status: boolean;
  data: AdminJobDisputeListItem[];
  pagination?: PaginationMeta;
}

export interface FetchAdminJobDisputesParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
