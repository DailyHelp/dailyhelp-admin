'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CalendarDropdown from '@/components/dashboard/CalendarDropdown';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OverviewSection from '@/components/dashboard/OverviewSect';
import ReportSection from '@/components/dashboard/ReportSect';
import { useDashboardSummary } from '@/features/dashboard/hooks';
import type { AdminDashboardFilterDto, AdminDashboardDateFilter } from '@/features/dashboard/types';

const DEFAULT_PAGE_SIZE = 5;

const createDefaultFilters = (): AdminDashboardFilterDto => ({
  categoriesPagination: { page: 1, limit: DEFAULT_PAGE_SIZE },
  locationsPagination: { page: 1, limit: DEFAULT_PAGE_SIZE },
  providersPagination: { page: 1, limit: DEFAULT_PAGE_SIZE },
});

export default function DashboardPage() {
  const [filters, setFilters] = useState<AdminDashboardFilterDto>(createDefaultFilters);
  type LoaderTarget = 'categories' | 'locations' | 'providers' | 'filters' | null;
  const [activeLoader, setActiveLoader] = useState<LoaderTarget>(null);

  const { data, isLoading, isFetching, isError, error } = useDashboardSummary(filters);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const resetPagination = (prev: AdminDashboardFilterDto) => ({
    categoriesPagination: {
      page: 1,
      limit: prev.categoriesPagination?.limit ?? DEFAULT_PAGE_SIZE,
    },
    locationsPagination: {
      page: 1,
      limit: prev.locationsPagination?.limit ?? DEFAULT_PAGE_SIZE,
    },
    providersPagination: {
      page: 1,
      limit: prev.providersPagination?.limit ?? DEFAULT_PAGE_SIZE,
    },
  });

  const handleFilterChange = (payload: {
    filter?: AdminDashboardDateFilter;
    startDate?: string;
    endDate?: string;
  }) => {
    setActiveLoader('filters');
    setFilters((prev) => ({
      ...prev,
      ...resetPagination(prev),
      filter: payload.filter,
      startDate: payload.startDate,
      endDate: payload.endDate,
    }));
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setActiveLoader('filters');
    setFilters((prev) => ({
      ...prev,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }));
  };

  const handleCategoryPageChange = (page: number) => {
    setActiveLoader('categories');
    setFilters((prev) => ({
      ...prev,
      categoriesPagination: {
        page,
        limit: prev.categoriesPagination?.limit ?? DEFAULT_PAGE_SIZE,
      },
    }));
  };

  const handleLocationPageChange = (page: number) => {
    setActiveLoader('locations');
    setFilters((prev) => ({
      ...prev,
      locationsPagination: {
        page,
        limit: prev.locationsPagination?.limit ?? DEFAULT_PAGE_SIZE,
      },
    }));
  };

  const handleProvidersPageChange = (page: number) => {
    setActiveLoader('providers');
    setFilters((prev) => ({
      ...prev,
      providersPagination: {
        page,
        limit: prev.providersPagination?.limit ?? DEFAULT_PAGE_SIZE,
      },
    }));
  };

  useEffect(() => {
    if (!isFetching) {
      setActiveLoader(null);
    }
  }, [isFetching]);

  if (isError) {
    return (
      <main className="p-6 space-y-6 bg-[#F9F9FB] min-h-screen">
        <p className="text-sm text-red-500">Unable to load dashboard data.</p>
      </main>
    );
  }

  if (!data && !isLoading && !isFetching) {
    return (
      <main className="p-6 space-y-6 bg-[#F9F9FB] min-h-screen">
        <p className="text-sm text-gray-500">No dashboard data available.</p>
      </main>
    );
  }

  const totals = data?.totals;
  const revenueByMonth = data?.revenueByMonth ?? [];
  const amountProcessedByMonth = data?.amountProcessedByMonth ?? [];
  const customerGrowthByMonth = data?.customerGrowthByMonth ?? [];
  const categoriesByRevenue = data?.categoriesByRevenue.data ?? [];
  const categoriesPagination = data?.categoriesByRevenue.pagination;
  const topLocations = data?.topLocations.data ?? [];
  const topLocationsPagination = data?.topLocations.pagination;
  const providersByCategory = data?.providersByCategory.data ?? [];
  const providersPagination = data?.providersByCategory.pagination;
  const isInitialLoading = !data && isLoading;
  const showPageSkeleton = isInitialLoading || (isFetching && activeLoader === 'filters');
  const categoriesLoading = isFetching && activeLoader === 'categories';
  const locationsLoading = isFetching && activeLoader === 'locations';
  const providersLoading = isFetching && activeLoader === 'providers';

  return (
    <main className="p-6 space-y-6 bg-[#F9F9FB] min-h-screen">
      <div>
        <CalendarDropdown onDateChange={handleDateRangeChange} onFilterChange={handleFilterChange} />
      </div>

      {showPageSkeleton ? (
        <div className="space-y-6">
          <div className="h-32 rounded-xl bg-white animate-pulse" />
          <div className="h-[480px] rounded-xl bg-white animate-pulse" />
          <div className="h-[320px] rounded-xl bg-white animate-pulse" />
        </div>
      ) : (
        <>
          <DashboardStats
            revenue={totals?.revenue}
            payout={totals?.payout}
            customers={totals?.customers}
            providers={totals?.providers}
            amountProcessed={totals?.totalAmountProcessed}
            jobs={totals?.jobs}
          />

          <OverviewSection
            revenueByMonth={revenueByMonth}
            amountProcessedByMonth={amountProcessedByMonth}
            customerGrowthByMonth={customerGrowthByMonth}
            categoriesByRevenue={categoriesByRevenue}
            categoriesPagination={categoriesPagination}
            onCategoriesPageChange={handleCategoryPageChange}
            topLocations={topLocations}
            locationsPagination={topLocationsPagination}
            onLocationsPageChange={handleLocationPageChange}
            isCategoriesLoading={categoriesLoading}
            isLocationsLoading={locationsLoading}
          />

          <ReportSection
            providersByCategory={providersByCategory}
            providersPagination={providersPagination}
            onProvidersPageChange={handleProvidersPageChange}
            tierDistribution={data?.tierDistribution}
            ratingDistribution={data?.ratingDistribution}
            isProvidersLoading={providersLoading}
          />
        </>
      )}
    </main>
  );
}
