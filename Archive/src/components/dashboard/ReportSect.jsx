'use client';
import TopCategories from '@/components/ui/Pagination';
import BadegRatings from './BadgeRatings';
import { CategoryProviders, ratingsData, badgeData } from '@/data/dummyData';
import StarIcon from '@/assets/star-icon.svg';

export default function ReportSect() {
  return (
    <div>
      <section className="grid grid-cols-3 gap-4">
        <TopCategories data={CategoryProviders} title={'Category vs Providers'} />

        <BadegRatings data={badgeData} title={'Badge Breakdown'} suffix={'rated'} />

        <BadegRatings
          data={ratingsData}
          title={'Ratings Breakdown'}
          suffix={'stars'}
          Icon={StarIcon}
        />
      </section>
    </div>
  );
}
