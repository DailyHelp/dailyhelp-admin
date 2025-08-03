'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
//   Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MonthlyCharts({ data, fillColor = '#94D82D', valuePrefix = '₦' }) {
    // Generate dynamic 2-interval ticks
    const maxValue = Math.max(...data.map(item => item.value));
    const ticks = [];
    for (let i = 0; i <= maxValue + 2; i += 2) {
    ticks.push(i);
    }

  return (
    <div className="bg-white px-4 pt-12 pb-2 rounded-xl">
      <ResponsiveContainer width="100%" height={370}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(val) => `${valuePrefix}${val}M`}
            ticks={ticks}
          />
          {/* <Tooltip
            formatter={(val) => `${valuePrefix}${val}M`}
          /> */}
          <Bar
            dataKey="value"
            fill={fillColor}
            radius={[6, 6, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
