'use client';
import React from 'react';

type IconType = React.ComponentType<{ className?: string }>;

export interface BadgeRatingsItem {
  name: string;
  amount: number | string;
  icon?: IconType;
}

export interface BadgeRatingsProps {
  data?: BadgeRatingsItem[];
  title?: string;
  suffix?: string;
  Icon?: IconType | null;
}

export default function BadgeRatings({
  data = [],
  title = '',
  suffix = '',
  Icon: SharedIcon = null,
}: BadgeRatingsProps) {
  return (
    <div className="bg-white rounded-xl border border-[#F1F2F4]">
      <h2 className="bg-[#F9F9FB] text-[14px] text-[#757C91] font-semibold border-b border-[#F1F2F4] px-4 py-2">
        {title}
      </h2>
      <div className="bg-white p-4">
        <ul>
          {data.map(({ name, amount, icon: ItemIcon }, index) => {
            const RenderedIcon = (ItemIcon || SharedIcon) as IconType | null;
            return (
              <li
                key={index}
                className="flex justify-between py-4 text-[14px] font-semibold text-[#3B4152]"
              >
                <div className="flex  space-x-2 items-center">
                  {RenderedIcon && <RenderedIcon className="w-6 " />}
                  <p>
                    {name} {suffix}
                  </p>
                </div>
                <p>{Number(amount).toLocaleString()} providers</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
