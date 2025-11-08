import type { PaginationMeta } from '@/features/users/types';

export interface AdminReportParticipant {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: string;
  type?: string;
  serviceCategory?: string;
  picture?: string;
}

export interface AdminReportJobInfo {
  uuid?: string;
  code?: string;
  requestId?: string | null;
  price?: number | null;
  description?: string | null;
  requestor?: AdminReportParticipant | null;
  serviceProvider?: AdminReportParticipant | null;
}

export interface AdminReportListItem {
  uuid: string;
  code?: string | null;
  status?: string | null;
  reason?: string | null;
  category?: string | null;
  description?: string | null;
  createdAt?: string | null;
  resolvedAt?: string | null;
  updatedAt?: string | null;
  reporter?: AdminReportParticipant | null;
  reportedUser?: AdminReportParticipant | null;
  reportedParty?: AdminReportParticipant | null;
  victim?: AdminReportParticipant | null;
  offender?: AdminReportParticipant | null;
  job?: AdminReportJobInfo | null;
  dispute?: AdminReportJobInfo | null;
  requestor?: AdminReportParticipant | null;
  serviceProvider?: AdminReportParticipant | null;
  customer?: AdminReportParticipant | null;
  submittedBy?: AdminReportParticipant | null;
  amount?: number | null;
  attachments?: string | string[] | null;
  pictures?: string | string[] | null;
}

export interface AdminReportsResponse {
  status: boolean;
  data: AdminReportListItem[];
  pagination?: PaginationMeta;
}

export interface FetchAdminReportsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
