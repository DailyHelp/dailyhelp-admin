'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { buildTicks } from './chart-utils';

export interface MonthlyChartsItem {
  name: string;
  value: number;
}
export interface MonthlyChartsProps {
  data: MonthlyChartsItem[];
  fillColor?: string;
  valueFormatter?: (value: number) => string;
}

export default function MonthlyCharts({
  data,
  fillColor = '#94D82D',
  valueFormatter,
}: MonthlyChartsProps) {
  const values = data.map((item) => item.value);
  const ticks = buildTicks(values);

  const formatter = valueFormatter ?? ((val: number) => val.toLocaleString());

  return (
    <div className="bg-white px-4 pt-12 pb-2 rounded-xl">
      <ResponsiveContainer width="100%" height={370}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barSize={32}>
          <CartesianGrid stroke="#E5E9F2" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            interval={0}
            tick={{ fontSize: 12, fill: '#757C91', fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={60}
            tickMargin={12}
            tick={{ fontSize: 12, fill: '#757C91', fontWeight: 500 }}
            tickFormatter={formatter}
            ticks={ticks}
            domain={[0, ticks[ticks.length - 1] || 'auto']}
          />
          <Tooltip
            cursor={{ fill: 'rgba(1, 116, 65, 0.08)' }}
            wrapperStyle={{ outline: 'none' }}
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) {
                return null;
              }

              const [first] = payload;
              const numericValue =
                typeof first.value === 'number' ? first.value : Number(first.value ?? 0);

              return (
                <div className="rounded-xl border border-[#F1F2F4] bg-white px-4 py-3 shadow-lg">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#757C91]">
                    {first.payload?.name}
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#121921]">
                    {formatter(numericValue)}
                  </p>
                </div>
              );
            }}
          />
          <Bar dataKey="value" fill={fillColor} radius={[8, 8, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
