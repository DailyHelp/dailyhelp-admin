'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import Rectangle from '@/assets/rectangle-icon.svg';
import Green from '@/assets/rectangle-green.svg';
import Red from '@/assets/rectangle-red.svg';
import Cream from '@/assets/rectangle-cream.svg';
import Yellow from '@/assets/rectangle-yellow.svg';
import Gray from '@/assets/rectangle-gray.svg';
import type { ProviderAnalytics } from '@/types/types';
import type { AdminProviderAnalyticsFilter } from '@/features/providers/types';
import Button from '@/components/ui/Button';

const FILTERS: { label: string; value: AdminProviderAnalyticsFilter }[] = [
  { label: 'Today', value: 'TODAY' },
  { label: 'Current week', value: 'CURRENT_WEEK' },
  { label: 'Last week', value: 'LAST_WEEK' },
  { label: 'This month', value: 'THIS_MONTH' },
  { label: 'This year', value: 'THIS_YEAR' },
  { label: 'All time', value: 'ALL_TIME' },
];

export interface ProviderAnalyticsProps {
  analytics?: ProviderAnalytics | null;
  activeFilter: AdminProviderAnalyticsFilter;
  onFilterChange: (filter: AdminProviderAnalyticsFilter) => void;
  isLoading?: boolean;
}

