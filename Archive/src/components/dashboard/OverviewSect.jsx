'use client';
import { revenueData, userGrowthData, topServicesData, topLocationData } from '@/data/dummyData';
import MonthlyCharts from './MonthlyCharts';
import TopCategories from '@/components/ui/Pagination';

export default function OverviewSect() {
  return (
    <div>
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-[#F9F9FB] rounded-xl border border-[#F1F2F4]">
          <h2 className="text-[14px] text-[#757C91] font-semibold border-b border-[#F1F2F4] px-4 py-2">
            Revenue
          </h2>
          <MonthlyCharts data={revenueData} fillColor="#95D21A" />
        </div>

        <TopCategories data={topServicesData} title={'Top Service Category'} />

        <div className="bg-[#F9F9FB] rounded-xl border border-[#F1F2F4]">
          <h2 className="text-[14px] text-[#757C91] font-semibold border-b border-[#F1F2F4] px-4 py-2">
            User Growth
          </h2>
          <MonthlyCharts data={userGrowthData} fillColor="#017441" />
        </div>

        <TopCategories data={topLocationData} title={'Top Location with Users'} />
      </section>
    </div>
  );
}
