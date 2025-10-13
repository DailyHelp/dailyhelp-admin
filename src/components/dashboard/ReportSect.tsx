'use client';
import type { ComponentType } from 'react';
import TopCategories from '@/components/ui/Pagination';
import BadegRatings from './BadgeRatings';
import StarIcon from '@/assets/star-icon.svg';
import BronzeIcon from '@/assets/bronze-icon.svg';
import SilverIcon from '@/assets/silver-icon.svg';
import GoldIcon from '@/assets/gold-icon.svg';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import type {
  DashboardCategoryProvidersItem,
  DashboardPagination,
  DashboardRatingDistributionItem,
  DashboardTierDistributionItem,
} from '@/features/dashboard/types';
import type { TopCategoriesItem } from '@/components/ui/Pagination';

export interface ReportSectionProps {
  providersByCategory?: DashboardCategoryProvidersItem[];
  providersPagination?: DashboardPagination;
  onProvidersPageChange?: (page: number) => void;
  tierDistribution?: DashboardTierDistributionItem[];
  ratingDistribution?: DashboardRatingDistributionItem[];
  isProvidersLoading?: boolean;
}

const toCategoryItems = (data: DashboardCategoryProvidersItem[] = []): TopCategoriesItem[] =>
  data.map((item, index) => ({
    id: item.uuid ?? index,
    label: item.name,
    value: item.totalProviders,
  }));

const badgeIconMap: Record<string, ComponentType<{ className?: string }>> = {
  bronze: BronzeIcon,
  silver: SilverIcon,
  gold: GoldIcon,
  platinum: PlatinumIcon,
};

const toBadgeItems = (data: DashboardTierDistributionItem[] = []) =>
  data.map((item) => {
    const displayName = item.tierName ?? item.name ?? item.tier;
    const iconKey = item.tier?.toLowerCase();

    return {
      name: displayName ?? item.tier,
      amount: item.totalProviders,
      icon: iconKey ? badgeIconMap[iconKey] : undefined,
    };
  });

const toRatingItems = (data: DashboardRatingDistributionItem[] = []) =>
  data.map((item) => ({
    name: `${item.rating} stars`,
    amount: item.totalProviders,
  }));

export default function ReportSect({
  providersByCategory,
  providersPagination,
  onProvidersPageChange,
  tierDistribution,
  ratingDistribution,
  isProvidersLoading = false,
}: ReportSectionProps) {
  return (
    <div>
      <section className="grid grid-cols-3 gap-4">
        <TopCategories
          data={toCategoryItems(providersByCategory)}
          title="Category vs Providers"
          page={providersPagination?.page}
          totalCount={providersPagination?.total}
          itemsPerPage={providersPagination?.limit}
          onPageChange={onProvidersPageChange}
          valueSuffix="providers"
          isLoading={isProvidersLoading}
        />

        <BadegRatings
          data={toBadgeItems(tierDistribution)}
          title="Badge Breakdown"
          suffix=""
          valueSuffix="providers"
        />

        <BadegRatings
          data={toRatingItems(ratingDistribution)}
          title="Ratings Breakdown"
          suffix=""
          Icon={StarIcon}
          valueSuffix="providers"
        />
      </section>
    </div>
  );
}
