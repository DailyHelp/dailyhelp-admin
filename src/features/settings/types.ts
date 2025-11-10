export interface AdminMainCategorySubcategory {
  uuid?: string;
  id?: string | number;
  name?: string;
  title?: string;
  label?: string;
  description?: string;
}

export interface AdminCategoryJobReport {
  reason?: string;
  autoBlock?: boolean;
}

export interface AdminMainCategoryTips {
  title?: string;
  description?: string;
}

export interface AdminMainCategory {
  uuid?: string;
  id?: string | number;
  reference?: string;
  code?: string;
  name?: string;
  title?: string;
  category?: string;
  icon?: string;
  image?: string;
  thumbnail?: string;
  coverImage?: string;
  subCategories?: Array<AdminMainCategorySubcategory | string>;
  subcategories?: Array<AdminMainCategorySubcategory | string>;
  children?: Array<AdminMainCategorySubcategory | string>;
  reportingServiceProvider?: string;
  reportingClient?: string;
  reportProviderReason?: string;
  reportClientReason?: string;
  reportReasons?: {
    reportingServiceProvider?: string;
    reportingClient?: string;
    jobReports?: AdminCategoryJobReport[];
  };
  jobReports?: AdminCategoryJobReport[];
  jobTips?: AdminMainCategoryTips | null;
  tips?: AdminMainCategoryTips | null;
  jobTipTitle?: string;
  jobTipDescription?: string;
  tipTitle?: string;
  tipDescription?: string;
  subCategoryCount?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface AdminMainCategoriesResponse {
  status: boolean;
  data: AdminMainCategory[];
}

export interface AdminMainCategorySubCategoriesResponse {
  status: boolean;
  data: Array<AdminMainCategorySubcategory | string>;
}

export interface UpdateAdminMainCategoryPayload {
  name?: string;
  icon?: string;
}

export interface CreateAdminSubCategoryPayload {
  name: string;
  mainCategoryUuid: string;
}

export interface DeleteAdminSubCategoryPayload {
  alternativeSubCategoryUuid?: string;
}

export interface CreateAdminMainCategoryPayload {
  name: string;
  icon?: string;
  subCategories?: Array<{ uuid?: string; name: string }>;
}

export interface CreateAdminReasonCategoryPayload {
  type: ReasonCategoryType;
  name: string;
}

export type ReasonCategoryType =
  | 'CANCEL_JOB_PROVIDER'
  | 'DECLINE_OFFER_PROVIDER'
  | 'CANCEL_OFFER_PROVIDER'
  | 'DISPUTE_PROVIDER'
  | 'REPORT_PROVIDER'
  | 'ACCOUNT_DELETION_PROVIDER'
  | 'CANCEL_JOB_CLIENT'
  | 'CANCEL_OFFER_CLIENT'
  | 'DECLINE_OFFER_CLIENT'
  | 'DISPUTE_CLIENT'
  | 'REPORT_CLIENT'
  | 'ACCOUNT_DELETION_CLIENT';

export interface AdminReasonCategoryItem {
  uuid?: string;
  name?: string;
  title?: string;
  description?: string;
  type?: ReasonCategoryType;
  reasons?: Array<{ uuid?: string; name?: string; description?: string }>;
}

export interface AdminReasonCategoriesResponse {
  status: boolean;
  data: AdminReasonCategoryItem[];
}

export interface CreateAdminReasonCategoryPayload {
  type: ReasonCategoryType;
  name: string;
}

export interface DeleteAdminReasonCategoryPayload {
  uuid: string;
}

export interface AdminAccountTier {
  tier?: string;
  name?: string;
  jobsRequired?: number;
  ratingRequired?: number;
  description?: string;
  uuid?: string;
  displayOrder?: number;
  label?: string;
  levelLabel?: string;
  [key: string]: unknown;
}

export interface AdminAccountTiersResponse {
  status: boolean;
  data: AdminAccountTier[];
}

export interface UpdateAdminAccountTierPayload {
  tier?: string;
  label?: string;
  levelLabel?: string;
  description?: string;
  minJobs?: number;
  minAvgRating?: number;
  displayOrder?: number;
}

export interface AdminJobTip {
  uuid?: string;
  id?: string | number;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface AdminJobTipsResponse {
  status: boolean;
  data: AdminJobTip[];
}

export interface CreateAdminJobTipPayload {
  title: string;
  description: string;
}

export interface UpdateAdminJobTipPayload {
  title?: string;
  description?: string;
}

export interface DeleteAdminJobTipPayload {
  uuid: string;
}
