'use client';

export interface DashboardStatsProps {
  revenue?: number;
  payout?: number;
  customers?: number;
  providers?: number;
  amountProcessed?: number;
  jobs?: {
    inProgress?: number;
    completed?: number;
    canceled?: number;
    disputed?: number;
  };
}

const formatCurrency = (value?: number) => {
  const amount = Number(value ?? 0);
  return `₦ ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

const formatNumber = (value?: number) =>
  Number(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function DashboardStats({
  revenue = 0,
  payout = 0,
  customers = 0,
  providers = 0,
  amountProcessed = 0,
  jobs,
}: DashboardStatsProps) {
  const stats = [
    {
      title: 'Amount Processed',
      value: formatCurrency(amountProcessed ?? revenue),
      subtitle: `Revenue: ${formatCurrency(revenue)}`,
    },
    { title: 'Total Payout', value: formatCurrency(payout) },
    { title: 'Customers', value: formatNumber(customers) },
    { title: 'Providers', value: formatNumber(providers) },
    { title: 'Jobs In Progress', value: formatNumber(jobs?.inProgress) },
    { title: 'Jobs Completed', value: formatNumber(jobs?.completed) },
    { title: 'Jobs Canceled', value: formatNumber(jobs?.canceled) },
    { title: 'Jobs Disputed', value: formatNumber(jobs?.disputed) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ title, value, subtitle }, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500 font-medium mb-1">{title}</h4>
          <p className="text-2xl font-bold text-black">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-[#757C91] font-semibold">{subtitle}</p>}
        </div>
      ))}
    </div>
  );
}
