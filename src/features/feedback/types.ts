import type { PaginationMeta } from '@/features/users/types';

export interface AdminFeedbackUser {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  picture?: string;
  type?: string;
}

export interface AdminFeedbackJob {
  uuid?: string;
  code?: string;
  requestId?: string | null;
}

export interface AdminFeedbackItem {
  uuid: string;
  title?: string | null;
  subject?: string | null;
  message?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  userType?: string | null;
  user?: AdminFeedbackUser | null;
  author?: AdminFeedbackUser | null;
  feedbackUser?: AdminFeedbackUser | null;
  job?: AdminFeedbackJob | null;
  order?: AdminFeedbackJob | null;
  attachments?: string | string[] | null;
}

export interface AdminFeedbacksResponse {
  status: boolean;
  data: AdminFeedbackItem[];
  pagination?: PaginationMeta;
}

export interface FetchAdminFeedbacksParams {
  page?: number;
  limit?: number;
  userType?: string;
}
