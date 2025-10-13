export enum AdminCustomerStatus {
  SUSPENDED = 'SUSPENDED',
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export interface AdminCustomer {
  uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  identityVerified: boolean;
  suspended: boolean;
  createdAt: string;
  status: AdminCustomerStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  size: number;
  pages: number;
}

export interface AdminCustomersResponse {
  status: boolean;
  data: AdminCustomer[];
  pagination: PaginationMeta;
}

export interface FetchAdminCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminCustomerStatus;
}

export interface AdminCustomerJobServiceProvider {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  picture?: string;
  tier?: string;
  serviceCategory?: string;
}

export interface AdminCustomerJob {
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
  serviceProvider?: AdminCustomerJobServiceProvider | null;
}

export interface AdminJobTimelineEvent {
  uuid: string;
  event?: string;
  createdAt?: string;
  actor?: {
    uuid?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
  } | null;
}

export interface AdminJobTimelineResponse {
  status: boolean;
  data: AdminJobTimelineEvent[];
}

export interface AdminJobDispute {
  uuid: string;
  code?: string;
  category?: string;
  description?: string;
  pictures?: string | string[] | null;
  status?: string;
  submittedBy?: {
    uuid?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
  } | null;
  submittedFor?: {
    uuid?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
  } | null;
  resolutionAction?: string | null;
  resolutionNote?: string | null;
  resolutionRefundAmount?: number | null;
  resolutionProviderAmount?: number | null;
  resolutionCommissionAmount?: number | null;
  resolvedAt?: string | null;
}

export interface AdminJobDisputeResponse {
  status: boolean;
  data: AdminJobDispute | null;
}

export interface AdminConversationParticipant {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}

export interface AdminConversationMessage {
  uuid: string;
  message?: string | null;
  type?: string | null;
  status?: string | null;
  amount?: number | null;
  createdAt: string;
  from?: AdminConversationParticipant | null;
  to?: AdminConversationParticipant | null;
  attachments?: string[] | null;
}

export interface AdminConversationHistoryResponse {
  status: boolean;
  data: AdminConversationMessage[];
  pagination?: PaginationMeta;
}

export interface FetchConversationHistoryParams {
  providerUuid?: string;
  customerUuid: string;
  page?: number;
  limit?: number;
}

export interface AdminCustomerWalletResponse {
  status: boolean;
  data: {
    wallet: {
      totalBalance: number;
      availableBalance: number;
    };
    transactions: WalletTransaction[];
    pagination: PaginationMeta;
  };
}

export interface WalletTransaction {
  uuid: string;
  amount: number;
  status: string;
  type: string;
  remark?: string;
  locked?: boolean;
  createdAt: string;
}

export interface FetchCustomerWalletParams {
  page?: number;
  limit?: number;
  status?: string;
}

export interface AdminCustomerJobsResponse {
  status: boolean;
  data: AdminCustomerJob[];
  pagination: PaginationMeta;
}

export interface FetchAdminCustomerJobsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
