'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { buildTicks } from './chart-utils';

const AMOUNT_PROCESSED_COLOR = '#017441';
const REVENUE_COLOR = '#95D21A';

export interface RevenueTrendChartPoint {
  name: string;
  revenue: number;
  amountProcessed?: number;
  tooltipLabel?: string;
}

export interface RevenueTrendChartProps {
  data: RevenueTrendChartPoint[];
  valueFormatter?: (value: number) => string;
  tooltipValueFormatter?: (value: number) => string;
}

type RevenueTooltipPayload = {
  dataKey?: string;
  value?: number | string;
  payload?: RevenueTrendChartPoint;
};

type RevenueTooltipProps = TooltipProps<number, string> & {
  payload?: RevenueTooltipPayload[];
};

const defaultFormatter = (value: number): string => value.toLocaleString();

const dotStyle = { r: 5, strokeWidth: 2, fill: '#FFFFFF' } as const;
const activeDotStyle = { r: 6, strokeWidth: 2 } as const;

export default function RevenueTrendChart({
  data,
  valueFormatter = defaultFormatter,
  tooltipValueFormatter,
}: RevenueTrendChartProps) {
  const hasAmountProcessed = data.some((item) => typeof item.amountProcessed === 'number');
  const values: number[] = [];

  data.forEach((item) => {
    if (typeof item.revenue === 'number') {
      values.push(item.revenue);
    }
    if (typeof item.amountProcessed === 'number') {
      values.push(item.amountProcessed);
    }
  });

  const ticks = buildTicks(values);
  const chartData = data;
  const tooltipFormatter = tooltipValueFormatter ?? valueFormatter;

  const renderTooltip = (tooltipProps: RevenueTooltipProps) => {
    const { active, payload } = tooltipProps;
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const context = (payload[0]?.payload ?? {}) as RevenueTrendChartPoint;
    const formattedLabel = context.tooltipLabel ?? context.name;

    const amountEntry = payload.find((entry) => entry.dataKey === 'amountProcessed');
    const revenueEntry = payload.find((entry) => entry.dataKey === 'revenue');

    const amountValue =
      typeof amountEntry?.value === 'number' ? amountEntry.value : Number(amountEntry?.value ?? 0);
    const revenueValue =
      typeof revenueEntry?.value === 'number'
        ? revenueEntry.value
        : Number(revenueEntry?.value ?? 0);

    return (
      <div className="rounded-xl border border-[#F1F2F4] bg-white px-4 py-3 shadow-lg">
        <p className="text-xs font-medium uppercase tracking-wide text-[#757C91]">
          {formattedLabel}
        </p>

        {hasAmountProcessed && Number.isFinite(amountValue) ? (
          <div className="mt-3 flex items-center justify-between gap-4 text-sm text-[#121921]">
            <div className="flex items-center gap-2 text-[#757C91]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: AMOUNT_PROCESSED_COLOR }}
              />
              Amt Proc.
            </div>
            <span className="font-semibold">{tooltipFormatter(amountValue)}</span>
          </div>
        ) : null}

        {Number.isFinite(revenueValue) ? (
          <div className="mt-2 flex items-center justify-between gap-4 text-sm text-[#121921]">
            <div className="flex items-center gap-2 text-[#757C91]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: REVENUE_COLOR }}
              />
              Revenue
            </div>
            <span className="font-semibold">{tooltipFormatter(revenueValue)}</span>
          </div>
        ) : null}
      </div>
    );
  };

  const legendItems = [
    hasAmountProcessed
      ? { label: 'Amount processed', color: AMOUNT_PROCESSED_COLOR }
      : null,
    { label: 'Revenue', color: REVENUE_COLOR },
  ].filter((item): item is { label: string; color: string } => item !== null);

  return (
    <div className="bg-[#F9F9FB] rounded-xl border border-[#F1F2F4]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F2F4] px-4 py-3">
        <h2 className="text-sm font-semibold text-[#353E5B]">
          Amount processed &amp; Revenue overtime
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#47516B]">
          {legendItems.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="px-2 pb-2 pt-6">
        <div className="rounded-xl bg-white px-4 pb-4 pt-8">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 16 }}>
              <CartesianGrid stroke="#E5E9F2" strokeDasharray="4 4" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="name"
                tickLine={false}
                tickMargin={12}
                interval={0}
                tick={{ fontSize: 12, fill: '#757C91', fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                width={72}
                tick={{ fontSize: 12, fill: '#757C91', fontWeight: 500 }}
                ticks={ticks}
                domain={[0, ticks[ticks.length - 1] || 'auto']}
                tickFormatter={valueFormatter}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(1, 116, 65, 0.18)', strokeWidth: 1 }}
                wrapperStyle={{ outline: 'none' }}
                content={renderTooltip}
              />
              {hasAmountProcessed ? (
                <Line
                  type="monotone"
                  dataKey="amountProcessed"
                  stroke={AMOUNT_PROCESSED_COLOR}
                  strokeWidth={2}
                  dot={{ ...dotStyle, stroke: AMOUNT_PROCESSED_COLOR }}
                  activeDot={{ ...activeDotStyle, stroke: AMOUNT_PROCESSED_COLOR }}
                  connectNulls
                />
              ) : null}
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={REVENUE_COLOR}
                strokeWidth={2}
                dot={{ ...dotStyle, stroke: REVENUE_COLOR }}
                activeDot={{ ...activeDotStyle, stroke: REVENUE_COLOR }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
