// Global type definitions for dummy data across the app

// Generic image/icon reference (SVGs are declared as string modules)
export type IconRef = string;

export interface TimelinePoint {
  date: string;
  time: string;
}

export interface JobTimeline {
  accepted?: TimelinePoint;
  started?: TimelinePoint;
  ended?: TimelinePoint;
  submitted?: TimelinePoint;
  resolution?: TimelinePoint;
}

export interface PersonRef {
  name: string;
  role?: string;
  icon?: IconRef;
  badgeIcon?: IconRef;
  uuid?: string;
  email?: string;
  avatar?: IconRef;
}

export interface JobDisputeDetails {
  issue: string;
  description: string;
  images: IconRef | IconRef[];
}

export interface JobResolutionDetails {
  issue: string;
  description: string;
  refundAmount?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'provider' | string;
  text?: string;
  time: string;
  date: string;
  status?: string;
  type?: string;
  amount?: string;
  images?: string[];
}

export interface ChatThread {
  chatId: string;
  with: PersonRef & { avatar?: IconRef };
  messages: ChatMessage[];
}

export interface Transaction {
  id: string;
  name: string;
  type: 'Credit' | 'Debit' | string;
  amount: string;
  date: string;
  status: string;
}

export interface WalletRecord {
  balance: string;
  transactions: Transaction[];
}

export interface JobItem {
  jobId: string;
  jobUuid?: string;
  requestId?: string;
  jobCode?: string;
  client?: PersonRef;
  serviceProvider?: PersonRef;
  amount?: string;
  status?: string;
  reason?: string;
  statusReason?: string;
  jobDesc?: string;
  jobInspo?: IconRef;
  disputeDetails?: JobDisputeDetails;
  resolutionDetails?: JobResolutionDetails | string;
  timeline: JobTimeline;
  chat?: ChatThread[];
}

// Users
export interface UserProfile {
  id: string;
  name: string;
  gender: string;
  status: string;
  email: string;
  phone: string;
  dob: string;
  nin: string;
  bvn: string;
  avatar: IconRef;
  passport?: IconRef;

  jobs: JobItem[];
  wallet: WalletRecord[];
  chat?: ChatThread[];
}

// Providers
export interface ProviderBadgeMeta {
  type: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | string;
  color?: string;
  icon?: string;
}

export interface ProviderOverview {
  ratingLevel: string;
  levelTag: string;
  badge: ProviderBadgeMeta;
  completionPercent: number;
  jobsCompleted: { total: number; done: number };
  ratings: {
    average: number;
    totalReviews: number;
    breakdown: Record<number, number>;
    score: number;
    total: number;
  };
  about: string;
  prices: { startingFee: string; minimumOffer: string };
  gallery: string[];
  reviews: { id: string; name: string; date: string; text: string; rating: number }[];
}

export interface ProviderAnalytics {
  revenue: {
    earnings: number;
    tips: number;
    commission: number;
    breakdown: {
      jobPayment: number;
      tips: number;
      income: number;
      commissionRate: string;
      deductions: number;
      finalEarnings: number;
    };
  };
  jobs: { total: number; completed: number; canceled: number; disputed: number };
  offers: {
    total: number;
    accepted: number;
    declined: number;
    cancelled: number;
    declinedByClient: number;
    cancelledByClient: number;
  };
  offersRate: {
    acceptanceRate: number;
    declineRate: number;
    cancelledRate: number;
    cancelledByClientRate: number;
    declinedByClientRate: number;
  };
}

export interface ProviderProfile extends Omit<UserProfile, 'jobs' | 'wallet' | 'chat'> {
  category: string;
  address?: string;
  direction?: string;
  badgeIcon?: IconRef;
  overview?: ProviderOverview;
  analytics?: ProviderAnalytics;
  jobs: JobItem[];
  wallet: WalletRecord[];
  chat?: ChatThread[];
}

// Settings: Categories + Reports + Tips
export interface CategoryJobReport {
  reason: string;
  autoBlock: boolean;
}

export interface SettingsReportReasons {
  reportingServiceProvider?: string;
  reportingClient?: string;
  jobReports?: CategoryJobReport[];
}

export interface SettingsTip {
  title: string;
  description: string;
}

export interface SettingsCategoryItem {
  jobId: string;
  category: string;
  subCategories: string[];
  icon?: string;
  reportReasons: SettingsReportReasons;
  jobTips: SettingsTip;
  uuid?: string;
  subCategoryCount?: number;
  iconMissing?: boolean;
}

export interface FeedbackListItem {
  jobId: string;
  name?: string;
  email?: string;
  icon?: IconRef;
  reportsDetails?: { reason: string; description: string; images?: string[] };
  timeline: Pick<JobTimeline, 'submitted'>;
  client?: PersonRef;
  serviceProvider?: PersonRef;
  amount?: string;
  status?: string;
  reason?: string;
}

// Shared sorting types
export type SortDirection = 'asc' | 'desc';
export type UserSortKey = 'name' | 'email' | 'phone' | 'status' | 'dob';
export type ProviderSortKey = 'name' | 'email' | 'phone' | 'status' | 'createdAt' | 'category';
export type JobSortKey =
  | 'jobId'
  | 'client'
  | 'serviceProvider'
  | 'amount'
  | 'startDate'
  | 'endDate'
  | 'status'
  | 'reason'
  | 'dateSubmitted';
export interface SortConfig<K extends string | null = string> {
  key: K | null;
  direction: SortDirection;
}

// Reports
export interface ReportDetails {
  description: string;
  images: string[] | string;
}

export interface ReportEntry {
  jobId: string;
  uuid?: string;
  reporter?: PersonRef & { service?: string };
  reportedParty?: PersonRef;
  amount?: string;
  reason?: string;
  status?: string;
  statusReason?: string;
  reportsDetails?: ReportDetails;
  timeline: JobTimeline;
  chat?: ChatThread[];
  // Some entries in datasets use client/serviceProvider keys
  client?: PersonRef;
  serviceProvider?: PersonRef;
}

// Feedback
export interface FeedbackListItem {
  jobId: string;
  name?: string;
  email?: string;
  icon?: IconRef;
  reportsDetails?: { reason: string; description: string; images?: string[] };
  timeline: Pick<JobTimeline, 'submitted'>;
  client?: PersonRef;
  serviceProvider?: PersonRef;
  amount?: string;
  status?: string;
  reason?: string;
}

// Team members
export type TeamRole = string;

export interface TeamMember {
  jobId: string; // internal ID like TM0001
  uuid?: string;
  name: string;
  email: string;
  emailaddress?: string; // mirrors email for UI compatibility
  role: TeamRole;
  status: string;
  avatar: IconRef;
  phone: string;
  dob: string;
  date: string; // date added
  lastLogin: string;
  permissions: string[];
  roleUuid?: string;
}

// Roles (team roles model)
export interface Role {
  id: string;
  title: string;
  permissions: string[];
  uuid?: string;
  description?: string;
  fullAccess?: boolean;
  permissionCodes?: string[];
}
