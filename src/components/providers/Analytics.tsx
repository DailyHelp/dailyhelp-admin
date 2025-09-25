'use client';
import { useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import Rectangle from '@/assets/rectangle-icon.svg';
import Green from '@/assets/rectangle-green.svg';
import Red from '@/assets/rectangle-red.svg';
import Cream from '@/assets/rectangle-cream.svg';
import Yellow from '@/assets/rectangle-yellow.svg';
import Gray from '@/assets/rectangle-gray.svg';
import type { ProviderAnalytics } from '@/types/types';
import Button from '@/components/ui/Button';

export default function Analytics({ analytics }: { analytics: ProviderAnalytics }) {
  const [activeFilter, setActiveFilter] = useState('today');

  // Sample chart data
  const chartData = [
    { name: 'Commission', value: analytics.revenue.commission, fill: '#DC2626' },
    { name: 'Tips', value: analytics.revenue.tips, fill: '#A3E635' },
    { name: 'Earnings', value: analytics.revenue.earnings, fill: '#027A48' },
  ];

  const filters = [
    'Today',
    'Current week',
    'Last week',
    'This month',
    'This Year',
    'All time',
    'Custom date',
  ];

  return (
    <div className="space-y-3 ">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 px-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="secondary"
            onClick={() => setActiveFilter(filter.toLowerCase())}
            className={`px-3 py-2 text-sm rounded-xl ${
              activeFilter === filter.toLowerCase()
                ? '!bg-[#F9FFEB] text-[#3B4152] font-bold !border-[#95D21A]'
                : '!bg-[#F9F9FB] text-[#3B4152] !border-0 hover:bg-gray-100'
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py- border-t border-[#F1F2F4]">
        {/* Chart + Breakdown */}
        <div className="bg-white pr-4 py-4 border-r border-[#F1F2F4]">
          <h3 className="text-[#757C91] uppercase text-xs font-bold ">Revenue</h3>
          <div className="my-6 ">
            <div style={{ width: '100%', height: 200 }} className="my-4">
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

            <div className="flex items-center justify-between space-y-2 text-sm mx-6">
              <div className="flex gap-3">
                <Rectangle className="my-1" />
                <div className="">
                  <p className="font-bold text-[#3B4152]">
                    ₦{analytics.revenue.earnings.toLocaleString()}{' '}
                  </p>
                  <p className="text-[#757C91]">Earnings</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Green className="my-1" />
                <div className="">
                  <p className="font-bold text-[#3B4152]">
                    ₦{analytics.revenue.tips.toLocaleString()}{' '}
                  </p>
                  <p className="text-[#757C91]">Tips</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Red className="my-1" />
                <div className="">
                  <p className="font-bold text-[#3B4152]">
                    ₦{analytics.revenue.commission.toLocaleString()}{' '}
                  </p>
                  <p className="text-[#757C91]">Commission</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl text-sm text-[#757C91]  space-y-4 bg-[#F9F9FB] p-4">
            <h1 className="text-[#3B4152] font-bold">Breakdown</h1>

            <div className="flex justify-between items-center gap-2">
              <span>Job payment</span>
              <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
              <span>+₦{analytics.revenue.breakdown.jobPayment.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center gap-2">
              <span>Tips</span>
              <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
              <span>+₦{analytics.revenue.breakdown.tips.toLocaleString()}</span>
            </div>

            <div className="flex gap-2 justify-between items-center font-bold mb-6">
              <span>Income</span>
              <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
              <span>₦{analytics.revenue.breakdown.income.toLocaleString()}</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <span>DailyHelp commission</span>
              <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
              <span>{analytics.revenue.breakdown.commissionRate}%</span>
            </div>
            <div className="flex justify-between font-bold items-center gap-2">
              <span>Deductions</span>
              <div className="border-t border-dotted border-[#D6DBE7] w-fit grow-1"></div>
              <span>-₦{analytics.revenue.commission.toLocaleString()}</span>
            </div>
            <div className="flex gap-2 justify-between font-bold text-[1rem] text-[#3B4152]  items-center">
              <span className="">Your earnings</span>
              <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
              <span>₦{analytics.revenue.earnings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Jobs & Offers */}
        <div className="space-y-6 py-4">
          {/* Jobs Summary */}
          <div className="">
            <h3 className="text-[#757C91] uppercase text-xs font-bold pb-2">jobs</h3>
            <div className="flex justify-between font-bold text-white bg-[#017441] rounded-2xl px-5 py-4 ">
              <h3 className="text-sm">Total Jobs</h3> <p>{analytics.jobs.total}</p>
            </div>

            <div className="pt-6 rounded-b-2xl text-sm text-[#757C91]  space-y-4 bg-[#F9F9FB] p-4">
              <div className="gap-2 flex justify-between items-center">
                <span>Completed Jobs</span>
                <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
                <span className="font-bold text-black">{analytics.jobs.completed}</span>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <span>Canceled Jobs</span>
                <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
                <span className="font-bold text-black">{analytics.jobs.canceled}</span>
              </div>
              <div className="gap-2 flex justify-between items-center">
                <span>Disputed Jobs</span>
                <div className="grow-1 border-t border-dotted border-[#D6DBE7] w-fit"></div>
                <span className="font-bold text-black">{analytics.jobs.disputed}</span>
              </div>
            </div>
          </div>

          {/* Offers */}
          <div>
            <h3 className="text-[#757C91] uppercase text-xs font-bold py-3">offers</h3>
            <div className="bg-[#F9F9FB] px-5 py-4 rounded-2xl">
              <div className=" items-center mb-6">
                <div className="flex gap-56">
                  <h3 className="text-sm text-[#757C91]">Offers</h3>
                  <p className="text-[#757C91] text-sm px-5">Acceptance rate </p>
                </div>
                <div className="flex gap-50 ">
                  <p className=" text-2xl ">
                    {analytics.offers.accepted}/{analytics.offers.total}
                  </p>
                  <span className="px-4 text-2xl border-l border-[#D6DBE7]">
                    {analytics.offersRate.acceptanceRate}%
                  </span>
                </div>
              </div>

              {/* Acceptance rate bar */}
              <div className="w-full h-2 bg-gray-200 mt-2 flex overflow-hidden">
                <div
                  className="bg-[#017441]"
                  style={{ width: `${analytics.offersRate.acceptanceRate}%` }}
                ></div>
                <div
                  className="bg-[#FFE1CC]"
                  style={{ width: `${analytics.offersRate.declineRate}%` }}
                ></div>
                <div
                  className="bg-[#F0443A]"
                  style={{ width: `${analytics.offersRate.cancelledRate}%` }}
                ></div>
                <div
                  className="bg-[#FFD100]"
                  style={{ width: `${analytics.offersRate.cancelledByClientRate}%` }}
                ></div>
                <div
                  className="bg-[#D6DBE7]"
                  style={{ width: `${analytics.offersRate.declinedByClientRate}%` }}
                ></div>
              </div>

              <div className="mt-5 space-y-4 pr-3 text-sm text-[#757C91]">
                <div className="flex gap-2">
                  <Rectangle className="my-1 " />
                  <div className="flex gap-2 justify-between items-center grow-1 ">
                    <span>You accepted</span>
                    <div className="border-t grow-1 border-dotted border-[#D6DBE7] w-fit"></div>
                    <span className="px-1 text-black font-bold">
                      {analytics.offers.accepted}
                    </span>{' '}
                    <span>{analytics.offersRate.acceptanceRate}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Cream className="my-1 " />
                  <div className="flex gap-2 justify-between items-center grow-1 ">
                    <span>You declined</span>
                    <div className="border-t grow-1 border-dotted border-[#D6DBE7] w-fit"></div>
                    <span className="px-1 text-black font-bold">
                      {analytics.offers.declined}
                    </span>{' '}
                    <span>{analytics.offersRate.declineRate}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Red className="my-1 " />
                  <div className="flex gap-2 justify-between items-center grow-1 ">
                    <span>You cancelled</span>
                    <div className="border-t grow-1 border-dotted border-[#D6DBE7] w-fit"></div>
                    <span className="px-1 text-black font-bold">
                      {analytics.offers.cancelled}
                    </span>{' '}
                    <span>{analytics.offersRate.cancelledRate}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Yellow className="my-1 " />
                  <div className="flex gap-2 justify-between items-center grow-1 ">
                    <span>Client declined</span>
                    <div className="border-t grow-1 border-dotted border-[#D6DBE7] w-fit"></div>
                    <span className="px-1 text-black font-bold">
                      {analytics.offers.declinedByClient}
                    </span>{' '}
                    <span>{analytics.offersRate.declinedByClientRate}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Gray className="my-1 " />
                  <div className="flex gap-2 justify-between items-center grow-1 ">
                    <span>Client cancelled</span>
                    <div className="border-t grow-1 border-dotted border-[#D6DBE7] w-fit"></div>
                    <span className="px-1 text-black font-bold">
                      {analytics.offers.cancelledByClient}
                    </span>{' '}
                    <span>{analytics.offersRate.cancelledByClientRate}%</span>
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
