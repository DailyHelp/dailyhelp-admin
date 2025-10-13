import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type {
  AdminDashboardFilterDto,
  DashboardCategoryProvidersItem,
  DashboardCategoryRevenue,
  DashboardLocationItem,
  DashboardResponse,
  DashboardSummary,
} from './types';

function appendNestedParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null) {
    return;
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => {
      if (childValue !== undefined && childValue !== null) {
        params.append(`${key}[${childKey}]`, String(childValue));
      }
    });
    return;
  }

  params.append(key, String(value));
}

export async function fetchDashboardSummary(
  filters?: AdminDashboardFilterDto,
): Promise<DashboardSummary> {
  const params = new URLSearchParams();

  if (filters) {
    appendNestedParam(params, 'filter', filters.filter);
    appendNestedParam(params, 'startDate', filters.startDate);
    appendNestedParam(params, 'endDate', filters.endDate);
    appendNestedParam(params, 'categoriesPagination', filters.categoriesPagination);
    appendNestedParam(params, 'locationsPagination', filters.locationsPagination);
    appendNestedParam(params, 'providersPagination', filters.providersPagination);
  }

  const path = params.toString() ? `/dashboard?${params.toString()}` : '/dashboard';
  const token = useAuthStore.getState().accessToken;
  const response = await apiRequest<DashboardResponse>(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status || !response.data) {
    throw new Error('Unable to fetch dashboard summary.');
  }

  const summary = response.data;

  const mapCollection = <T>(collection?: { data?: T[]; items?: T[] }): T[] => {
    if (!collection) {
      return [];
    }
    if (Array.isArray(collection.data) && collection.data.length > 0) {
      return collection.data;
    }
    if (Array.isArray(collection.items) && collection.items.length > 0) {
      return collection.items;
    }
    return [];
  };

  return {
    ...summary,
    categoriesByRevenue: {
      data: mapCollection<DashboardCategoryRevenue>(summary.categoriesByRevenue),
      pagination: summary.categoriesByRevenue.pagination,
    },
    topLocations: {
      data: mapCollection<DashboardLocationItem>(summary.topLocations),
      pagination: summary.topLocations.pagination,
    },
    providersByCategory: {
      data: mapCollection<DashboardCategoryProvidersItem>(summary.providersByCategory),
      pagination: summary.providersByCategory.pagination,
    },
  };
}
