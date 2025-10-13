export interface DashboardTotals {
  revenue: number;
  payout: number;
  customers: number;
  providers: number;
  totalAmountProcessed?: number;
  jobs: {
    inProgress: number;
    completed: number;
    canceled: number;
    disputed: number;
  };
}

export interface DashboardRevenueByMonth {
  month: string;
  monthKey: string;
  total: number;
  amountProcessed?: number;
  totalAmountProcessed?: number;
  revenue?: number;
  totalRevenue?: number;
}

export interface DashboardCategoryRevenue {
  uuid: string;
  name: string;
  revenue: number;
}

export interface DashboardCategoryRevenueResponse {
  data?: DashboardCategoryRevenue[];
  items?: DashboardCategoryRevenue[];
  pagination: DashboardPagination;
}

export interface DashboardLocationItem {
  name: string;
  total: number;
}

export interface DashboardCategoryProvidersItem {
  uuid: string;
  name: string;
  totalProviders: number;
}

export interface DashboardTierDistributionItem {
  tier: string;
  tierName?: string;
  name?: string;
  totalProviders: number;
}

export interface DashboardRatingDistributionItem {
  rating: number;
  totalProviders: number;
}

export interface DashboardPagination {
  page: number;
  limit: number;
  total: number;
}

export interface DashboardSummary {
  totals: DashboardTotals;
  revenueByMonth: DashboardRevenueByMonth[];
  amountProcessedByMonth: DashboardRevenueByMonth[];
  categoriesByRevenue: DashboardCategoryRevenueResponse;
  customerGrowthByMonth: DashboardRevenueByMonth[];
  topLocations: {
    data?: DashboardLocationItem[];
    items?: DashboardLocationItem[];
    pagination: DashboardPagination;
  };
  providersByCategory: {
    data?: DashboardCategoryProvidersItem[];
    items?: DashboardCategoryProvidersItem[];
    pagination: DashboardPagination;
  };
  tierDistribution: DashboardTierDistributionItem[];
  ratingDistribution: DashboardRatingDistributionItem[];
}

export enum AdminDashboardDateFilter {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  LAST_WEEK = 'LAST_WEEK',
  LAST_7_DAYS = 'LAST_7_DAYS',
  THIS_MONTH = 'THIS_MONTH',
  LAST_30_DAYS = 'LAST_30_DAYS',
  CUSTOM = 'CUSTOM',
}

export interface AdminDashboardPaginationDto {
  page?: number;
  limit?: number;
}

export interface AdminDashboardFilterDto {
  filter?: AdminDashboardDateFilter;
  startDate?: string;
  endDate?: string;
  categoriesPagination?: AdminDashboardPaginationDto;
  locationsPagination?: AdminDashboardPaginationDto;
  providersPagination?: AdminDashboardPaginationDto;
}

export interface DashboardResponse {
  status: boolean;
  data: DashboardSummary;
}
