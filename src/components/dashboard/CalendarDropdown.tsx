'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { subMonths, addMonths, format } from 'date-fns';
import CalendarIcon from '@/assets/calendar-icon.svg';
import DropdownIcon from '@/assets/dropdown-icon.svg';

// Import your SVGs as React components (with SVGR enabled in Next.js)
import LeftArrow from '@/assets/left-icon.svg';
import RightArrow from '@/assets/right-icon.svg';

import { startOfWeek, endOfWeek, subDays, subWeeks } from 'date-fns';
import { Button, IconButton } from '@/components/ui';

const presetOptions = [
  {
    label: 'Today',
    range: () => ({ startDate: new Date(), endDate: new Date() }),
  },
  {
    label: 'Yesterday',
    range: () => {
      const y = subDays(new Date(), 1);
      return { startDate: y, endDate: y };
    },
  },
  {
    label: 'Last 7 days',
    range: () => {
      const end = new Date();
      const start = subDays(end, 6); // last 7 days including today
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last week',
    range: () => {
      const today = new Date();
      const start = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }); // Mon
      const end = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }); // Sun
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This month',
    range: () => {
      const start = new Date();
      start.setDate(1);
      return { startDate: start, endDate: new Date() };
    },
  },
  {
    label: 'Last 30 days',
    range: () => {
      const end = new Date();
      const start = subDays(end, 29);
      return { startDate: start, endDate: end };
    },
  },

  {
    label: 'Custom range',
    range: null,
  },
];

export interface CalendarDropdownProps {
  onDateChange?: (start: Date, end: Date) => void;
}

export default function CalendarDropdown({ onDateChange }: CalendarDropdownProps) {
  const [selected, setSelected] = useState('All time');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2000, 0, 1), // earliest date
    endDate: new Date(),
    key: 'selection',
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // 👈 drives month view

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const applyPreset = (label: string) => {
    setSelected(label);
    const selectedOption = presetOptions.find((p) => p.label === label);
    if (selectedOption?.range) {
      const newRange = { ...selectedOption.range(), key: 'selection' };
      setDateRange(newRange);
      setShowCalendar(false);
      onDateChange?.(newRange.startDate, newRange.endDate);
    } else {
      setShowCalendar(true); // open calendar for custom
    }
  };

  const applyCustomRange = () => {
    setShowCalendar(false);
    onDateChange?.(dateRange.startDate, dateRange.endDate);
  };

  return (
    <div className="relative w-fit mb-3">
      {/* Button to toggle */}
      <div className="flex items-center space-x-2">
        <p className="text-[#3B4152]">Showing results for</p>
        <Button
          onClick={() => setShowCalendar(true)}
          className="flex space-x-2 items-center bg-[white] font-bold text-xs border border-[#D6DBE7] text-[#757C91] rounded-xl px-3 py-3 cursor-pointer"
        >
          <CalendarIcon />
          {selected}
          <DropdownIcon className="ml-1" />
        </Button>
      </div>

      {/* Calendar popup */}

      {showCalendar && (
        <main className="flex flex-col w-[503px] p-[8px] absolute z-50 mt-2  bg-white shadow-lg rounded-md border border-[#F1F2F4] text-sm">
          <div className="flex border-b border-[#F1F2F4] pb-2">
            {/* Presets */}
            <div className="border-r border-[#F1F2F4] p-3 flex flex-col space-y-1">
              {presetOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => applyPreset(option.label)}
                  className={`text-left text-md px-2 py-1 rounded cursor-pointer ${
                    selected === option.label
                      ? 'bg-[#E6FFF4] text-[#121921] font-semibold'
                      : 'hover:bg-[#E6FFF4]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Calendar + custom header */}
            <div className="p-2 ">
              {/* Custom header */}
              <div className="flex items-center justify-between">
                <span className=" text-{#121921} font-bold">
                  {format(currentDate, 'MMMM yyyy')}
                </span>
                <div className="flex items-center gap-1">
                  <IconButton
                    onClick={handlePrevMonth}
                    className="p-2 border border-[#D6DBE7] rounded-xl cursor-pointer"
                  >
                    <LeftArrow className="w-4 h-4 text-gray-600" />
                  </IconButton>
                  <IconButton
                    onClick={handleNextMonth}
                    className="p-2 border border-[#D6DBE7] rounded-xl cursor-pointer"
                  >
                    <RightArrow className="w-4 h-4 text-gray-600" />
                  </IconButton>
                </div>
              </div>

              {/* Calendar */}
              <div className="calendar-wrapper">
                <DateRange
                  key={currentDate.toISOString()} // 👈 Force re-render on month change
                  months={1}
                  direction="horizontal"
                  moveRangeOnFirstSelection={false}
                  ranges={[dateRange]}
                  onChange={(item: any) => setDateRange(item.selection)}
                  showMonthAndYearPickers={false}
                  showMonthArrow={false}
                  showDateDisplay={false}
                  shownDate={currentDate}
                />
              </div>
            </div>
          </div>

          <div>
            {/* Actions */}
            <div className="flex justify-between items-center px-3 py-[12px]">
              <div className="text-[#121921]">
                {format(dateRange.startDate, 'MMM d, yyyy')} -{' '}
                {format(dateRange.endDate, 'MMM d, yyyy')}
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => setShowCalendar(false)}
                  variant="secondary"
                  className="px-[6px] py-1 border border-[#D6DBE7] font-semibold text-xs text-[#017441] cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={applyCustomRange}
                  className="px-[8px] py-1 border  rounded-xl font-semibold text-xs text-white bg-[#017441] cursor-pointer"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
