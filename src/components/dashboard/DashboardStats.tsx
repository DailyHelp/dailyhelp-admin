'use client';

import statisticsData from '@/data/dummyData';

interface StatItem {
  id: number;
  title: string;
  value: number | string;
  isCurrency?: boolean;
}

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statisticsData.map((stat: StatItem, index: number) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500 font-medium mb-1">{stat.title}</h4>
          <p className="text-xl font-bold text-black">
            {stat.isCurrency
              ? `₦${Number(stat.value).toLocaleString()}`
              : Number(stat.value).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