export default function Analytics({
  analytics,
  activeFilter,
  onFilterChange,
  isLoading = false,
}: ProviderAnalyticsProps) {
  const revenue = analytics?.revenue ?? {
    earnings: 0,
    tips: 0,
    commission: 0,
    breakdown: {
      jobPayment: 0,
      tips: 0,
      income: 0,
      commissionRate: '0',
      deductions: 0,
      finalEarnings: 0,
    },
  };

  const jobs = analytics?.jobs ?? { total: 0, completed: 0, canceled: 0, disputed: 0 };
  const offers = analytics?.offers ?? {
    total: 0,
    accepted: 0,
    declined: 0,
    cancelled: 0,
    declinedByClient: 0,
    cancelledByClient: 0,
  };
  const offersRate = analytics?.offersRate ?? {
    acceptanceRate: 0,
    declineRate: 0,
    cancelledRate: 0,
    cancelledByClientRate: 0,
    declinedByClientRate: 0,
  };

  const chartData = [
    { name: 'Commission', value: revenue.commission, fill: '#DC2626' },
    { name: 'Tips', value: revenue.tips, fill: '#A3E635' },
    { name: 'Earnings', value: revenue.earnings, fill: '#027A48' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 px-4">
        {FILTERS.map((filter) => (
          <Button
            key={filter.value}
            variant="secondary"
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-xl px-3 py-2 text-sm ${
              activeFilter === filter.value
                ? '!bg-[#F9FFEB] font-bold text-[#3B4152] !border-[#95D21A]'
                : '!bg-[#F9F9FB] text-[#3B4152] !border-0 hover:bg-gray-100'
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="relative grid gap-4 border-t border-[#F1F2F4] px-4 py-4 md:grid-cols-2">
        {isLoading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#017441]" />
            <span className="text-sm font-medium text-[#757C91]">Loading analytics…</span>
          </div>
        ) : null}

        <div className="border-r border-[#F1F2F4] bg-white py-4 pr-4">
          <h3 className="text-xs font-bold uppercase text-[#757C91]">Revenue</h3>
          <div className="my-6">
            <div className="my-4 h-52 w-full">
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="50%"
                  outerRadius="100%"
                  data={chartData}
                  startAngle={180}
                  endAngle={-180}
                >
                  <RadialBar
                    {...({
                      minAngle: 15,
                      background: true,
                      clockWise: true,
                      dataKey: 'value',
                    } as any)}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

          <div className="mx-6 flex items-center justify-between text-sm">
              <div className="flex gap-3">
                <Rectangle className="my-1" />
                <div>
                  <p className="font-bold text-[#3B4152]">₦{revenue.earnings.toLocaleString()}</p>
                  <p className="text-[#757C91]">Earnings</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Green className="my-1" />
                <div>
                  <p className="font-bold text-[#3B4152]">₦{revenue.tips.toLocaleString()}</p>
                  <p className="text-[#757C91]">Tips</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Red className="my-1" />
                <div>
                  <p className="font-bold text-[#3B4152]">
                    ₦{revenue.commission.toLocaleString()}
                  </p>
                  <p className="text-[#757C91]">Commission</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#F9F9FB] p-4 text-sm text-[#757C91]">
            <h1 className="mb-4 font-bold text-[#3B4152]">Breakdown</h1>

            <div className="flex items-center gap-2">
              <span>Job payment</span>
              <div className="grow border-t border-dotted border-[#D6DBE7]" />
              <span>+₦{revenue.breakdown.jobPayment.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span>Tips</span>
              <div className="grow border-t border-dotted border-[#D6DBE7]" />
              <span>+₦{revenue.breakdown.tips.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 font-bold text-[#3B4152]">
              <span>Income</span>
              <div className="grow border-t border-dotted border-[#D6DBE7]" />
              <span>₦{revenue.breakdown.income.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span>Commission rate</span>
              <div className="grow border-t border-dotted border-[#D6DBE7]" />
              <span>{revenue.breakdown.commissionRate}%</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span>Deductions</span>
              <div className="grow border-t border-dotted border-[#D6DBE7]" />
              <span>-₦{revenue.breakdown.deductions.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 font-bold text-lg text-[#3B4152]">
              <span>Your earnings</span>
              <div className="grow border-t border-dotted border-[#D6DBE7]" />
              <span>₦{revenue.breakdown.finalEarnings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-xs font-bold uppercase text-[#757C91]">Jobs</h3>
            <div className="mt-2 rounded-2xl bg-[#017441] px-5 py-4 text-white">
              <div className="flex items-center justify-between text-sm">
                <span>Total jobs</span>
                <span className="text-lg font-bold">{jobs.total}</span>
              </div>
            </div>
            <div className="mt-4 space-y-4 rounded-b-2xl bg-[#F9F9FB] p-4 text-sm text-[#757C91]">
              <div className="flex items-center gap-2">
                <span>Completed jobs</span>
                <div className="grow border-t border-dotted border-[#D6DBE7]" />
                <span className="font-bold text-black">{jobs.completed}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Canceled jobs</span>
                <div className="grow border-t border-dotted border-[#D6DBE7]" />
                <span className="font-bold text-black">{jobs.canceled}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Disputed jobs</span>
                <div className="grow border-t border-dotted border-[#D6DBE7]" />
                <span className="font-bold text-black">{jobs.disputed}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-[#757C91]">Offers</h3>
            <div className="rounded-2xl bg-[#F9F9FB] px-5 py-4">
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-[#757C91]">Offers</h3>
                  <p className="px-5 text-sm text-[#757C91]">Acceptance rate</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold">
                    {offers.accepted}/{offers.total}
                  </p>
                  <span className="border-l border-[#D6DBE7] px-4 text-2xl">
                    {offersRate.acceptanceRate}%
                  </span>
                </div>
              </div>

              <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="bg-[#017441]" style={{ width: `${offersRate.acceptanceRate}%` }} />
                <div className="bg-[#FFE1CC]" style={{ width: `${offersRate.declineRate}%` }} />
                <div className="bg-[#F0443A]" style={{ width: `${offersRate.cancelledRate}%` }} />
                <div
                  className="bg-[#FFD100]"
                  style={{ width: `${offersRate.cancelledByClientRate}%` }}
                />
                <div
                  className="bg-[#D6DBE7]"
                  style={{ width: `${offersRate.declinedByClientRate}%` }}
                />
              </div>

              <div className="mt-5 space-y-4 pr-3 text-sm text-[#757C91]">
                <div className="flex gap-2">
                  <Rectangle className="my-1" />
                  <div className="flex grow items-center gap-2">
                    <span>You accepted</span>
                    <div className="grow border-t border-dotted border-[#D6DBE7]" />
                    <span className="px-1 font-bold text-black">{offers.accepted}</span>
                    <span>{offersRate.acceptanceRate}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Cream className="my-1" />
                  <div className="flex grow items-center gap-2">
                    <span>You declined</span>
                    <div className="grow border-t border-dotted border-[#D6DBE7]" />
                    <span className="px-1 font-bold text-black">{offers.declined}</span>
                    <span>{offersRate.declineRate}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Red className="my-1" />
                  <div className="flex grow items-center gap-2">
                    <span>You cancelled</span>
                    <div className="grow border-t border-dotted border-[#D6DBE7]" />
                    <span className="px-1 font-bold text-black">{offers.cancelled}</span>
                    <span>{offersRate.cancelledRate}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Yellow className="my-1" />
                  <div className="flex grow items-center gap-2">
                    <span>Client declined</span>
                    <div className="grow border-t border-dotted border-[#D6DBE7]" />
                    <span className="px-1 font-bold text-black">{offers.declinedByClient}</span>
                    <span>{offersRate.declinedByClientRate}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Gray className="my-1" />
                  <div className="flex grow items-center gap-2">
                    <span>Client cancelled</span>
                    <div className="grow border-t border-dotted border-[#D6DBE7]" />
                    <span className="px-1 font-bold text-black">{offers.cancelledByClient}</span>
                    <span>{offersRate.cancelledByClientRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
