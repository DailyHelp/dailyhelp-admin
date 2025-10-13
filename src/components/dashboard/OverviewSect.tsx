'use client';
import MonthlyCharts, { MonthlyChartsItem } from './MonthlyCharts';
import RevenueTrendChart, { RevenueTrendChartPoint } from './RevenueTrendChart';
import TopCategories, { TopCategoriesItem } from '@/components/ui/Pagination';
import type {
  DashboardCategoryRevenue,
  DashboardLocationItem,
  DashboardPagination,
  DashboardRevenueByMonth,
} from '@/features/dashboard/types';

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1,
});

const fullCurrencyFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function formatRevenueTick(value: number): string {
  if (!Number.isFinite(value)) {
    return '₦0';
  }

  const formatted = compactCurrencyFormatter.format(value).replace(/\.0(?=[A-Za-z])/g, '');
  return `₦${formatted}`;
}

function formatRevenueTooltip(value: number): string {
  if (!Number.isFinite(value)) {
    return '₦0';
  }
  return fullCurrencyFormatter.format(value);
}

export interface OverviewSectionProps {
  revenueByMonth?: DashboardRevenueByMonth[];
  amountProcessedByMonth?: DashboardRevenueByMonth[];
  customerGrowthByMonth?: DashboardRevenueByMonth[];
  categoriesByRevenue?: DashboardCategoryRevenue[];
  categoriesPagination?: DashboardPagination;
  onCategoriesPageChange?: (page: number) => void;
  topLocations?: DashboardLocationItem[];
  locationsPagination?: DashboardPagination;
  onLocationsPageChange?: (page: number) => void;
  isCategoriesLoading?: boolean;
  isLocationsLoading?: boolean;
}

function toDate(entry: DashboardRevenueByMonth): Date | undefined {
  const candidates = [entry.monthKey, entry.month].filter(
    (item): item is string => Boolean(item && item.trim()),
  );

  for (const candidate of candidates) {
    // Accept formats like YYYY-MM by adding a default day component.
    const normalised = /^\d{4}-\d{2}$/.test(candidate) ? `${candidate}-01` : candidate;
    const parsed = new Date(normalised);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }

    // Fall back to parsing strings such as "Nov 2024".
    const fallback = new Date(`${candidate} 1`);
    if (!Number.isNaN(fallback.getTime())) {
      return fallback;
    }
  }

  return undefined;
}

function toLabel(entry: DashboardRevenueByMonth): string {
  const parsedDate = toDate(entry);

  if (parsedDate) {
    return parsedDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  }

  const month = entry.month ?? '';
  if (month.length >= 3) {
    return month.slice(0, 3).toUpperCase();
  }

  return month.toUpperCase();
}

function pickFirstNumber(values: Array<number | null | undefined>): number | undefined {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }
  return undefined;
}

function mapToRevenueTrend(
  revenueData: DashboardRevenueByMonth[] = [],
  amountProcessedData: DashboardRevenueByMonth[] = [],
): RevenueTrendChartPoint[] {
  const combined = new Map<
    string,
    { name: string; tooltipLabel: string; date: number; revenue?: number; amountProcessed?: number }
  >();

  const applyEntry = (
    entry: DashboardRevenueByMonth,
    kind: 'revenue' | 'amountProcessed',
    index: number,
  ) => {
    const key = entry.monthKey?.trim() || entry.month?.trim() || `index-${kind}-${index}`;
    const label = toLabel(entry);
    const tooltipLabel = entry.month ?? entry.monthKey ?? label;
    const dateValue = toDate(entry)?.getTime();
    const sortValue = Number.isFinite(dateValue) ? (dateValue as number) : index;
    const existing =
      combined.get(key) ??
      ({
        name: label,
        tooltipLabel,
        date: sortValue,
      } as {
        name: string;
        tooltipLabel: string;
        date: number;
        revenue?: number;
        amountProcessed?: number;
      });

    if (!combined.has(key)) {
      combined.set(key, existing);
    } else {
      existing.name = existing.name || label;
      if (!existing.tooltipLabel) {
        existing.tooltipLabel = tooltipLabel;
      }
      if (Number.isFinite(sortValue)) {
        existing.date = Math.min(existing.date, sortValue);
      }
    }

    if (!Number.isFinite(existing.date)) {
      existing.date = sortValue;
    }

    if (kind === 'revenue') {
      const value = pickFirstNumber([entry.revenue, entry.totalRevenue, entry.total]);
      if (typeof value === 'number') {
        existing.revenue = value;
      }
    } else {
      const value = pickFirstNumber([
        entry.totalAmountProcessed,
        entry.amountProcessed,
        entry.total,
      ]);
      if (typeof value === 'number') {
        existing.amountProcessed = value;
      }
    }
  };

  revenueData.forEach((entry, index) => applyEntry(entry, 'revenue', index));
  amountProcessedData.forEach((entry, index) => applyEntry(entry, 'amountProcessed', index));

  return Array.from(combined.values())
    .sort((a, b) => a.date - b.date)
    .map(({ name, tooltipLabel, revenue, amountProcessed }) => {
      const point: RevenueTrendChartPoint = {
        name,
        tooltipLabel,
        revenue: typeof revenue === 'number' ? revenue : 0,
      };

      if (typeof amountProcessed === 'number') {
        point.amountProcessed = amountProcessed;
      }

      return point;
    });
}

function mapToChart(data: DashboardRevenueByMonth[] = []): MonthlyChartsItem[] {
  return [...data]
    .sort((a, b) => {
      const dateA = toDate(a)?.getTime() ?? 0;
      const dateB = toDate(b)?.getTime() ?? 0;
      return dateA - dateB;
    })
    .map((entry) => ({
      name: toLabel(entry),
      value: entry.total,
    }));
}

function mapToTopList(data: DashboardCategoryRevenue[] = []): TopCategoriesItem[] {
  return data.map((item, index) => ({
    id: item.uuid ?? index,
    label: item.name,
    value: item.revenue,
    isCurrency: true,
  }));
}

function mapLocations(data: DashboardLocationItem[] = []): TopCategoriesItem[] {
  return data.map((item, index) => ({
    id: index,
    label: item.name,
    value: item.total,
  }));
}

export default function OverviewSect({
  revenueByMonth,
  amountProcessedByMonth,
  customerGrowthByMonth,
  categoriesByRevenue,
  categoriesPagination,
  onCategoriesPageChange,
  topLocations,
  locationsPagination,
  onLocationsPageChange,
  isCategoriesLoading = false,
  isLocationsLoading = false,
}: OverviewSectionProps) {
  return (
    <div>
      <section className="grid grid-cols-2 gap-4">
        <RevenueTrendChart
          data={mapToRevenueTrend(revenueByMonth, amountProcessedByMonth)}
          valueFormatter={formatRevenueTick}
          tooltipValueFormatter={formatRevenueTooltip}
        />

        <TopCategories
          data={mapToTopList(categoriesByRevenue)}
          title="Top Service Category"
          page={categoriesPagination?.page}
          totalCount={categoriesPagination?.total}
          itemsPerPage={categoriesPagination?.limit}
          onPageChange={onCategoriesPageChange}
          valuePrefix="₦"
          isLoading={isCategoriesLoading}
        />

        <div className="bg-[#F9F9FB] rounded-xl border border-[#F1F2F4]">
          <h2 className="text-[14px] text-[#757C91] font-semibold border-b border-[#F1F2F4] px-4 py-2">
            User Growth
          </h2>
          <MonthlyCharts
            data={mapToChart(customerGrowthByMonth)}
            fillColor="#017441"
            valueFormatter={(val) => val.toLocaleString()}
          />
        </div>

        <TopCategories
          data={mapLocations(topLocations)}
          title="Top Location with Users"
          page={locationsPagination?.page}
          totalCount={locationsPagination?.total}
          itemsPerPage={locationsPagination?.limit}
          onPageChange={onLocationsPageChange}
          valueSuffix="users"
          isLoading={isLocationsLoading}
        />
      </section>
    </div>
  );
}
